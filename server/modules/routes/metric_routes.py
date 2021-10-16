from flask import Blueprint, jsonify, request

from ..database.database_tables import db, ClientMachines, SystemMetrics

metric_routes = Blueprint('metric_routes',__name__)

@metric_routes.route("/", methods=['GET'])
def main_metric_route():
  return "This is the root route for handling Metrics"

@metric_routes.route("/commitmetrics", methods=['POST'])
def commit_new_metrics():
  metric_data = request.json["content"]

  #Loop collected metrics
  for metric in metric_data:
    app_metrics = metric["app_metrics"]
    sys_metrics = metric["system_metrics"]
    #Get the machine for the relationship
    assoc_machine = ClientMachines.query.filter_by(mac_address=metric["machine"]).first()

    #Get disk strings
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

    #Make system metric object
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

    #Add app metrics

    #Add and commit system metric to the db
    db.session.add(db_sys_metric)
    db.session.commit()

  return "Success"