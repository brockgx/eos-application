#Import of any third party libraries
import socket
import time
import ipaddress
from sys import exit

#Import of any in house modules
from .socket_data_transfer import sendSocketData, receiveSocketData

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
def connect_to_agent(host, port):
  #Try socket connection, otherwise display error
  try:
    sock = socket.socket()
    sock.connect((host,int(port)))
    return sock
  except Exception as err_msg:
    print("Failed to connect to the agent")
    print(f"[Error] Msg: {err_msg}")
    return False


#Function: To get user input of connection IP and Port #
#          and validate the input
#Params:
#   - None
#Returned (either):
#   - False, due to invalid inputs or validation
#   - A tuple, of the connection IP and Port #
def agent_socket_details():
  #Initialise variables for loops and the returned result
  validate = True
  result = False
  #Open first loop for getting the IP address
  while validate:
    #Initialise detail validation flags
    validate_ip = False
    validate_port = False
    
    #Trigger user input to get the IP address
    user_ip_selection = input("Enter agent IP > ")
    
    #Validate the IP address, if correct move to port selection
    #otherwise catch exception and return response, users to enter value in again
    try:
      ipaddress.IPv4Network(user_ip_selection)
      validate_ip = True
    except:
      print("[Error] Invalid IP entered")

    #If IP is valid open loop to enter a port #
    if validate_ip:
      while validate:
        #Trigger user input to get the Port #
        user_port_selection = input("Select port #> ")

        #Validate the port #, if true the result will be the details and loops will break
        #otherwise an error will be printed and users will be asked to enter again
        if 1 <= int(user_port_selection) <= 65535:
          validate_port = True
          validate = False
          result = (user_ip_selection, int(user_port_selection))
        else:
          print("[Error] Invalid port number entered")
  
  #Return either false or the connection details
  return result


#Function: main execution to connect and transfer data (temporary)
#Params:
#   - None
#Returned:
#   - None
def start_server():
  print("Server started...")

  #Start main to get connection details and run an infinte loop
  #to run commands and data transfer
  while True:
    #Initialise connection flag and retrieve agent details
    #if a new connection is wanted
    connected_successfully = False
    machine_connection = input("Connect to a new agent [Y/y else exit] > ")
    if machine_connection == "Y" or machine_connection == "y":
      agent_details = agent_socket_details()

      #If the agent details are correct try and connect to the agent
      #if successful alter the flag to enter command loop otherwise
      #catch exceptions and output error message
      if agent_details != False:
        try:
          agent_socket = connect_to_agent(agent_details[0], agent_details[1])
          if agent_socket != False:
            connected_successfully = True
        except Exception as err_msg:
          print(f"Unable to connect to the agent (IP: {agent_details[0]}, Port: {agent_details[1]})")
          print(f"[Error] Msg: {err_msg}")
      else:
        print("Something went wrong with entered details, please enter again...")
    else:
      exit()
    
    #Once connected start the server functions
    while connected_successfully:
      #Continuously gather user input
      cmd = input(f"[{agent_details[0]} : {agent_details[1]}]> ")

      #Check input against functionality and run a particular process
      #if exit is input, command loop will break and user can reconnect
      if cmd == "getdata" or cmd == "getmessage":
        sendSocketData(agent_socket, cmd)
        time.sleep(2)
        client_response = receiveSocketData(agent_socket)
        print(client_response)
      elif cmd == "ping":
        sendSocketData(agent_socket, "PINGING")
        time.sleep(2)
        client_response = receiveSocketData(agent_socket)
        print(client_response)
      elif cmd == "exit":
        print("----------------\n Session Closed \n----------------")
        break
      else:
        print("Command not accepted on the agent")
