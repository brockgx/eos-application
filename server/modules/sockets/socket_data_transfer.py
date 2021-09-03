#import third party libraries
import pickle
import time

#import personal libraries
#from ..security.AESEncryption import serialize

#Constants
HEADERSIZE = 10
RECVSIZE = 16

#Global variables

#Function: send data
def sendSocketData(socketConn, message):
  #The full message to send with the buffer
  #full_msg = bytes(f'{len(str(serialized_msg)):<{HEADERSIZE}}' + str(serialized_msg)[2:][:-1], "utf-8")
  #encrypted_test = serialize(message)
  #print(encrypted_test)
  full_msg = bytes(f'{len(message):<{HEADERSIZE}}' + message, "utf-8")
  #length = bytes(f'{len(str(encrypted_test)):<{HEADERSIZE}}')
  #full_msg = length + encrypted_test
  #print(full_msg)
  

  #Send the message if available
  try:
    socketConn.sendall(full_msg)
  except:
    print("Failure message")

#Function: receive data
def receiveSocketData(socketConn):
  #function variables
  #receieved_msg = "EMPTY"
  receive_msg = True
  new_msg = True
  length_msg = True
  complete_msg = b''

  while receive_msg:
    try:
      msg = socketConn.recv(RECVSIZE)
    except:
      receive_msg = False

    if msg != b'':
      if new_msg:
        length_msg = int(msg[:HEADERSIZE])
        new_msg = False
        
      complete_msg += msg
      
      if len(complete_msg)-HEADERSIZE == length_msg:
        #Do something with the data - print example
        receieved_msg = complete_msg[HEADERSIZE:].decode("utf-8")

        #Decrypt here
        #my_msg = receieved_msg[2:][:-1]
        #print(my_msg)
        #byte_msg = my_msg.encode()
        #print(byte_msg)
        #deserialized = pickle.loads(byte_msg)


        new_msg = True
        complete_msg = ''
        receive_msg = False
        
  return receieved_msg