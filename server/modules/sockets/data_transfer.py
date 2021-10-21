#import personal libraries
from ..security.AESEncryption import do_encrypt, do_decrypt

#Constants
HEADERSIZE = 10
RECVSIZE = 16

#Global variables

#Function: send data
def sendSocketData(socketConn, message):
  #The full message to send with the buffer
  encryptedMsg = do_encrypt(message)
  encryptedtestLen = str(len(str(encryptedMsg)))

  #Send the message if available
  try:
    socketConn.sendall(encryptedtestLen.encode())
    socketConn.sendall(b'\0')
    socketConn.sendall(encryptedMsg)
  except Exception as error:
    print("Failure message")
    print(str(error))

#Function: receive data
def receiveSocketData(socketConn):
  #function variables
  receiveMsg = True
  newMsg = True
  lengthMsg = 0
  completeMsg = b''

  while receiveMsg:
    try:
      msg = socketConn.recv(RECVSIZE)

      if newMsg == False:
        completeMsg += msg
    except:
      receiveMsg = False

    if msg != b'':
      if newMsg:
        splitMsg = msg.split(b'\0')
        lengthMsg = int(splitMsg[0].decode())
        newMsg = False
        completeMsg+=splitMsg[1]

      if len(str(completeMsg)) == lengthMsg:
        receievedMsg = do_decrypt(completeMsg)
        receievedMsg = receievedMsg.decode()
        newMsg = True
        completeMsg = ''
        receiveMsg = False
          
  return receievedMsg
