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


#Route: to get a list of all machines tied to the application
@command_routes.route("command/availablemachines", methods=['GET'])
def getAvailableMachines():
  pass

#Route: to send a command to the agent and get a response back
@command_routes.route("command/send", methods=['POST'])
def sendCommand():
  pass

#Route: to send a file to the agent machine
@command_routes.route("command/sendfile", methods=['POST'])
def sendFile():
  pass