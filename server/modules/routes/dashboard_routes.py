#
#  This file holds all the relevant routes and functionality
#  for the dashboards page in the React frontend
#

#Import from third party modules
from flask import Blueprint, jsonify, request
from sqlalchemy import desc
import json, ipaddress, socket, time

#Import from in house modules
from ..database.database_tables import db, ClientMachines, SystemMetrics, AppMetrics
from ..sockets.data_transfer import sendSocketData, receiveSocketData
from ..utilities.logging_setup import server_logger

#Setup the blueprint for the dashboard routes
dashboard_routes = Blueprint('dashboard_routes',__name__)

#Route: the main dashboard route
@dashboard_routes.route('/', methods=['GET','POST','DELETE','PUT'])
def dashView():
  return "Main Dash Route"

#Route: to get a list of all the machines added to the portal
#   - The route is /dash/clientmachines, supporting the GET method
#   - It will return all the stored client machines details
@dashboard_routes.route('/clientmachines', methods=['GET'])
def listClientMachines():
  #Get a list of everything in the machines database
  machineList = ClientMachines.query.all()
  finalList = []

  for mach in machineList:
    finalList.append({
      "id": mach.id,
      "name": mach.name,
      "host_name": mach.host_name,
      "mac_address": mach.mac_address,
      "os": mach.os_type,
      "os_full_version": mach.os_full_version,
      "address": str(ipaddress.IPv4Address(mach.ip_address)),
      "status": mach.status,
      "ports": mach.ports
    })

  return jsonify({
    "description": "A list of all saved machines",
    "content": finalList
  })

#Route: to add a client machine to the application
#   - The route is /dash/clientmachines, supporting the POST method
#   - It will add a new machine once connected, if it doesn't already exist
@dashboard_routes.route('/clientmachines', methods=['POST'])
def add_new_client_machine():
  #Handle the request data
  req_data = request.json

  #Check if details exist in DB
  try:
    machine_exists = ClientMachines.query.with_entities(ClientMachines.id).filter_by(mac_address=req_data["mac_addr"]).first() is not None
   
    #Add a new machines details if they don't exist
    if not machine_exists:
      #Create a new table entry object using request data
      new_machine = ClientMachines(
        name=req_data["host_name"],
        host_name=req_data["host_name"],
        os_type=req_data["os_type"],
        os_full_version=req_data["os_details"],
        mac_address=req_data["mac_addr"],
        ip_address=req_data["ip_addr_v4"],
        ports=",".join(req_data["port_numbers"]),
        status=1
      )

      #Commit to the DB (ClientMachines table)
      db.session.add(new_machine)
      db.session.commit()

    return "Success"
  except Exception as err_msg:
    return "[Error] " + str(err_msg)

#Route: to remove an existing client machine from the portal
#   - The route is /dash/clientmachines/<id>, supporting the DELETE method
#   - It will remove a client machine from the database/frontend
@dashboard_routes.route('/clientmachines/<id>', methods=['DELETE'])
def remove_client_machine(id):
  #Get the machine to delete
  try:
    machine = ClientMachines.query.filter_by(id=id).first()
    if machine is None:
      return "Machine with the id (" + str(id) + ") not found."
    else:
      db.session.delete(machine)
      db.session.commit()
      #Update data values - also for app
      for metric in machine.system_metrics:
        metric.machine_id = machine.name
        db.session.commit()
      for app in machine.app_details:
        app.machine_id = machine.name
        db.session.commit()
      return "Removed machine with name: " + str(machine.host_name)
  except Exception as err_msg:
    return "An error occurred: " + str(err_msg)

#Route: to update an existing client machine in the portal
#   - The route is /dash/clientmachines/<id>, supporting the PUT method
#   - It will update the name attribute for a selected machine via id
@dashboard_routes.route("/clientmachines/<id>", methods=['PUT'])
def update_client_machine(id):
  req = request.json
  try:
    machine = ClientMachines.query.filter_by(id=id).first()
    if machine is None:
      return "Machine with the id (" + str(id) + ") not found."
    else:
      machine.name = req["new_name"]
      db.session.commit()
      return "Machine's name has been updated to " + str(req["new_name"]) + "."
  except (TypeError,NameError,KeyError) as err_msg:
    print(str(err_msg))
    return "No new name was provided to update the machine."
  except Exception as err_msg:
    print(str(err_msg))
    return "An error occurred: " + str(err_msg) + "."

