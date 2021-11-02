#
#  This file holds all the relevant routes and functionality
#  for the commands page in the React frontend and command handling on the agent
#

#Import from third party modules
from flask import Blueprint, jsonify, request
import json

#Import from in house modules
#from ..database.prototype_database import db, Random, AppMetrics

#Import from in house modules
from ..database.database_tables import db, ClientMachines, AppMetrics, AppDetails
#Setup the blueprint for the command routes
command_routes = Blueprint('command_routes',__name__)


#Route: main route for the commands
@command_routes.route("/", methods=['GET','POST','PUT','DELETE'])
def command():
  return "The command routes are: /availableMachines - to get connected machines, /send - to send a command, /sendfile - to send a file"

#Route: to get a list of all machines tied to the application
@command_routes.route("/availableMachines", methods=['GET'])
def getAvailableMachines():
    #Get a list of everything in the machines database
    machineList = ClientMachines.query.all()
    finalList = []

    for mach in machineList:
      finalList.append({
      "id": mach.id,
      "name": mach.name,
      "host_name": mach.host_name,
      "mac_address": mach.mac_address,
    })

    return jsonify({
      "description": "A list of all of the available machines",
      "content": finalList
    })


  #Route: to get list of apps for a specified machine

@command_routes.route('/machineapps/<mac>', methods=['GET'])
def getAvailableApps(mac):
 # mac = '94:de:80:c6:73:49'
  final_apps_avail = []

  machAppsList = AppDetails.query.filter_by(machine_id=mac).all()

  for app in machAppsList:
    final_apps_avail.append({
    "id": app.id,
    "app_name": app.name,
    "pid": app.pid,
    "machine_id": app.machine_id
    })
  return jsonify({
    "description": "A list of available applications for a machine",
    "content": final_apps_avail
  })

#Route: to send a command to the agent and get a response back
@command_routes.route("/send", methods=['POST'])
def sendCommand():
  req = request.json
  print(req)
  return "Sending command to agent..."

#Route: to send a file to the agent machine
@command_routes.route("/sendfile", methods=['POST'])
def sendFile():
  req = request.json
  print(req)
  return "Sending file to agent..."