from os import path
from platform import system
import yaml, sys

from .logging_setup import server_logger
#import yaml, os, platform

def read_config_file():
  #Get the directory of the configuration file
  if getattr(sys, 'frozen', False):
    CONFIG_DIR = path.dirname(sys.executable)
  else:
    CONFIG_DIR = path.abspath(path.join(__file__,"../../../"))
  
  if system() == "Windows":
    CONFIG_PATH = CONFIG_DIR + "\\server_config.yml"
  else:
    CONFIG_PATH = CONFIG_DIR + "/server_config.yml"

  try:
    with open(CONFIG_PATH, "r") as ymlfile:
      return yaml.safe_load(ymlfile)
  except FileNotFoundError as err_msg:
    server_logger.critical("Config file missing - {}.".format(str(err_msg)))
    return False
  except Exception as err_msg:
    server_logger.critical("Could not load conifg file details - {}.".format(str(err_msg)))
    return False

#Config file is loading successfully, now need to validate entries in file
#Then return all the entries once valid
def validate_sections(config_dets, sections):
  for valid_sec in sections:
    if valid_sec not in config_dets:
      server_logger.error("Missing section {} in config file.".format(valid_sec))
      return False

  return True

def validate_section_details(config_dets, items, types):
  for item in items:
    if item in config_dets:
      if isinstance(config_dets[item],types[items.index(item)]):
        result = True
      else:
        server_logger.error("{} must be of type {}".format(str(config_dets[item]), str(types[items.index(item)])))
        return False
    else:
      server_logger.error("Missing detail {} in config file".format(str(item)))
      return False
  return True
    
    
def validate_config_details():
  #Read config file
  cfg = read_config_file()
  if cfg != False:
    #Validate sections
    all_items = {
      "SERVER-DETAILS": {"names": ["SERVER-ADDRESS","SERVER-PORT","PORT-ENABLED"], "types": [str,int,bool]},
      "HTTPS-DETAILS": {"names": ["HTTPS-ENABLED","CERTIFICATE-FILE","KEY_FILE"], "types": [bool,str,str]},
      "DATABASE-DETAILS": {"names": ["USERNAME","PASSWORD","DATABASE-TYPE","DATABASE-NAME","DATABASE-URI"], "types": [str,str,str,str,str]} 
    }
    sections_valid = validate_sections(cfg, all_items)
    #Validate values
    if sections_valid:
      for section in all_items:
        valid_items = validate_section_details(cfg[section], all_items[section]["names"], all_items[section]["types"])
        if not valid_items:
          return False
      return cfg
    else:
      return False
  else:
    return False

def get_config_details():
  return validate_config_details()