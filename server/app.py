#Import any downloaded/third party modules and packages
from flask import Flask, redirect, request, jsonify
import os

#Import any custom made modules
from modules.routes.test_routes import test_routes

#Setup any constants need to be used
HOST = "127.0.0.1"
PORT = 9999

#Setup any variables needed to be used

#Instantiate the flask application
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

##CONTENT##
@app.route('/', methods=['GET'])
def home_route():
  return jsonify(
    title="Main route",
    user="none"
  )

#Implement route module
app.register_blueprint(test_routes)

#Setup the flask app to listen
if __name__ == '__main__':
  port = 1337
  app.run(host='127.0.0.1', port=port, debug=True)