#Route: to get a list of all app & sys metrics for a machine
#   - The route is /dash/clientmachinemetrics/<mac>, supporting the GET method
#   - It will return the metrics for a given machine identified by mac
@dashboard_routes.route('/clientmachinemetrics/<mac>', methods=['GET'])
def listAllMetrics(mac):
  
  # Get sys metrics
  mach = SystemMetrics.query.filter_by(machine_id=mac).order_by(SystemMetrics.id.desc()).first()
  final_sys_metrics = []
  disk_metrics = []

  #Package the disks for display
  disk_names = mach.disk_names.split(",")
  disk_usage = mach.disk_usage.split(",")
  for index, disk in enumerate(disk_names):
    disk_metrics.append({"name": disk, "usage": disk_usage[index]})

  #Append all system metrics
  final_sys_metrics.append({
    "id": mach.id,
    "name": mach.machine.name,
    "time": str(mach.timestamp),
    "cpu": str(mach.cpu_usage),
    "ram": str(mach.ram_usage),
    "disk": disk_metrics,
    "disk_read": mach.disk_read,
    "disk_write": mach.disk_write,
    "network": str(mach.network_usage)
  })

  final_app_metrics = []

  #Append all app metrics
  for app in mach.app_metrics:
    final_app_metrics.append({
      "id": app.id,
      "machine_name": mach.machine.name,
      "time": str(mach.timestamp),
      "app_name": app.application.name,
      "cpu": str(app.cpu_usage),
      "ram": str(app.ram_usage)
    })
  
  #Sort app metrics by top CPU & then top RAM usage (in return get first 5 entries)
  final_app_metrics.sort(key=lambda met: (met["cpu"], met["ram"]), reverse=True)

  return jsonify({
    "description": "A list of system metrics for a machine",
    "content": {
      "sysMetrics": final_sys_metrics,
      "appMetrics": final_app_metrics[0:5]
    }
  })

#Route: to change any machine statuses
#   - The route is /dash/checkstatus, supporting the GET method
#   - It will try to connect to all machines sockets and get a response
@dashboard_routes.route('/checkstatus', methods=['GET'])
def check_machine_status():
  #Get a list of everything in the machines database
  machine_list = ClientMachines.query.all()

  #Go through all machines and try to connect to the socket
  for mach in machine_list:
    can_connect = True
    try:
      sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
      sock.settimeout(10)
      ip = str(ipaddress.IPv4Address(mach.ip_address))
      port = int(mach.ports.split(",")[0])

      sock.connect((ip, port))
      sendSocketData(sock, json.dumps({"machine_id": mach.id, "machine_name": mach.name, "type": "ping", "parameters": {}}))
      time.sleep(2)
      data = receiveSocketData(sock)
      if data:
        server_logger.info("Pinging on ({},{}) successful.".format(ip,port))
      sock.close()
    except Exception as err_msg:
      #If the connection fails catch it and say that it fails
      can_connect = False
      server_logger.warning("Couldn't connect to {}, on port {} {}.".format(ip,port,err_msg))
    
    #Modify the status depending on result
    if can_connect:
      if mach.status == 0:
        #print("Machine is offline but should be online: " + mach.name)
        mach.status = 1
        db.session.commit()
    elif not can_connect:
      if mach.status == 1:
        #print("Machine is online but should be offline: " + mach.name)
        mach.status = 0
        db.session.commit()
  
  return jsonify({
    "description": "Status check for all machines"
  })

#Route: to change the ip address stored for a machine
#   - The route is /dash/changeip/<id>, supporting the PUT method
#   - It will modify the stored ip address of a machine identified via id
@dashboard_routes.route('/changeip/<id>', methods=['PUT'])
def change_ip_address(id):
  req = request.json

  #Get the machine, then get the request body new ip and change it
  machine = ClientMachines.query.filter_by(id=id).first()
  if machine is not None:
    new_ip = int(ipaddress.IPv4Address(req["new_ip"]))
    machine.ip_address = new_ip
    db.session.commit()
  
  result = "The machine {} has had its ip changed to {}".format(machine.name, req["new_ip"])
  return jsonify({
    "description": result
  })