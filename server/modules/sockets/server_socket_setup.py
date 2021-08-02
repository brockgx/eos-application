#Import appropriate libraries
import socket
import threading

#Define any constant expressions
IP = "127.0.0.1"
PORT = 8065

#Define any variables
all_connections = []
all_addresses = []

#Create the server socket and start listening
def start_socket_listener():
  try:
    global server_socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    return server_socket

  except socket.error as err_msg:
    print("Socket creation failed - Error: " + str(msg))

##Maybe we use processes for this, one for socket listening and the other for flask??