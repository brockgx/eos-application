#
# Module to hold the functionality for sending over a socket
# and for receiving a dynamic size over the socket with encryption
#

#Import third party libraries
import io, sys, time

#Import custom modules
from ..security.AESEncryption import do_encrypt, do_decrypt


#Constants
HEADERSIZE = 10
RECVSIZE = 4096

#Function: send data
def sendSocketData(socketConn, message):  
  # Encrypt message
  encryptedBytes = do_encrypt(message)
  # Create byte stream of encrypted message
  encryptedMsg = io.BytesIO(encryptedBytes)
  # Get length of encrypted message
  encryptedLength = len(encryptedBytes)
  # Block socket while receiveing stream of data
  socketConn.setblocking(1)
  # Get length converted to 4 bytes (little endian)
  bytelen = encryptedLength.to_bytes(4,'little')
  socketConn.send(bytelen)
  
  with encryptedMsg as f:
      while True:
          # read the bytes from the file
          bytes_read = f.read(RECVSIZE)
          if not bytes_read:
              socketConn.setblocking(0)
              break
          socketConn.sendall(bytes_read)

#Function: receive data
def receiveSocketData(socketConn):
  #function variables
  import io
  datarecv = io.BytesIO()
  socketConn.setblocking(1)
  
  size = socketConn.recv(4)
  filesize = int.from_bytes(size,'little')
  recvbytes = 0
  # start receiving the byte steam from the socket
  # write to memory
  with datarecv as f:
      while True:
        # If bytes received is larger than filesize, end
        if(recvbytes >= filesize):
          break
        bytes_read = socketConn.recv(RECVSIZE)
        # if not more bytes read, end and unblock socket
        if not bytes_read: 
            socketConn.setblocking(0)
            break
        # write bytes read to local byte stream
        f.write(bytes_read)
        recvbytes = f.tell()
      # Decrypt and return value
      return do_decrypt(datarecv.getvalue())
