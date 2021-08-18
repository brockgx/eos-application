#import third party libraries

#import personal libraries

#Constants
HEADERSIZE = 10

#Global variables

#Function: send data
def sendSocketData(socketConn, message):
  #The full message to send with the buffer
  full_msg = bytes(f'{len(message):<{HEADERSIZE}}' + message, "utf-8")

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
      msg = socketConn.recv(16)
    except:
      receive_msg = False
    
    if new_msg:
      length_msg = int(msg[:HEADERSIZE])
      new_msg = False

    complete_msg += msg

    if len(complete_msg)-HEADERSIZE == length_msg:
      #Do something with the data - print example
      receieved_msg = complete_msg[HEADERSIZE:].decode("utf-8")
      new_msg = True
      complete_msg = ''
      receive_msg = False
  
  return receieved_msg