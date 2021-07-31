from flask import Blueprint

test_routes = Blueprint('test_routes',__name__)

@test_routes.route("/testone")
def test_one():
  return "Test route"