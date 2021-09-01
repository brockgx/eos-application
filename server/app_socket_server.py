#Import third party dependencies
#Import in house dependencies
from modules.sockets.server_socket_setup import createworkers, create_jobs

#Execute the socket server
def start_socket_server():
  createworkers()
  create_jobs()

start_socket_server()