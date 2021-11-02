#Import any third party dependencies
from flask import Blueprint, jsonify, request
from datetime import datetime

#Import any custom made modules for the application
from ..database.database_tables import db, ClientMachines, SystemMetrics, AppDetails, AppMetrics

#Set metric routes as a blueprint for creating routes and adding in api main file
metric_routes = Blueprint('metric_routes',__name__)

#Route: root for the metrics group route
#   - The route is /metrics, it supports GET, POST, PUT & DELETE
@metric_routes.route("/", methods=['GET','POST','PUT','DELETE'])
def main_metric_route():
  return "This is the root route for handling Metrics"

#Route: to get all metrics and return them as JSON
#   - The route is /metrics/getallmetrics
#   - it returns all the system and application metrics of all machines
@metric_routes.route("/getallmetrics", methods=['GET'])
def get_all_metric_data():
  #Return all system metric entries
  all_metrics = SystemMetrics.query.all()

  #Loop though all system metric entries
  metrics = []
  for sys_metric in all_metrics:
    #Check machine existence
    machine_name = sys_metric.machine_id
    machine_mac = "Machine Removed"
    if sys_metric.machine is not None:
      machine_name = sys_metric.machine.name
      machine_mac = sys_metric.machine.mac_address
    
    #Created the metrics opbject for system metrics and add entries
    metrics.append({
      "name": machine_name,
      "machine_name": machine_name,
      "date": datetime.fromtimestamp(sys_metric.timestamp).strftime('%Y-%m-%d'),
      "time": datetime.fromtimestamp(sys_metric.timestamp).strftime('%H:%M'),
      # "time": str(sys_metric.timestamp),
      "cpu": str(sys_metric.cpu_usage),
      "ram": str(sys_metric.ram_usage),
      "disk_names": sys_metric.disk_names,
      "disk_use": sys_metric.disk_usage,
      "disk_read": round(sys_metric.disk_read/1000000, 2),
      "disk_write": round(sys_metric.disk_write/1000000, 2),
      "network": str(sys_metric.network_usage),
      "type": "system"
    })

    #Created the metrics opbject for application metrics and add entries
    for app in sys_metric.app_metrics:
      metrics.append({
        "name": app.application.name,
        "machine_name": machine_name,
        "date": datetime.fromtimestamp(sys_metric.timestamp).strftime('%Y-%m-%d'),
        "time": datetime.fromtimestamp(sys_metric.timestamp).strftime('%H:%M'),
        "cpu": str(app.cpu_usage),
        "ram": str(app.ram_usage),
        "disk_names": 0,
        "disk_use": 0,
        "disk_read": 0,
        "disk_write": 0,
        "network": 0,
        "type": "app"
      })

  #Return the follow JSON response with all metrics
  return jsonify({
    "desc": "Object of all system and application metrics",
    "content": metrics,
  })

#Route: to get all system metrics and return them as JSON
#   - The route is /metrics/getallsysmetrics
#   - returns all the system metrics only
@metric_routes.route("/getallsysmetrics", methods=['GET'])
def get_all_sys_metrics():
  
  #Return all system metric entries
  all_metrics = SystemMetrics.query.all()

  #Loop though all system metric entries
  all_system_metrics = []
  for sys_metric in all_metrics:
    #Check machine existence
    machine_name = sys_metric.machine_id
    machine_mac = "Machine Removed"
    if sys_metric.machine is not None:
      machine_name = sys_metric.machine.name
      machine_mac = sys_metric.machine.mac_address

    all_system_metrics.append({
      "name": machine_name,
      "mac_address": machine_mac,
      "date": datetime.fromtimestamp(sys_metric.timestamp).strftime('%Y-%m-%d'),
      "time": datetime.fromtimestamp(sys_metric.timestamp).strftime('%H:%M'),
      "cpu": str(sys_metric.cpu_usage),
      "ram": str(sys_metric.ram_usage),
      "disk_names": sys_metric.disk_names,
      "disk_use": sys_metric.disk_usage,
      "disk_read": round(sys_metric.disk_read/1000000, 2),
      "disk_write": round(sys_metric.disk_write/1000000, 2),
      "network": str(sys_metric.network_usage)
    })

  return jsonify({
    "desc": "Object of all system and application metrics",
    "system_metrics": all_system_metrics,
  })

