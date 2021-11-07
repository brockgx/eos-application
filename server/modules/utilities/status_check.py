import time, threading, requests

from .logging_setup import server_logger

#Function: to call the endpoint for checking machine status
#Params:
#   - api_endpoint: the route to send call for status check
#   - check_delay: the time until the next check
#Returned:
#   - None
def check_status(api_endpoint, check_delay):
  server_logger.info("Client machine status checker started.")
  while True:
    time.sleep(check_delay)

    try:
      server_logger.info("Starting machine status check...")
      statuses = requests.get(api_endpoint)
      server_logger.info("The status of all machines has been checked.")
    except Exception as err_msg:
      server_logger.error("There has been an issue with the route: {}.".format(err_msg))

#Function: Generate and start a new thread
#Params:
#   - target_function: the function the thread will run
#   - target_args:     the corresponding function arguments
#Returned:
#   - None
def start_status_thread(api_endpoint, check_delay):
  t = threading.Thread(target=check_status, args=(api_endpoint, check_delay))
  t.daemon = True
  t.start()