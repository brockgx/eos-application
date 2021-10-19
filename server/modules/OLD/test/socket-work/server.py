import select
import socket
import threading
import time
import sys
import queue

from modules.data_transfer import sendSocketData, receiveSocketData

#Constant expressions
SERVER_SOCKET_DETAILS = {
  "SERVER_IP": "127.0.0.1",
  "SERVER_PORTS": [1337, 1338]
}
NUM_OF_SOCKET_LISTENERS = len(SERVER_SOCKET_DETAILS["SERVER_PORTS"])

#Function: to setup the socket
def setupServerSocket(sock):
  serverSocket = configureSocket(SERVER_SOCKET_DETAILS['SERVER_IP'], SERVER_SOCKET_DETAILS['SERVER_PORTS'][sock])
  mainFunction(serverSocket)

#Function: to create each socket needed
def createSockets():
  for i in range(NUM_OF_SOCKET_LISTENERS):
    createNewThread(setupServerSocket, (i,))

#Function: configure a socket
def configureSocket(socketIp, socketPort):
  try:
    serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    serverSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    print("Binding socket to port: " + str(socketPort))
    serverSocket.bind((socketIp, socketPort))
    serverSocket.listen(5)

    return serverSocket
  except Exception as errMsg:
    print("[Error] Socket creation failed - msg: " + str(errMsg))
    return False

#Function: create a thread for each socket
def createNewThread(targetFunction, targetArgs = ()):
  serverThread = threading.Thread(target=targetFunction, args=targetArgs)
  serverThread.daemon = True
  serverThread.start()

#Function: main function
def mainFunction(sock):
  allSocketConnections = [sock]
  allSocketOutputs = []
  allMessageQueues = {}

  while allSocketConnections:
    print("\nWaiting for next event (" + str(sock.getsockname()[1]) + ")...")
    readable, writable, exceptional = select.select(allSocketConnections, allSocketOutputs, allSocketConnections)

    for read in readable:
      if read is sock:
        conn, c_addr = read.accept()
        print("New connection from: " + str(c_addr))
        conn.setblocking(0)
        allSocketConnections.append(conn)
        allMessageQueues[conn] = queue.Queue()
      else:
        data = receiveSocketData(read)
        if data:
          print("Receieved: " + str(data) + " from (" + str(read.getpeername()) + ").")
          allMessageQueues[read].put(data)
          if read not in allSocketOutputs:
            allSocketOutputs.append(read)
        else:
          print("Closing " + str(c_addr) + " after reading no data")
          if read in allSocketOutputs:
            allSocketOutputs.remove(read)
          allSocketConnections.remove(read)
          read.close()
          del allMessageQueues[read]

    for write in writable:
      try:
        next_msg = allMessageQueues[write].get_nowait()
      except queue.Empty:
        print("Output queue for " + str(write.getpeername()) + " is empty")
        allSocketOutputs.remove(write)
      else:
        print("Sending " + str(next_msg) + " to " + str(write.getpeername()))
        sendSocketData(write, next_msg)

    for exc in exceptional:
      print("Handling exceptional condition for " + str(exc.getpeername()))
      allSocketConnections.remove(exc)
      if exc in outputs:
        allSocketOutputs.remove(exc)
      exc.close()
      del allMessageQueues[exc]

createSockets()
while True:
  pass