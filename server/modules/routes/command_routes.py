#
#  This file holds all the relevant routes and functionality
#  for the commands page in the React frontend and command handling on the agent
#

#Import from third party modules
from flask import Blueprint, jsonify, request
import json

#Import from in house modules
#from ..database.prototype_database import db, Random, AppMetrics


#Setup the blueprint for the command routes
command_routes = Blueprint('command_routes',__name__)


#Route: main route for the commands
@command_routes.route("/", methods=['GET','POST','PUT','DELETE'])
def command():
  return "The command routes are: /availableMachines - to get connected machines, /send - to send a command, /sendfile - to send a file"

#Route: to get a list of all machines tied to the application
@command_routes.route("/availablemachines", methods=['GET'])
def getAvailableMachines():
  return "Listing all online machines..."

#Route: to send a command to the agent and get a response back
@command_routes.route("/send", methods=['POST'])
def sendCommand():
  req = request.json
  console.log(req)
  return "Sending command to agent..."

#Route: to send a file to the agent machine
@command_routes.route("/sendfile", methods=['POST'])
def sendFile():
  return "Sending file to agent..."