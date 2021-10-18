#Import third party libraries
import socket
import threading
import time

#Import in house libraries
from .socket_data_transfer import sendSocketData, receiveSocketData
from ..metrics.client_metrics import start_agent, get_json

#Define any constant expressions
AGENT_SOCKET_DETAILS = {
  "AGENT_IP": "127.0.0.1",
  "AGENT_PORTS": [1337, 1338]
}
NUM_OF_SOCKET_LISTENERS = len(AGENT_SOCKET_DETAILS["AGENT_PORTS"])

#Define any global variables
allSocketConnections = []
allSocketConnectionAddresses = []


#Function: Generate the server socket
#Params:
#   - socketIp:    the socket IP
#   - socketPort:  the socket port #
#Returned (either):
#   - The created socket
#   - False, if error occurs
def configureSocket(socketIp, socketPort):
  try:
    agentSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    agentSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    print("Binding socket to port: " + str(socketPort))
    agentSocket.bind((socketIp, socketPort))
    agentSocket.listen(2)

    return agentSocket
  except Exception as errMsg:
    print("[Error] Socket creation failed - msg: " + str(errMsg))
    return False


#Function: Generate and start a new thread
#Params:
#   - targetFunction: the function the thread will run
#   - targetArgs:     the corresponding function arguments
#Returned:
#   - None
def createNewThread(targetFunction, targetArgs = ()):
  agentThread = threading.Thread(target=targetFunction, args=targetArgs)
  agentThread.daemon = True
  agentThread.start()


#Function: Accepting new connections to the sockets
#Params:
#   -  agentSocket: the socket object for connections
#Returned:
#   - None
def acceptNewConnections(agentSocket):
  for conns in allSocketConnections:
    conns.close()
  
  del allSocketConnections[:]
  del allSocketConnectionAddresses[:]

  try:
    while True:
      serverSocket, serverAddress = agentSocket.accept()
      agentSocket.setblocking(1)
    
      allSocketConnections.append(serverSocket)
      allSocketConnectionAddresses.append(serverAddress)
      print(f"Connection from {serverAddress} has been established!")

      #Start a new thread once a connection occurs to run commands
      createNewThread(runAgentCommands, (serverSocket,))
  except Exception as errMsg:
    print("[Error] Message: " + str(errMsg))


#Function: Agent command execution block
#Params:
#   - agentSocket: the socket object
#Returned:
#   - None
def runAgentCommands(agentSocket):
  while True:
    data = receiveSocketData(agentSocket)

    print(data)

    if data == 'Data_Request':
      sendSocketData(agentSocket, "Welcome to the socket for data")
    if data == 'getmessage':
      sendSocketData(agentSocket, "Welcome to the socket for messaging")
    if data == 'PINGING':
      sendSocketData(agentSocket, "I'm Alive")
    if data == 'JSON':
      json_output = get_json()
      sendSocketData(agentSocket,json_output)


def setupAgentSocket(socketNum):
  newSocket = configureSocket(AGENT_SOCKET_DETAILS['AGENT_IP'], AGENT_SOCKET_DETAILS['AGENT_PORTS'][socketNum])
  acceptNewConnections(newSocket)

def createSockets():
  for i in range(NUM_OF_SOCKET_LISTENERS):
    createNewThread(setupAgentSocket, (i,))

def startAgent():
  # Start Metrics Threads
  start_agent()


#JUST A TEST FUNCTION
def testMe():
  print(f"{NUM_OF_SOCKET_LISTENERS}")
  print(f"{AGENT_SOCKET_DETAILS}")
  print(f"{AGENT_SOCKET_DETAILS['AGENT_IP']}")
  print(f"{AGENT_SOCKET_DETAILS['AGENT_PORTS']}")

  #socky = configureSocket("127.0.0.1", 1338)
  #print(socky)
  #createNewThread(acceptNewConnections, (socky,))

