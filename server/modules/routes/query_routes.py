#
#  This file holds all the relevant routes and functionality
#  for the query page in the React frontend
#

#Import from third party modules
from flask import Blueprint, jsonify, request
import json

#Import from in house modules
#from ..database.prototype_database import db, Random, AppMetrics

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