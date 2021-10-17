from flask import Blueprint, jsonify, request
import json
import socket
import time

from ..database.prototype_database import db, Random, AppMetrics, SystemMetrics
from ..sockets.socket_data_transfer import sendSocketData, receiveSocketData

test_routes = Blueprint('test_routes',__name__)

@test_routes.route("/testone", methods=['POST'])
def test_one():
  new_data = request.data
  print(new_data.decode("utf-8"))
  test_one = Random(msg=new_data.decode("utf-8"))

  db.session.add(test_one)
  db.session.commit()

  return "Data added successfully"

@test_routes.route("/testget")
def test_get():
  data = Random.query.all()

  final = []
  first = True
  for d in data:
    final.append({"id": d.id, "message": d.msg})


  return jsonify({
    "description": "Random Messages",
    "content": final
  })

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

#SOON TO BE DEPRECATED - with new metric routes
@test_routes.route("/addmetrics", methods=["POST"])
def add_metrics():
  new_metrics = request.json
  final_metrics = new_metrics["content"]

  for metric in final_metrics:
    for app in metric["app_metrics"]:
      db_metric = AppMetrics(machine_name=metric["machine_name"],timestamp=metric["collection_time"],app_name=app["name"],app_cpu=app["cpu"],app_ram=app["ram"])
      db.session.add(db_metric)
    
    sys_cpu = metric["system_metrics"][0]["cpu"]
    sys_ram = metric["system_metrics"][1]["ram"]

    first_disk = True
    disks = ""
    disk_perc = ""
    for disk in metric["disk_metrics"]:
      if first_disk:
        first_disk = False
        disks += disk["device"]
        disk_perc += str(disk["percent"])
      else:
        disks += "," + str(disk["device"])
        disk_perc += "," + str(disk["percent"])
    
    #Add system metric
    db_sys_metric = SystemMetrics(machine_name=metric["machine_name"],timestamp=metric["collection_time"],cpu_usage=sys_cpu,ram_usage=sys_ram,disk_usage=disk_perc,disk_read=metric["disk_bytes_read"],disk_write=metric["disk_bytes_written"],network_usage=metric["network_percent"])
    db.session.add(db_sys_metric)

    db.session.commit()

  return "New Metrics Successfully added"

#SOON TO BE DEPRECATED - with new metric routes
@test_routes.route("/getmetrics", methods=["GET"])
def get_metrics():
  data = AppMetrics.query.all()

  final = []
  for d in data:
    final.append({"id": d.id, "machine_name": d.machine_name, "time": d.timestamp, "app_name": d.app_name, "app_cpu": d.app_cpu, "app_ram": d.app_ram})


  return jsonify({
    "description": "Application Machine Metrics",
    "content": final
  })

  return "Metrics received!!"

#Route: used for personal testing (brock) to run custom SQL queries
@test_routes.route("/brock/test", methods=["GET"])
def brockTest():
  result = db.session.execute('SELECT * FROM app_metrics WHERE app_name = :aname LIMIT :start,:limit', {'aname': "python", "start": 0, "limit": 2})

  final = []
  for r in result:
    print(r)
    final.append({"id": r.id, "name": r.machine_name, "time": r.timestamp, "cpu": r.app_cpu})

  return jsonify({"description": "A result of app metrics with python as the name", "content": final, "rows": len(final)})

#Route: personal socket command use
#Could POST? from agent to api or server to api
#So could go from API -> AGENT -> SERVER -> BACK TO API
@test_routes.route("/socketcmd", methods=["POST"])
def brockSocket():
  #req = request.json
  #print(req)
  #return "Success"

  #Gets the body request - JSON structure for commands
  req = request.json

  sock = socket.socket()
  #In future get machine details from machine of the request
  sock.connect(("2.tcp.ngrok.io", 15170))

  sendSocketData(sock, "Hello, you received me")

  time.sleep(10)

  data = receiveSocketData(sock)

  return jsonify({"desc": "Return of the message from the socket", "content": data.decode("utf-8")})

    # sendSocketData(sock, jsonify(
    #   {"type": "command",
    #    "cmd_type": "filesend",
    #    "contents": {"filename": "name", "file": "file"}}
    # ))

  #   #Wait until data is returned on the connection
  #   data = receiveSocketData(sock)
  #   if data:
  #     print_log_msg("Command was successful")
  #     return jsonify({"type": "response", "content": data})
  #   else:
  #     print_log_msg("Command didn't return")
  #     return "Command failed"
  # except Exception as err_msg:
  #   print_log_msg(str(err_msg))
  #   return "Command failed"