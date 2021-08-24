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