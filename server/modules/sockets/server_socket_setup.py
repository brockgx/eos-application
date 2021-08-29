#Import appropriate libraries
import socket
import threading
import time
import requests
from queue import Queue

#Import in house libraries
from .socket_data_transfer import sendSocketData, receiveSocketData

#Define any constant expressions
#

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
    # IP = input("Please enter the IP: ")
    # PORT = input("Please enter the PORT: ")
    IP = "0.tcp.ngrok.io"
    PORT = "16868"
    server_socket.connect((IP, int(PORT)))

    return server_socket

  except socket.error as err_msg:
    print("There was an error connecting to the socket.: " + str(err_msg))


# Selecting the target client
def get_target(soc):
    try:
        target = input("Please select the PORT: ")
        connection = 'False'
        sendSocketData(soc, target)
        print("data sent")
        client_response = receiveSocketData(soc)
        print(client_response)

        if client_response == "connected":
            print("You are now connected to PORT:" + target)
            connection = 'True'
        else:
            print("PORT rejected by agent")

        return connection

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
            if cmd == 'dataone':
                sendSocketData(conn, cmd)
                time.sleep(2)
                client_response = receiveSocketData(conn)
                print(client_response)
                break
            if cmd == 'datatwo':
                sendSocketData(conn, cmd)
                time.sleep(4)
                client_response = receiveSocketData(conn)
                print(client_response)
                ## Push to DB
                requests.post("http://1902-49-192-234-73.ngrok.io/addmetrics", data=client_response)
                break
            else:
                print("Command not valid")
                break
              
        except:
            print("Error sending commands")
            break

def manage_clients(conn):
    while True:
        cmd = input(">> ")
        if cmd == 'list':
            print("list")
        elif 'select' in cmd:
            connection = get_target(conn)
            if connection == 'True':
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
        manage_clients(yikes)
      if x == 2:
          print("test")

      queue.task_done()

def create_jobs():
    for x in JOB_NUMBER:
        queue.put(x)

    queue.join()
