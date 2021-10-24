from flask import Blueprint, jsonify, request
import json, ipaddress, socket, time
from sqlalchemy import update

from ..database.database_tables import db, ClientMachines, Command
from ..sockets.data_transfer import sendSocketData, receiveSocketData

test_routes = Blueprint('test_routes',__name__)

@test_routes.route("/getmachines")
def get_machines():
  result = jsonify({
    "description": "Connected Machines",
    "content": [
      {"id": "1", "machine_name": "miz007","machine_type": "windows","time": "14:53:38, 09/04/2021", "status": "Connected","ip_address": "127.0.0.1", "cpu": "22","ram": "45"},
      {"id": "2", "machine_name": "Brock-PC","machine_type": "windows", "time": "14:53:38, 09/04/2021","status": "Connected","ip_address": "127.0.0.2", "cpu": "37","ram": "55"},
      {"id": "3", "machine_name": "keeganator","machine_type": "linux", "time": "14:53:38, 09/04/2021","status": "Disconnected","ip_address": "127.0.0.4", "cpu": "52","ram": "35"},
      {"id": "4", "machine_name": "AlexCompSci","machine_type": "windows", "time": "14:53:38, 09/04/2021","status": "Connected","ip_address": "127.0.0.5", "cpu": "12","ram": "26"},
    ]
  })
  return result

#Route: used for personal testing (brock) to run custom SQL queries
@test_routes.route("/brock/test", methods=["GET"])
def brockTest():
  #result = db.session.execute('SELECT * FROM app_metrics WHERE app_name = :aname LIMIT :start,:limit', {'aname': "python", "start": 0, "limit": 2})

  return "Test"

#Route: personal socket command use
#Could POST? from agent to api or server to api
#So could go from API -> AGENT -> SERVER -> BACK TO API
@test_routes.route("/socketcmd", methods=["POST"])
def brockSocket():
  #Gets the body request - JSON structure for commands
  #Structure {"desc": "something", "machine": id, "content": {"type": "commandType", "details": {"msg": "Send this please"}}}
  req = request.json
  sock = socket.socket()

  agent_machine = ClientMachines.query.filter_by(id=req["machine"]).first()
  ip = str(ipaddress.IPv4Address(agent_machine.ip_address))
  port = int(agent_machine.ports.split(",")[0])

  print("IP and port coupling: " + ip + " - " + str(port))

  sock.connect(("127.0.0.1", port))

  try:
    #Create a new table entry object using request data
    commmand_data = Command(
      #timestamp=req["timestamp"],
      machine_id = req["machine"],
      type = req["type"],
      command = req["command"])

    db.session.add(commmand_data)
    db.session.commit()

    print("Command Data saved to database")
  except Exception as err_msg:
    print(err_msg)


  sendSocketData(sock, commmand_data)

  time.sleep(10)

  data = receiveSocketData(sock)

  # if data:
  #   update(Command).where(machine_id == 5).values(result="True")
  #   #session.query(Command).filter(machine_id.id==3, timestamp == 12).update({'result':'True'})
  # else:
  #   print("No data received")


  # if statement which verifies when the data is recevied to store in database and that the command is executed . query to update result to TRUE
  


  return jsonify({"desc": "Return of the message from the socket", "content":data})