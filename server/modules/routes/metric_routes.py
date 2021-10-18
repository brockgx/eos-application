#Import any third party dependencies
from flask import Blueprint, jsonify, request

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
@metric_routes.route("/getallmetrics", methods=['GET'])
def get_all_metric_data():
  return "All metrics returned"

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
        application = AppDetails.query.filter(AppDetails.name==app["name"], AppDetails.pid==619).first()
        if application is None:
          application = AppDetails(machine=assoc_machine,pid=619,name=app["name"])
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