#Import db from the main app file
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ClientMachines(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(256), nullable=False)
  host_name = db.Column(db.String(256), nullable=False)
  os_type = db.Column(db.String(10), nullable=False)
  os_full_version = db.Column(db.String(256), nullable=False)
  mac_address = db.Column(db.String(256), nullable=False)
  ip_address = db.Column(db.Integer, nullable=False)
  status = db.Column(db.Integer, nullable=False)
  system_metrics = db.relationship('SystemMetrics', backref='machine')

class SystemMetrics(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  machine_id = db.Column(db.Integer, db.ForeignKey('client_machines.id'), nullable=False)
  timestamp = db.Column(db.Float(6), nullable=False)
  cpu_usage = db.Column(db.Float(2), nullable=False)
  ram_usage = db.Column(db.Float(2), nullable=False)
  disk_names = db.Column(db.String(256), nullable=False)
  disk_usage = db.Column(db.String(256), nullable=False)
  disk_read = db.Column(db.String(256), nullable=False)
  disk_write = db.Column(db.String(256), nullable=False)
  network_usage = db.Column(db.Float(2), nullable=False)