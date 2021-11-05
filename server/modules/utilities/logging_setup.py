#
# Custom logger file used to create both stream and file loggers
# to capture specific information or error messages
#

#Import third party dependencies
import logging, sys
from os import path
from platform import system

#Check whether the code has been run from the executable
#or run from the 'server.py' file in development mode
#then gets the base path as the executable path or
#the utilities dir path in modules/utilities
if getattr(sys, 'frozen', False):
  UTILITIES_DIR = path.dirname(sys.executable)
else:
  UTILITIES_DIR = path.abspath(path.dirname(__file__))

#Checks the system OS and then appends the log file name
if system() == "Windows":
  LOG_FILE = UTILITIES_DIR + "\\eos_server.log"
else:
  LOG_FILE = UTILITIES_DIR + "/eos_server.log"

#Creates two formatters one FORMATTER for the log file new entry format
#and FORMATTER_BASIC for shorter log messaging in the temrinal/console
FORMATTER    = logging.Formatter('[%(asctime)s] (%(filename)s|%(funcName)s|ln %(lineno)d) [%(levelname)s]: %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
FORMATTER_BASIC = logging.Formatter('[%(asctime)s] [%(levelname)s]: %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
STREAM_HANDLER = logging.StreamHandler()
FILE_HANDLER = logging.FileHandler(LOG_FILE)
LOG_LEVEL = logging.DEBUG

#Creates the handlers, one stream handler for terminal/console output
#and one for outputting to the log file
FILE_HANDLER.setFormatter(FORMATTER)
STREAM_HANDLER.setFormatter(FORMATTER_BASIC)

#Creates the logger to be imported in other files
#Sets up the handlers and log level
#If console output wasn't needed, the STREAM_HANDLER can be removed 
server_logger = logging.getLogger(__name__)
server_logger.setLevel(LOG_LEVEL)
server_logger.addHandler(FILE_HANDLER)
server_logger.addHandler(STREAM_HANDLER)