#import personal libraries
from ..security.AESEncryption import do_encrypt, do_decrypt
import io
import sys
import time

#Constants
HEADERSIZE = 10
RECVSIZE = 4096

#Global variables

#Function: send data
def sendSocketData(socketConn, message):
  #The full message to send with the buffer
  encryptedBytes = do_encrypt(message)
  encryptedMsg = io.BytesIO(encryptedBytes)
  encryptedLength = len(encryptedBytes)
  # CURRENT
  # LENGTH: encryptedtestLen.encode()
  # MSG: encryptedMsg
  socketConn.setblocking(1)
  #SEP: \0 <null byte>
  #print(encryptedLength)
  bytelen = encryptedLength.to_bytes(4,'little')
  #print("bytelen")
  #print(bytelen)
  socketConn.send(bytelen)
  
  sentbytes = 0
  #progress = tqdm.tqdm(range(encryptedLength), f"Sending {encryptedLength} bytes", unit="B", unit_scale=True, unit_divisor=1024)
  with encryptedMsg as f:
      while True:
          # read the bytes from the file
          bytes_read = f.read(RECVSIZE)
          sentbytes = f.tell()
          #print(sentbytes)
          if not bytes_read:
              # file transmitting is done
              socketConn.setblocking(0)
              #print("File Sent!")
              break
          # we use sendall to assure transimission in 
          # busy networks
          #print("Sending data")
          socketConn.sendall(bytes_read)
          # update the progress bar
          #progress.update(len(bytes_read))
      
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
  #print("Rec socket started")
  #time.sleep(2)
  socketConn.setblocking(1)
  
  size = socketConn.recv(4)
  print(size)
  filesize = int.from_bytes(size,'little')
  print(filesize)
  #time.sleep(2)
  #datasize = int(test.decode())
  #print(datasize)
  #time.sleep(2)
  recvbytes = 0
  # start receiving the file from the socket
  # and writing to the file stream
  #progress = tqdm.tqdm(range(datasize), f"Receiving {str(datasize)} bytes", unit="B", unit_scale=True, unit_divisor=1024)
  with datarecv as f:
      while True:
        # read 1024 bytes from the socket (receive)
        #print("try read byte")
        #print("recv:" + str(recvbytes) + " size: " + str(filesize))
        if(recvbytes >= filesize):
          #print("END FILE FFS")
          break
        bytes_read = socketConn.recv(RECVSIZE)
        if not bytes_read: 
            #print("end")
            socketConn.setblocking(0)
            # nothing is received
            # file transmitting is done
            break
        # write to the file the bytes we just received
        #print("try write")
        f.write(bytes_read)
        recvbytes = f.tell()
        #print(recvbytes)
        #print("after write")
        # update the progress bar
        #progress.update(len(bytes_read))
      # Result
      return do_decrypt(datarecv.getvalue())