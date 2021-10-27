#Import any downloaded/third party modules and packages
from flask import Flask, jsonify
from sys import exit
import logging

#Import any custom made modules
from modules.utilities.config_setup import get_config_details
from modules.utilities.logging_setup import server_logger, FILE_HANDLER, STREAM_HANDLER
from modules.routes.test_routes import test_routes
from modules.routes.command_routes import command_routes
from modules.routes.dashboard_routes import dashboard_routes
from modules.routes.query_routes import query_routes
from modules.routes.metric_routes import metric_routes
from modules.database.database_tables import db

#Need to setup config file for the API
config_dets = get_config_details()

#Instantiate the flask application
app = Flask(__name__)
flask_logger = logging.getLogger("werkzeug")
flask_logger.addHandler(FILE_HANDLER)
flask_logger.addHandler(STREAM_HANDLER)

if config_dets != False:
  #Instantiate the DB (SQLLite for testing)
  try:
    DB_LOCATION = config_dets["DATABASE-DETAILS"]["DATABASE-URI"] + config_dets["DATABASE-DETAILS"]["DATABASE-NAME"]
    if config_dets["DATABASE-DETAILS"]["DATABASE-TYPE"] == "mysql":
      DB_PATH = "mysql+pymysql://" + config_dets["DATABASE-DETAILS"]["USERNAME"] + config_dets["DATABASE-DETAILS"]["PASSWORD"] + "@" + DB_LOCATION
    else:
      DB_PATH = "sqlite:///" + DB_LOCATION
    app.config["SQLALCHEMY_DATABASE_URI"] = DB_PATH
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]= False
    db.app = app
    db.init_app(app)
    db.create_all()
  except Exception as err_msg:
    server_logger.critical("Database configuration error - {}.".format(str(err_msg)))
    exit(1)

  ##CONTENT##
  @app.route('/', methods=['GET'])
  def home_route():
    return jsonify(
      title="Main route",
      user="none"
    )

  #Implement route modules
  app.register_blueprint(test_routes, url_prefix='/test')
  app.register_blueprint(command_routes, url_prefix='/commands')
  app.register_blueprint(dashboard_routes, url_prefix='/dash')
  app.register_blueprint(query_routes, url_prefix='/query')
  app.register_blueprint(metric_routes, url_prefix='/metrics')

  #Run the Flask app server
  if __name__ == '__main__':
    if config_dets["HTTPS-DETAILS"]["HTTPS-ENABLED"]:
      app.run(host=config_dets["SERVER-DETAILS"]["SERVER-ADDRESS"],port=config_dets["SERVER-DETAILS"]["SERVER-PORT"],debug=True,ssl_context='adhoc')
    else:
      app.run(host=config_dets["SERVER-DETAILS"]["SERVER-ADDRESS"],port=config_dets["SERVER-DETAILS"]["SERVER-PORT"],debug=True)
else:
  server_logger.critical("Failed to start the API server, issue with config file.")