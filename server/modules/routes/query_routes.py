#
#  This file holds all the relevant routes and functionality
#  for the query page in the React frontend
#

#Import from third party modules
from flask import Blueprint, jsonify, request
import json

#Import custom modules
from ..database.database_tables import ClientMachines, SystemMetrics

#Setup the blueprint for the command routes
query_routes = Blueprint('query_routes',__name__)


#Route: main route for the queries
#   - The route is /query, supporting the GET, POST, PUT & DELETE methods
#   - It will be the main route for query
@query_routes.route("/", methods=['GET','POST','PUT','DELETE'])
def queryMain():
  routes = {
    "/": "main route",
    "/alldata": "route to return all data"
  }

  return jsonify({"index": "/query", "desc": "This is the brief of all query page routes", "routes": routes})

## QUERY ROUTES HAVE BEEN MOVED TO METRIC ROUTES