#Route: to get all application metrics and return them as JSON
#   - The route is /metrics/getallappmetrics
#   - returns all the application metrics
@metric_routes.route("/getallappmetrics", methods=['GET'])
def get_all_app_metrics():

  #Return all system metric entries
  all_metrics = SystemMetrics.query.all()

  #Loop though all system metric entries
  all_application_metrics = []
  for sys_metric in all_metrics:
    #Check machine existence
    machine_name = sys_metric.machine_id
    machine_mac = "Machine Removed"
    if sys_metric.machine is not None:
      machine_name = sys_metric.machine.name
      machine_mac = sys_metric.machine.mac_address

    for app in sys_metric.app_metrics:
      all_application_metrics.append({
        "name": machine_name,
        "mac_address": machine_mac,
        "date": datetime.fromtimestamp(sys_metric.timestamp).strftime('%Y-%m-%d'),
        "time": datetime.fromtimestamp(sys_metric.timestamp).strftime('%H:%M'),
        "app_name": app.application.name,
        "app_pid": app.application.pid,
        "app_cpu": str(app.cpu_usage),
        "app_ram": str(app.ram_usage),
      })

  return jsonify({
    "desc": "Object of all system and application metrics",
    "application_metrics": all_application_metrics
  })

#Route: to collate and store a period of machine metrics in the DB
#   - The route is /metrics/commitmetrics, supporting the POST method
#   - It will add System metrics, as well as Application metrics
@metric_routes.route("/commitmetrics", methods=['POST'])
def commit_new_metrics():
  #Get the body content (the metrics data)
  metric_data = request.json["content"]

  try:
    #Loop collected metrics
    for metric in metric_data:
      #Store both the application and system metrics
      app_metrics = metric["app_metrics"]
      sys_metrics = metric["system_metrics"]

      #Get the machine entry relating to the metrics
      assoc_machine = ClientMachines.query.filter_by(mac_address=metric["machine"]).first()

      #Get all machine disks data as comma separated string
      first_disk = True
      disks = ""
      disk_perc = ""
      for disk in sys_metrics["disk_metrics"]:
        if first_disk:
          first_disk = False
          disks += disk["device"]
          disk_perc += str(disk["percent"])
        else:
          disks += "," + str(disk["device"])
          disk_perc += "," + str(disk["percent"])

      #Make system metric object and add it
      db_sys_metric = SystemMetrics(
        machine=assoc_machine,
        timestamp=metric["timestamp"],
        cpu_usage=sys_metrics["cpu"],
        ram_usage=sys_metrics["ram"],
        disk_names=disks,
        disk_usage=disk_perc,
        disk_read=sys_metrics["disk_bytes_read"],
        disk_write=sys_metrics["disk_bytes_written"],
        network_usage=sys_metrics["network_percent"]
      )
      db.session.add(db_sys_metric)

      #Loop through all app metrics per metric entry
      #Check for existence of App (add if not present)
      for app in app_metrics:
        application = AppDetails.query.filter(AppDetails.name==app["name"], AppDetails.pid==app["pid"]).first()
        if application is None:
          application = AppDetails(machine=assoc_machine,pid=app["pid"],name=app["name"])
          db.session.add(application)
        
        #Add the individual application metric entry
        app_metric = AppMetrics(system_metric=db_sys_metric,application=application,cpu_usage=app["cpu"],ram_usage=app["ram"])
        db.session.add(app_metric)

    #Commit new metrics entry and return success
    db.session.commit()
    return "Metrics added successfully"
  except Exception as err_msg:
    #Handle any errors that may occur and display message
    print("[Error] Adding Metrics: " + str(err_msg))
    return str(err_msg)