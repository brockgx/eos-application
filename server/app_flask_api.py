#Import any downloaded/third party modules and packages
from flask import Flask, jsonify
from sys import exit

#Import any custom made modules
from modules.utilities.server_config import get_config_details
from modules.utilities.server_logging import server_logger
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

if config_dets != False:
  server_logger.info("Starting API server...")
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
    server_logger.critical("Database configuration error - {}".format(str(err_msg)))
    exit()

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
      print("HTTPS ENABLED")
      #app.run(host=HOST,port=PORT,debug=True,ssl_context=CONTEXT)
    else:
      app.run(host=config_dets["SERVER-DETAILS"]["SERVER-ADDRESS"],port=config_dets["SERVER-DETAILS"]["SERVER-PORT"],debug=True)
else:
  server_logger.critical("Failed to start the API server, issue with config file")