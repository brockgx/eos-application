#
# Handles all the configuration file reading and validation
# validates sections and attributes based on existence and type
#

#Import third party dependencies
from os import path
from platform import system
import yaml, sys

#Import any custom mode modules for the server
from .logging_setup import server_logger

#Function: to read the configuration yaml file
#Params:
#   - None
#Returned:
#   - The loaded config file, or False if there are issues.
def read_config_file():
  #Get the directory of the configuration file depending on whether
  #the program has been run from the executable or 'server.py' file
  if getattr(sys, 'frozen', False):
    CONFIG_DIR = path.dirname(sys.executable)
  else:
    CONFIG_DIR = path.abspath(path.join(__file__,"../../../"))

  #Append file name depending on the system OS
  if system() == "Windows":
    CONFIG_PATH = CONFIG_DIR + "\\server_config.yml"
  else:
    CONFIG_PATH = CONFIG_DIR + "/server_config.yml"

  #Attempt to load the config file, otherwise catch expection
  try:
    with open(CONFIG_PATH, "r") as ymlfile:
      return yaml.safe_load(ymlfile)
  except FileNotFoundError as err_msg:
    server_logger.critical("Config file missing - {}.".format(str(err_msg)))
    return False
  except Exception as err_msg:
    server_logger.critical("Could not load conifg file details - {}.".format(str(err_msg)))
    return False

#Function: validate the sections in the config file
#Params:
#   - config_dets: the config file details (Dictionary)
#   - sections: the list of sections to validate
#Returned:
#   - True/False depending on validation result
def validate_sections(config_dets, sections):
  #Check for a missing section in the config file
  #if missing log missing element and return False
  for valid_sec in sections:
    if valid_sec not in config_dets:
      server_logger.error("Missing section {} in config file.".format(valid_sec))
      return False

  return True

#Function: validate each sections attributes/details
#Params:
#   - config_dets: the config file details of the section (Dictionary)
#   - items: the items to check
#   - types: the types those items must be
#Returned:
#   - True/False depending on the result
def validate_section_details(config_dets, items, types):
  #Validate each attribute and type in the config file with a list of items and types
  #if valid return true, otherwise return false and log the issue
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
    
#Function: Load the details, and validate them against requirements
#Params:
#   - None
#Returned:
#   - True/False depending on config loading issues or validation issues
def validate_config_details():
  #Read config file
  cfg = read_config_file()
  if cfg != False:
    #Validate details against all_items
    all_items = {
      "SERVER-DETAILS": {"names": ["SERVER-ADDRESS","SERVER-PORT","PORT-ENABLED"], "types": [str,int,bool]},
      "HTTPS-DETAILS": {"names": ["HTTPS-ENABLED","CERTIFICATE-FILE","KEY_FILE"], "types": [bool,str,str]},
      "DATABASE-DETAILS": {"names": ["USERNAME","PASSWORD","DATABASE-TYPE","DATABASE-NAME","DATABASE-URI"], "types": [str,str,str,str,str]} 
    }
    #Validate sections
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

#Function: main config file function to use in 'agent.py'
#Params:
#   - None
#Returned:
#   - result from the config validation
def get_config_details():
  return validate_config_details()