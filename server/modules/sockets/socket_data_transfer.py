#import third party libraries
import pickle
import time

#import personal libraries
from ..security.AESEncryption import do_encrypt

#Constants
HEADERSIZE = 10
RECVSIZE = 16

#Global variables

#Function: send data
def sendSocketData(socketConn, message):
  #The full message to send with the buffer
  #encrypted_msg = do_encrypt(message)
  #serialized_msg = pickle.dumps(encrypted_msg)
  #full_msg = bytes(f'{len(str(serialized_msg)):<{HEADERSIZE}}' + str(serialized_msg)[2:][:-1], "utf-8")
  full_msg = bytes(f'{len(message):<{HEADERSIZE}}' + message, "utf-8")
  print(full_msg)
  

  #Send the message if available
  try:
    socketConn.sendall(full_msg)
  except:
    print("Failure message")

#Function: receive data
def receiveSocketData(socketConn):
  #function variables
  receive_msg = True
  new_msg = True
  complete_msg = b''

  while receive_msg:
    try:
      msg = socketConn.recv(RECVSIZE)
    except:
      receive_msg = False
    
    if new_msg:
      length_msg = int(msg[:HEADERSIZE])
      new_msg = False

    complete_msg += msg

    if len(complete_msg)-HEADERSIZE == length_msg:
      #Do something with the data - print example
      receieved_msg = complete_msg[HEADERSIZE:].decode("utf-8")

      #Decrypt here


      new_msg = True
      complete_msg = ''
      receive_msg = False
  
  return receieved_msg