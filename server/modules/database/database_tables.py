#Import db from the main app file
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ClientMachines(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)
  host_name = db.Column(db.String(40), nullable=False)
  os_type = db.Column(db.String(10), nullable=False)
  os_full_version = db.Column(db.String(100), nullable=False)
  mac_address = db.Column(db.String(20), nullable=False, unique=True)
  ip_address = db.Column(db.Integer, nullable=False)
  ports = db.Column(db.String(10), nullable=False)
  status = db.Column(db.Integer, nullable=False)
  system_metrics = db.relationship('SystemMetrics', backref='machine')
  app_details = db.relationship('AppDetails', backref='machine')

class SystemMetrics(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  machine_id = db.Column(db.String(40), db.ForeignKey('client_machines.mac_address'), nullable=True)
  timestamp = db.Column(db.Float(6), nullable=False)
  cpu_usage = db.Column(db.Float(2), nullable=False)
  ram_usage = db.Column(db.Float(2), nullable=False)
  disk_names = db.Column(db.String(256), nullable=False)
  disk_usage = db.Column(db.String(70), nullable=False)
  disk_read = db.Column(db.String(20), nullable=False) #will become float
  disk_write = db.Column(db.String(20), nullable=False) #will become float
  network_usage = db.Column(db.Float(2), nullable=False)
  app_details = db.relationship('AppDetails', backref='system_metric')

class AppDetails(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  pid = db.Column(db.Integer, nullable=False)
  name = db.Column(db.String(30), nullable=False)
  machine_id = db.Column(db.String(40), db.ForeignKey('client_machines.mac_address'), nullable=True) #foreign
  system_metric_id = db.Column(db.Integer, db.ForeignKey('system_metrics.id'), nullable=False) #foreign
  app_metrics = db.relationship('AppMetrics', backref='application')

class AppMetrics(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  app_id = db.Column(db.Integer, db.ForeignKey('app_details.id'), nullable=False)
  cpu_usage = db.Column(db.Float(2), nullable=False)
  ram_usage = db.Column(db.Float(2), nullable=False)