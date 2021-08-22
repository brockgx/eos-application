from flask import Blueprint, jsonify, request
import json

from ..database.prototype_database import db, Random

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

  final = ""
  first = True
  for d in data:
    if first:
      final += d.msg
      first = False
    else:
      final += " -:- " + d.msg


  return final

@test_routes.route("/testdata")
def test_data():
  result = jsonify({
    "content": "Data Stream",
    "machine": "WinNet01",
    "app_metrics": [
      {"app_name": "Discord","app_cpu": "50%","app_ram": "13%"},
      {"app_name": "Word","app_cpu": "3%","app_ram": "7%"},
      {"app_name": "Chrome","app_cpu": "1%","app_ram": "All of it"}
    ],
    "sys_metrics": {"cpu": "72%","ram": "65%","disk_read": "20%","disk_write": "6%","network": "24%"}
  })

  #final = json.loads(result.get_data().decode("utf-8"))
  return result