#Import any downloaded/third party modules and packages
from flask import Flask, redirect, request, jsonify
import os
import platform

#Import any custom made modules
from modules.routes.test_routes import test_routes
from modules.routes.command_routes import command_routes
from modules.routes.dashboard_routes import dashboard_routes
from modules.routes.query_routes import query_routes
from modules.routes.metric_routes import metric_routes
from modules.database.database_tables import db

#Setup any constants need to be used
HOST = "127.0.0.1"
PORT = 5000
HTTPS_ENABLED = False
CONTEXT = ('cert file', 'key file')

#Need to setup config file for the API


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
app.register_blueprint(test_routes, url_prefix='/test')
app.register_blueprint(command_routes, url_prefix='/commands')
app.register_blueprint(dashboard_routes, url_prefix='/dash')
app.register_blueprint(query_routes, url_prefix='/query')
app.register_blueprint(metric_routes, url_prefix='/metrics')

#Function for running the app
def start_flask_api():
  if __name__ == '__main__':
    if HTTPS_ENABLED:
      print("HTTPS ENABLED")
      #app.run(host=HOST,port=PORT,debug=True,ssl_context=CONTEXT)
    else:
      app.run(host=HOST,port=PORT,debug=True)

start_flask_api()