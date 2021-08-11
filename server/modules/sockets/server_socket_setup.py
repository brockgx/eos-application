#Import appropriate libraries
import socket
import threading

#Define any constant expressions
IP = "127.0.0.1"
PORT = 1337

#Define any variables
all_connections = []
all_addresses = []

#Create the server socket and start listening
def start_socket_listener():
  try:
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    return server_socket

  except socket.error as err_msg:
    print("Socket creation failed - Error: " + str(err_msg))

##Binding socket to port
def bind_socket(soc):
  try:
    print("Binding socket to port: " + str(PORT))

    soc.bind((IP,PORT))
    soc.listen(5)
  
  except socket.error as err_msg:
    print("Socket binding failed - Error: " + str(err_msg))

#Accepting connections
def accept_new_connections(soc):
  for c in all_connections:
    c.close()

  del all_connections[:]
  del all_addresses[:]

  try:
    while True:
      clientsocket, address = soc.accept()
      soc.setblocking(1)

      all_connections.append(clientsocket)
      all_addresses.append(address)

      print(f"Connection from {address} has been established!")
      for addr in all_addresses:
        print(f"{addr}")

  except:
    print("Error accepting new connection")

#Combiner TEST
def do_it_all():
  yikes = start_socket_listener()
  bind_socket(yikes)
  accept_new_connections(yikes)

do_it_all()