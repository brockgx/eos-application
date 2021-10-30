#import personal libraries
from ..security.AESEncryption import do_encrypt, do_decrypt
import io
import sys
import tqdm

#Constants
HEADERSIZE = 10
RECVSIZE = 4096

#Global variables

#Function: send data
def sendSocketData(socketConn, message):
  #The full message to send with the buffer
  encryptedMsg = io.BytesIO(do_encrypt(message))
  encryptedLength = sys.getsizeof(encryptedMsg)
  # CURRENT
  # LENGTH: encryptedtestLen.encode()
  # MSG: encryptedMsg
  #SEP: \0 <null byte>
  socketConn.send(f"{encryptedLength}".encode())
  
  progress = tqdm.tqdm(range(encryptedLength), f"Sending {encryptedLength} bytes", unit="B", unit_scale=True, unit_divisor=1024)
  with encryptedMsg as f:
      while True:
          # read the bytes from the file
          bytes_read = f.read(RECVSIZE)
          if not bytes_read:
              # file transmitting is done
              break
          # we use sendall to assure transimission in 
          # busy networks
          socketConn.sendall(bytes_read)
          # update the progress bar
          progress.update(len(bytes_read))
  ##Send the message if available
  #try:
  #  socketConn.sendall(encryptedtestLen.encode() + b'\0' + encryptedMsg)
  #except Exception as error:
  #  print("Failure message")
  #  print(str(error))

#Function: receive data
def receiveSocketData(socketConn):
  #function variables
  import io
  datarecv = io.BytesIO()
  
  datasize = socketConn.recv(RECVSIZE).decode()

  # start receiving the file from the socket
  # and writing to the file stream
  progress = tqdm.tqdm(range(datasize), f"Receiving {datasize} bytes", unit="B", unit_scale=True, unit_divisor=1024)
  with datarecv as f:
      while True:
          # read 1024 bytes from the socket (receive)
          bytes_read = datasize.recv(RECVSIZE)
          if not bytes_read:    
              # nothing is received
              # file transmitting is done
              break
          # write to the file the bytes we just received
          f.write(bytes_read)
          # update the progress bar
          progress.update(len(bytes_read))
      # Result
      return datarecv.getvalue()
  #receiveMsg = True
  #newMsg = True
  #lengthMsg = 0
  #completeMsg = b''
#
  #while receiveMsg:
  #  try:
  #    msg = socketConn.recv(RECVSIZE)
#
  #    if newMsg == False:
  #      completeMsg += msg
  #  except:
  #    receiveMsg = False
#
  #  if msg != b'':
  #    if newMsg:
  #      splitMsg = msg.split(b'\0')
  #      lengthMsg = int(splitMsg[0].decode())
  #      newMsg = False
  #      completeMsg+=splitMsg[1]
#
  #    if len(str(completeMsg)) == lengthMsg:
  #      receievedMsg = do_decrypt(completeMsg)
  #      receievedMsg = receievedMsg.decode()
  #      newMsg = True
  #      completeMsg = ''
  #      receiveMsg = False
          
  #return receievedMsg