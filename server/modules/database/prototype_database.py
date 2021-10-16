#Import db from the main app file
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Random(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  msg = db.Column(db.String(120), nullable=False)

  def __repr__(self):
    return '<Message %r>' % self.msg

class AppMetrics(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  machine_name = db.Column(db.String(256), nullable=False)
  timestamp = db.Column(db.String(256), nullable=False)
  app_name = db.Column(db.String(256), nullable=False)
  app_cpu = db.Column(db.Float(2), nullable=False)
  app_ram = db.Column(db.Float(2), nullable=False)

class SystemMetrics(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  machine_name = db.Column(db.String(256), nullable=False)
  timestamp = db.Column(db.String(256), nullable=False)
  cpu_usage = db.Column(db.Float(2), nullable=False)
  ram_usage = db.Column(db.Float(2), nullable=False)
  disk_usage = db.Column(db.String(256), nullable=False)
  disk_read = db.Column(db.String(256), nullable=False)
  disk_write = db.Column(db.String(256), nullable=False)
  network_usage = db.Column(db.Float(2), nullable=False)

class ClientMachines(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(256), nullable=False)
  host_name = db.Column(db.String(256), nullable=False)
  os_type = db.Column(db.String(10), nullable=False)
  os_full_version = db.Column(db.String(256), nullable=False)
  mac_address = db.Column(db.String(256), nullable=False)
  ip_address = db.Column(db.Integer, nullable=False)
  status = db.Column(db.Integer, nullable=False)