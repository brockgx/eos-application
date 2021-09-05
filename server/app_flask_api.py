#Import any downloaded/third party modules and packages
from flask import Flask, redirect, request, jsonify
import os
import platform

#Import any custom made modules
from modules.routes.test_routes import test_routes
from modules.database.prototype_database import db, AppMetrics

#Setup any constants need to be used
HOST = "127.0.0.1"
PORT = 5000

#Setup any variables needed to be used

#Instantiate the flask application
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

#Set DB path based on OS
if platform.system() == "Windows":
  DB_PATH = f'sqlite:///{basedir}\\modules\\database\\test.db'
else:
  DB_PATH = f'sqlite:////{basedir}/modules/database/test.db'

#Instantiate the DB (SQLLite for testing)
app.config["SQLALCHEMY_DATABASE_URI"] = DB_PATH
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]= False
db.app = app
db.init_app(app)
db.create_all()

##CONTENT##
@app.route('/', methods=['GET'])
def home_route():
  return jsonify(
    title="Main route",
    user="none"
  )

#Implement route module
app.register_blueprint(test_routes)

#Function for running the app
def start_flask_api():
  if __name__ == '__main__':
    app.run(host=HOST,port=PORT,debug=True)

start_flask_api()
