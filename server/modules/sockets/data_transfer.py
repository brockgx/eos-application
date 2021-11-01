#import third party libraries
import pickle
import time

#import personal libraries
#from ..security.AESEncryption import serialize

#Constants
HEADERSIZE = 10
RECVSIZE = 16

#Global variables

#Function: To send data across the socket
#Params:
#   - socketConn: the socket connection to receive data from
#   - message: the message to send as a string
#Returned:
#   - None
def sendSocketData(socketConn, message):
  #The full message to send with the buffer
  #full_msg = bytes(f'{len(str(serialized_msg)):<{HEADERSIZE}}' + str(serialized_msg)[2:][:-1], "utf-8")
  #encrypted_test = serialize(message)
  #print(encrypted_test)
  fullMsg = bytes(f'{len(message):<{HEADERSIZE}}' + message, "utf-8")
  #length = bytes(f'{len(str(encrypted_test)):<{HEADERSIZE}}')
  #full_msg = length + encrypted_test
  #print(full_msg)
  

  #Send the message if available
  try:
    socketConn.sendall(fullMsg)
  except:
    print("Failure message")

#Function: To receive socket data
#Params:
#   - socketConn: the socket connection to receive data from
#Returned:
#   - The received message
def receiveSocketData(socketConn):
  #function variables
  #receieved_msg = "EMPTY"
  receiveMsg = True
  newMsg = True
  lengthMsg = True
  completeMsg = b''

  while receiveMsg:
    try:
      msg = socketConn.recv(RECVSIZE)
    except:
      receiveMsg = False

    if msg != b'':
      if newMsg:
        lengthMsg = int(msg[:HEADERSIZE])
        newMsg = False
        
      completeMsg += msg
      
      if len(completeMsg)-HEADERSIZE == lengthMsg:
        #Do something with the data - print example
        receievedMsg = completeMsg[HEADERSIZE:].decode("utf-8")

        #Decrypt here
        #my_msg = receieved_msg[2:][:-1]
        #print(my_msg)
        #byte_msg = my_msg.encode()
        #print(byte_msg)
        #deserialized = pickle.loads(byte_msg)


        newMsg = True
        completeMsg = ''
        receiveMsg = False
        
  return receievedMsg