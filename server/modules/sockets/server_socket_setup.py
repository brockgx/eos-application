#Import appropriate libraries
import socket
import threading
import time
from queue import Queue

#Import in house libraries
from socket_data_transfer import sendSocketData, receiveSocketData

#Define any constant expressions
IP = "127.0.0.1"
PORT = 1337

#Define any variables
all_connections = []
all_addresses = []
NUMBER_OF_THREADS = 2
JOB_NUMBER = [1, 2]
queue = Queue()

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

  except:
    print("Error accepting new connection")

#Listing Connections
def list_all_connections():
    results = ''
    for i, conn in enumerate(all_connections):
        try:
            sendSocketData(conn, "PINGING")
            #conn.send(str.encode("PINGING"))
            receiveSocketData(conn)
            #conn.recv(1024)

        except:
            del all_connections[i]
            del all_addresses[i]
            continue

        results += str(i) + "   " + str(all_addresses[i][0]) + "   " + str(all_addresses[i][1]) + "\n"

    print("----Clients----" + "\n" + results)

# Selecting the target client
def get_target():
    try:
        target = input("Please select the Client ID: ")
        target = int(target)
        conn = all_connections[target]
        print("You are now connected to :" + str(all_addresses[target][0]))
        print(str(all_addresses[target][0]) + ">", end="")

        return conn

    except:
        print("Selection not valid")
        return None

# Send commands to client
def send_target_commands(conn):   
    while True:
        try:
            cmd = input()
            if cmd == 'quit':
                break
            if cmd == 'dataone' or cmd == 'datatwo' : #change into function
                #Send via function
                sendSocketData(conn, cmd)
                time.sleep(2)
                client_response = receiveSocketData(conn)
                print(client_response)
                break #Switch function
            else:
                print("Command not valid")
                break
              
        except:
            print("Error sending commands")
            break

def manage_clients():
    while True:
        cmd = input(">> ")
        if cmd == 'list':
            list_all_connections()
        elif 'select' in cmd:
            conn = get_target()
            if conn is not None:
                send_target_commands(conn)
        elif 'exit' in cmd:
            exit() #exit command for turtle to be added
        else:
            print("Command not recognized")

# Create worker threads
def createworkers():
    for i in range(NUMBER_OF_THREADS):
        t = threading.Thread(target=do_it_all)
        t.daemon = True
        t.start()


#Combiner TEST
def do_it_all():
   while True:
      x = queue.get()
      if x == 1:
        yikes = start_socket_listener()
        bind_socket(yikes)
        accept_new_connections(yikes)
      if x == 2:
        manage_clients()

      queue.task_done()

def create_jobs():
    for x in JOB_NUMBER:
        queue.put(x)

    queue.join()

createworkers()
create_jobs()


#Listing all connections  /.
#Select a target      /.
#Data Transmissions      
#AES modules importing
#Switch Statement   /.
#SSL
#Closing a connection
