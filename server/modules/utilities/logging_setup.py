import logging
from os import path
from platform import system

UTILITIES_DIR = path.abspath(path.dirname(__file__))
if system() == "Windows":
  LOG_FILE = UTILITIES_DIR + "\\eos_server.log"
else:
  LOG_FILE = UTILITIES_DIR + "/eos_server.log"

FORMATTER    = logging.Formatter('[%(asctime)s] (%(filename)s|%(funcName)s|ln %(lineno)d) [%(levelname)s]: %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
FORMATTER_BASIC = logging.Formatter('[%(asctime)s] [%(levelname)s]: %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
STREAM_HANDLER = logging.StreamHandler()
FILE_HANDLER = logging.FileHandler(LOG_FILE)
LOG_LEVEL = logging.DEBUG

FILE_HANDLER.setFormatter(FORMATTER)
STREAM_HANDLER.setFormatter(FORMATTER_BASIC)

server_logger = logging.getLogger(__name__)
server_logger.setLevel(LOG_LEVEL)
server_logger.addHandler(FILE_HANDLER)
server_logger.addHandler(STREAM_HANDLER)