#import third party libraries
import pickle
import time

#import personal libraries
from ..security.AESEncryption import serialize

#Constants
HEADERSIZE = 10
RECVSIZE = 16

#Global variables

#Function: send data
def sendSocketData(socketConn, message):
  #The full message to send with the buffer
  encryptedMsg = serialize(message)
  #fullMsg = bytes(f'{len(message):<{HEADERSIZE}}' + message, "utf-8")
  

  #Send the message if available
  try:
    socketConn.sendall(encryptedMsg)
  except Exception as errMsg:
    print("[Error] Failure sending message: " + str(errMsg))

#Function: receive data
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