import socket
import time
import sys

from modules.data_transfer import sendSocketData, receiveSocketData

server_address = ('localhost', 1338)

print("Connecting to " + str(server_address))
sock = socket.socket()
sock.connect(server_address)

num = 0
while True:
  msg = "Halo " + str(num)
  sendSocketData(sock, msg)
  time.sleep(20)
  data = receiveSocketData(sock)
  print(data)
  num = num + 1
