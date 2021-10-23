from os import path
from platform import system
import yaml

from .server_logging import server_logger
#import yaml, os, platform

#Get the directory of the configuration file
CONFIG_DIR = path.abspath(path.join(__file__,"../../../"))
if system() == "Windows":
  CONFIG_PATH = CONFIG_DIR + "\\server_config.yml"
else:
  CONFIG_PATH = CONFIG_DIR + "/server_config.yml"

with open(CONFIG_PATH, "r") as ymlfile:
  cfg = yaml.safe_load(ymlfile)

#Config file is loading successfully, now need to validate entries in file
#Then return all the entries once valid

def get_config_details():
  return cfg["DATABASE-DETAILS"]