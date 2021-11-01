#
#  This file holds all the relevant routes and functionality
#  for the commands page in the React frontend and command handling on the agent
#

#Import from third party modules
from flask import Blueprint, jsonify, request
import json, ipaddress, socket, time


from ..database.database_tables import db, ClientMachines, Command
from ..sockets.data_transfer import sendSocketData, receiveSocketData

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
  #Gets the body request - JSON structure for commands
  req = request.json
  sock = socket.socket()

  agent_machine = ClientMachines.query.filter_by(id=req["machine_id"]).first() #Getting machine_id for the first machine in the table Client_machines
  ip = str(ipaddress.IPv4Address(agent_machine.ip_address))
  port = int(agent_machine.ports.split(",")[0])
  
  print("IP and port coupling: " + ip + " - " + str(port))

  sock.connect(("127.0.0.1", port)) #Connecting to socket

  try:
    #Create a new table entry object using request data
    commmand_data = Command(
      machine = agent_machine,
      timestamp = time.time(),
      type = req["type"])

    db.session.add(commmand_data) #Stores the data in the database
    db.session.commit()

    print("Command Data saved to database")
  except Exception as err_msg:
    print(err_msg)

  json_var = {}

  #Storing the data in a json object from the body request.
  machine_id = req["machine_id"] 
  machine_name = req["machine_name"] 
  type = req["type"]
  json_var["machine_id"] = machine_id
  json_var["machine_name"] = machine_name
  json_var["type"] = type
  params_send = req["parameters"]

  json_var["parameters"] = params_send
    
  json_data = json.dumps(json_var)  #Creating a json object

  sendSocketData(sock, json_data) #Sending JSON Object to agent via sockets

  data = receiveSocketData(sock) #Receving the response from agent

  if data: # Runs if a response was returned from the agent
      commmand_data.result = True 
      db.session.commit() #Updates the database
  else:
    print("No data received")
  

  return jsonify({"desc": "Return of the message from the socket", "content":data}) #Returns the output from the agent in a JSON format

#Route: to send a file to the agent machine
@command_routes.route("/sendfile", methods=['POST'])
def sendFile():
  return "Sending file to agent..."