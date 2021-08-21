#Import db from the main app file
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Random(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  msg = db.Column(db.String(120), nullable=False)

  def __repr__(self):
    return '<Message %r>' % self.msg