#
#  This file holds all the relevant routes and functionality
#  for the dashboards page in the React frontend
#

#Import from third party modules
from flask import Blueprint, jsonify, request
from sqlalchemy import desc
import json
import ipaddress

#Import from in house modules
from ..database.prototype_database import db, ClientMachines, AppMetrics, SystemMetrics


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
    finalList.append({"id": mach.id, "name": mach.machine_name, "os": mach.os_type, "address": mach.ip_address, "status": mach.status})

  return jsonify({
    "description": "A list of all saved machines",
    "content": finalList
  })

#Route: to add a client machine to the application
@dashboard_routes.route('/clientmachines', methods=['POST'])
def addNewClientMachine():
  #Add a new machine
  #Handle the request data
  reqData = (request.data).decode("utf-8")
  machineData = json.loads(reqData)
  #This will be done on the react side, not here (we just need the int)
  convertedAddress = int(ipaddress.IPv4Address(machineData["address"]))
  
  #Create a new table entry object using request data
  newMachine = ClientMachines(machine_name=machineData["name"],os_type=machineData["os"],ip_address=convertedAddress,status=machineData["status"])

  #Commit to the DB (ClientMachines table)
  db.session.add(newMachine)
  db.session.commit()

  return jsonify(machineData)

#Route: to remove an existing client machine from the portal
@dashboard_routes.route('/clientmachines', methods=['DELETE'])
def removeClientMachine():
  return "Dashboard remove client route"

#Route: to update an existing client machine in the portal
@dashboard_routes.route("/clientmachines", methods=['PUT'])
def updateClientMachine():
  return "Dashboard update client route"

#Route: to get a list of system metrics for a specified machine
@dashboard_routes.route('/clientmachinemetrics/<name>', methods=['GET'])
def listSystemMetrics(name):
  
  #Get a list of metrics from the system_metrics table - filter by machine_name
  mach = SystemMetrics.query.filter_by(machine_name=name).order_by(SystemMetrics.id.desc()).first()
  final = []

  # for mach in result:
  #   print(mach)
  final.append({"id": mach.id, "name": mach.machine_name, "time": mach.timestamp, "cpu": mach.cpu_usage, "ram": mach.ram_usage,"disk": mach.disk_usage, "disk_read": mach.disk_read, "disk_write": mach.disk_write, "network": mach.network_usage})

  return jsonify({
    "description": "A list of system metrics for a machine",
    "content": final  })