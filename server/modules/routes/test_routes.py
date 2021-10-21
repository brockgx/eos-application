from flask import Blueprint, jsonify, request
import json, ipaddress, socket, time

from ..database.database_tables import db, ClientMachines
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

  agent_machine = ClientMachines.session.query.filter_by(id=req["machine"]).first()
  ip = str(ipaddress.IPv4Address(agent_machine["ip_address"]))
  port = int(agent_machine["ports"].split(",")[0])

  print("IP and port coupling: " + ip + " - " + str(port))
  print(req["content"])

  #sock.connect(("2.tcp.ngrok.io", 15170))

  #sendSocketData(sock, "Hello, you received me")

  #time.sleep(10)

  #data = receiveSocketData(sock) data.decode("utf-8")

  return jsonify({"desc": "Return of the message from the socket", "content": "Yo"})