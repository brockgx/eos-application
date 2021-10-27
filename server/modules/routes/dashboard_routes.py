#
#  This file holds all the relevant routes and functionality
#  for the dashboards page in the React frontend
#

#Import from third party modules
from flask import Blueprint, jsonify, request
from sqlalchemy import desc
import json
import ipaddress
import random

#Import from in house modules
from ..database.database_tables import db, ClientMachines, SystemMetrics, AppMetrics

#Setup the blueprint for the dashboard routes
dashboard_routes = Blueprint('dashboard_routes',__name__)

#Route: the main dashboard route
@dashboard_routes.route('/', methods=['GET','POST','DELETE','PUT'])
def dashView():
  return "Main Dash Route"

#Route: to get a list of all the machines added to the portal
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
      "address": mach.ip_address,
      "status": mach.status
    })

  return jsonify({
    "description": "A list of all saved machines",
    "content": finalList
  })

#Route: to add a client machine to the application
@dashboard_routes.route('/clientmachines', methods=['POST'])
def add_new_client_machine():
  #Handle the request data
  req_data = request.json

  #Check if details exist in DB
  try:
    machine_exists = ClientMachines.query.with_entities(ClientMachines.id).filter_by(mac_address=req_data["mac_addr"]).first() is not None
   
    #Add a new machines details if they don't exist
    if not machine_exists:
      #Create a new table entry object using request data\
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
    
#Route: to get a list of system metrics for a specified machine
# @dashboard_routes.route('/clientmachinemetrics/<name>', methods=['GET'])
# def listSystemMetrics(name):
  
#   #Get a list of metrics from the system_metrics table - filter by machine_name
#   mach = SystemMetrics.query.filter_by(machine_name=name).order_by(SystemMetrics.id.desc()).first()
#   final = []

#   # for mach in result:
#   #   print(mach)
#   final.append({"id": mach.id, "name": mach.machine_name, "time": mach.timestamp, "cpu": mach.cpu_usage, "ram": mach.ram_usage,"disk": mach.disk_usage, "disk_read": mach.disk_read, "disk_write": mach.disk_write, "network": mach.network_usage})

#   return jsonify({
#     "description": "A list of system metrics for a machine",
#     "content": final  })

#Route: to get a list of all app & sys metrics for a machine
@dashboard_routes.route('/clientmachinemetrics/<mac>', methods=['GET'])
def listAllMetrics(mac):
  
  # Get sys metrics
  mach = SystemMetrics.query.filter_by(machine_id=mac).order_by(SystemMetrics.id.desc()).first()
  final_sys_metrics = []

  disks = mach.disk_usage.split(",")


  final_sys_metrics.append({
    "id": mach.id,
    "name": mach.machine.name,
    "time": mach.timestamp,
    "cpu": mach.cpu_usage,
    "ram": mach.ram_usage,
    "disk": disks[0],
    "disk_read": mach.disk_read,
    "disk_write": mach.disk_write,
    "network": mach.network_usage / 100
  })

  final_app_metrics = []

  for app in mach.app_metrics:
    final_app_metrics.append({
      "id": app.id,
      "machine_name": mach.machine.name,
      "time": mach.timestamp,
      "app_name": app.application.name,
      "cpu": app.cpu_usage,
      "ram": app.ram_usage
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
