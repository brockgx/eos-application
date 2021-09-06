#
#  This file holds all the relevant routes and functionality
#  for the dashboards page in the React frontend
#

#Import from third party modules
from flask import Blueprint, jsonify, request
import json

#Import from in house modules
#from ..database.prototype_database import db, Random, AppMetrics


#Setup the blueprint for the dashboard routes
dashboard_routes = Blueprint('dashboard_routes',__name__)


#Route: to get a list of all the machines added to the portal
@dasboard_routes.route("dash/clientmachines", methods=['GET'])
def listClientMachines():
  pass

#Route: to add a client machine to the application
@dashboard_routes.route("dash/clientmachines", methods=['POST'])
def addNewClientMachine():
  pass

#Route: to remove an existing client machine from the portal
@dashboard_routes.route("dash/clientmachines", methods=['DELETE'])
def removeClientMachine():
  pass

#Route: to update an existing client machine in the portal
@dashboard_routes.route("dash/clientmachines", methods=['PUT'])
def updateClientMachine():
  pass