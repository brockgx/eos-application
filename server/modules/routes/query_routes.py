#
#  This file holds all the relevant routes and functionality
#  for the query page in the React frontend
#

#Import from third party modules
from flask import Blueprint, jsonify, request
import json

#Import from in house modules
from ..database.prototype_database import db, AppMetrics, SystemMetrics, ClientMachines

#Setup the blueprint for the command routes
query_routes = Blueprint('query_routes',__name__)


#Route: main route for the queries
@query_routes.route("/", methods=['GET','POST','PUT','DELETE'])
def queryMain():
  routes = {
    "/": "main route",
    "/alldata": "route to return all data"
  }

  return jsonify({"index": "/query", "desc": "This is the brief of all query page routes", "routes": routes})

#Route: ?
@query_routes.route("/alldata", methods=['GET'])
def queryAllData():
  return "All Data"

#Route: to get a list of all the machines added to the portal
@query_routes.route('/clientmachines', methods=['GET'])
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
#Route: to get a list of metrics for a machine
@query_routes.route('/clientmachinemetrics', methods=['GET'])
def listSystemMetrics():
  # name = request.args['name']
  
  # Get sys metrics
  sys_metrics = SystemMetrics.query.all()
  final_sys_metrics = []

  for mach in sys_metrics:
    final_sys_metrics.append({"id": mach.id, "name": mach.machine_name, "time": mach.timestamp, "cpu": mach.cpu_usage, "ram": mach.ram_usage,"disk": mach.disk_usage, "disk_read": mach.disk_read, "disk_write": mach.disk_write, "network": mach.network_usage})
  
  # Get app metrics
  # app_metrics = AppMetrics.query.filter_by(machine_name=name).order_by(AppMetrics.id.desc())
  # final_app_metrics = []

  # for app in app_metrics:
  #   final_app_metrics.append({"id": app.id, "machine_name": app.machine_name, "time": app.timestamp,  "app_name": app.app_name,  "cpu": app.app_cpu, "ram": app.app_ram})

  return jsonify({
    "description": "A list of system metrics for a machine",
    "content": final_sys_metrics
    })
  # return jsonify({
  #   "description": "A list of system metrics for a machine",
  #   "content":
  #     {
  #       "sys_metrics": [final_sys_metrics],
  #       "app_metrics": [final_app_metrics]
  #     }})