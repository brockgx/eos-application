import socket
import time
import requests


#Import of any in house modules
from ..sockets.socket_data_transfer import sendSocketData, receiveSocketData

def data_collection(agentSocket):
    print("Requesting Data...")
    sendSocketData(agentSocket, "Data_Request")
    client_response = receiveSocketData(agentSocket)
    time.sleep (10)
    print(client_response)
    requests.post("http://localhost:5000/testone", data=client_response)
    time.sleep (20)