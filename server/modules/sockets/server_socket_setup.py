#Import of any third party libraries
import socket
import time
import ipaddress
import json
from sys import exit

#Import of any in house modules
from .socket_data_transfer import sendSocketData, receiveSocketData
from ..data_collection.data import data_collection

#Constants
HOST = "127.0.0.1"
PORT = 1337


#Function: instantiate socket and connect
#Params:
#   - host (server IP to connect to)
#   - port (the corresponding port to connect TCP)
#Returned (either):
#   - False, due to a bad connection
#   - The socket object, after successful connection
def connectToAgent(host, port):
  #Try socket connection, otherwise display error
  try:
    sock = socket.socket()
    sock.connect((host,int(port)))
    return sock
  except Exception as errMsg:
    print("Failed to connect to the agent")
    print(f"[Error] Msg: {errMsg}")
    return False


#Function: To get user input of connection IP and Port #
#          and validate the input
#Params:
#   - None
#Returned (either):
#   - False, due to invalid inputs or validation
#   - A tuple, of the connection IP and Port #
def getAgentSocketDetails():
  #Initialise variables for loops and the returned result
  validate = True
  result = False
  #Open first loop for getting the IP address
  while validate:
    #Initialise detail validation flags
    validateIp = False
    validatePort = False
    
    #Trigger user input to get the IP address
    userIpSelection = input("Enter agent IP > ")
    
    #Validate the IP address, if correct move to port selection
    #otherwise catch exception and return response, users to enter value in again
    try:
      ipaddress.IPv4Network(userIpSelection)
      validateIp = True
    except:
      print("[Error] Invalid IP entered")

    #If IP is valid open loop to enter a port #
    if validateIp:
      while validate:
        #Trigger user input to get the Port #
        userPortSelection = input("Select port #> ")

        #Validate the port #, if true the result will be the details and loops will break
        #otherwise an error will be printed and users will be asked to enter again
        if 1 <= int(userPortSelection) <= 65535:
          validatePort = True
          validate = False
          result = (userIpSelection, int(userPortSelection))
        else:
          print("[Error] Invalid port number entered")
  
  #Return either false or the connection details
  return result


#Function: main execution to connect and transfer data (temporary)
#Params:
#   - None
#Returned:
#   - None
def startServer():
  print("Server started...")

  #Start main to get connection details and run an infinte loop
  #to run commands and data transfer
  while True:
    #Initialise connection flag and retrieve agent details
    #if a new connection is wanted
    connectedSuccessfully = False
    machineConnection = input("Connect to a new agent [Y/y else exit] > ")
    if machineConnection == "Y" or machineConnection == "y":
      agentDetails = getAgentSocketDetails()

      #If the agent details are correct try and connect to the agent
      #if successful alter the flag to enter command loop otherwise
      #catch exceptions and output error message
      if agentDetails != False:
        try:
          agentSocket = connectToAgent(agentDetails[0], agentDetails[1])
          if agentSocket != False:
            connectedSuccessfully = True
        except Exception as errMsg:
          print(f"Unable to connect to the agent (IP: {agentDetails[0]}, Port: {agentDetails[1]})")
          print(f"[Error] Msg: {errMsg}")
      else:
        print("Something went wrong with entered details, please enter again...")
    else:
      exit()
    
    #Once connected start the server functions
    while connectedSuccessfully:
      #Continuously gather user input
      cmd = input(f"[{agentDetails[0]} : {agentDetails[1]}]> ")
      print(cmd)
      #Check input against functionality and run a particular process
      #if exit is input, command loop will break and user can reconnect

      if cmd == "getdata":
        data_collection(agentSocket)
      elif cmd == "getmessage":
        sendSocketData(agentSocket, cmd)
        time.sleep(2)
        client_response = receiveSocketData(agentSocket)
        print(client_response)
      elif cmd == "ping":
        sendSocketData(agentSocket, "PINGING")
        time.sleep(2)
        client_response = receiveSocketData(agentSocket)
        print(client_response)
      elif cmd == "json":
        sendSocketData(agentSocket, "JSON")
        time.sleep(2)
        client_response = receiveSocketData(agentSocket)
        print(client_response)
      elif cmd.startswith("cmd"):
        command = cmd.find(' ')+1
        left, right = cmd[:command], cmd[command:]
        x = {
            "TYPE": "command",
            "ATTRIBUTE": right
        }
        sendCommand = ''.join("CMD\n" + json.dumps(x))
        sendSocketData(agentSocket, sendCommand) # add command
        time.sleep(2)
        client_response = receiveSocketData(agentSocket)
        print(client_response)
      elif cmd.startswith("shell"):
        command = cmd.find(' ')+1
        left, right = cmd[:command], cmd[command:]
        x = {
            "TYPE": "shell",
            "ATTRIBUTE": right
        }
        sendCommand = ''.join("SHELL\n" + json.dumps(x))
        sendSocketData(agentSocket, sendCommand) # add command
        time.sleep(2)
        client_response = receiveSocketData(agentSocket)
        print(client_response)
      elif cmd == "exit":
        print("----------------\n Session Closed \n----------------")
        break
      else:
        print("Command not accepted on the agent")
