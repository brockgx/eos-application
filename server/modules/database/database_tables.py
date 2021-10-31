#Import third party dependencies
from flask_sqlalchemy import SQLAlchemy

#Make an instance of the db, to pass to route handlers
#and the main API file
db = SQLAlchemy()

#Table: for holding client machine data
#
class ClientMachines(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)
  host_name = db.Column(db.String(40), nullable=False)
  os_type = db.Column(db.String(10), nullable=False)
  os_full_version = db.Column(db.String(100), nullable=False)
  mac_address = db.Column(db.String(20), nullable=False, unique=True)
  ip_address = db.Column(db.Integer, nullable=False)
  ports = db.Column(db.String(15), nullable=False)
  status = db.Column(db.Integer, nullable=False)
  system_metrics = db.relationship('SystemMetrics', backref='machine')
  app_details = db.relationship('AppDetails', backref='machine')
  command_details = db.relationship('Command', backref='machine')
  
#Table: for holding details about the system metrics
#
class SystemMetrics(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  machine_id = db.Column(db.String(40), db.ForeignKey('client_machines.mac_address'), nullable=True)
  timestamp = db.Column(db.Numeric(16,6), nullable=False)
  cpu_usage = db.Column(db.Numeric(5,2), nullable=False)
  ram_usage = db.Column(db.Numeric(5,2), nullable=False)
  disk_names = db.Column(db.String(256), nullable=False)
  disk_usage = db.Column(db.String(70), nullable=False)
  disk_read = db.Column(db.Integer, nullable=False)
  disk_write = db.Column(db.Integer, nullable=False)
  network_usage = db.Column(db.Numeric(5,2), nullable=False) #May be float as was a percentage
  app_metrics = db.relationship('AppMetrics', backref='system_metric')

#Table: for holding details about the specific applications monitored
#
class AppDetails(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  pid = db.Column(db.Integer, nullable=False)
  name = db.Column(db.String(30), nullable=False)
  machine_id = db.Column(db.String(40), db.ForeignKey('client_machines.mac_address'), nullable=True) #foreign
  app_metrics = db.relationship('AppMetrics', backref='application')

#Table: for holding further details of the metrics associated with the applications
#
class AppMetrics(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  app_id = db.Column(db.Integer, db.ForeignKey('app_details.id'), nullable=False)
  system_metric_id = db.Column(db.Integer, db.ForeignKey('system_metrics.id'), nullable=False)
  cpu_usage = db.Column(db.Numeric(5,2), nullable=False)
  ram_usage = db.Column(db.Numeric(5,2), nullable=False)

#Table: for holding sending commands from server
#
class Command(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  machine_id = db.Column(db.String(40), db.ForeignKey('client_machines.id'), nullable=True) #foreign
  timestamp = db.Column(db.Numeric(16,6), nullable=False)
  type =  db.Column(db.String(50), nullable=False)
  # output = db.Column(db.String(500), nullable=False)
  result = db.Column(db.Boolean, nullable=False,default=False)
  #
  #
