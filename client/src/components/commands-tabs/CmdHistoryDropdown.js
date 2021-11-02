import React from 'react';
import {useState } from 'react';
import {useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';

import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 1px;
`;

const AutocompleteWrapper = styled.div`
  padding: 1px;
`;


function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function CmdHistoryDropdown(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const [value, setValue] = useState();

    //appsAvail is to be used when not using appsAvailTest hardcoded data
    {/**
        const [cmdHistoryTest, setCmdHistory] = useState([])
      useEffect(() => {
        const getCmdHistory = async () => {
          const cmdHistoryFromServer = await fetchCmdHistory()
          setCmdHistory(cmdHistoryFromServer)
          }
        getCmdHistory()
  }, [])

    
    //const mac = props.machChoice.mac_address
    //Fetch app data from DB
    const fetchCmdHistory = async () => {
     // if (mac != undefined){
      const resp = await fetch(`/commands/availableMachines`)
      const data = await resp.json()
        if(resp.ok) {
          console.log(data)
          return data.content;
        } else {
            throw Error(`Request rejected with status ${resp.status}`);
        }
      }
    //}
    */}
    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        await sleep(1e3); // For demo purposes. This can be awaiting fetch availApps, or removed entirely.
        if (active) {
          //appsAvailTest is hardcoded array for testing console.log of data.content (line 48) from fetchAppsAvail
          setOptions([...cmdHistoryTest]);
        }
      })();
  
      return () => {
        active = false;
      };
    }, [loading]);
  
    React.useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);


    const handleChange = (event, newValue) => {
      event.preventDefault(); 
      console.log(value)
      setValue(newValue || "")
      props.changeCmdHistoryChoice(newValue || "")
   }

   return (
    <MainContainer>
      <AutocompleteWrapper>
      <InputLabel style={{marginBottom: "15px", fontWeight: "600"}}>Select command entry to open its details.</InputLabel>
        <Autocomplete
          id="availMachinesInput"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.id}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option.id + " (" + option.command_type + ", " + option.machine_id + ")"} 
            </li>
          )}
          options={options}
          loading={loading}
          fullWidth
          onChange={handleChange}
          style={{marginBottom: 0}}
          renderInput={(params) => (
            <TextField {...params} 
              variant="outlined"
              fullWidth
              placeholder="Command 1, Command 2 etc."
              required
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={22} style={{marginBottom: 10, marginRight: 10}} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />  
          )} 
        />
      </AutocompleteWrapper>
    </MainContainer>
  );
}


//hardcoded array of test data for testing that the fetchAvailApps is receiving data.content properly 
const cmdHistoryTest = [
  { id: 'Command 1', timestamp: "10:30PM 02/11/21", machine_id: 'Machine_A', command_type: 'ShutdownDevice', output: "output successful"},
  { id: 'Command 2', timestamp: "1:30PM 02/11/21", machine_id: 'Machine_B', command_type: 'RestartDevice', output: "output successful"},
  { id: 'Command 3', timestamp: "2:30PM 02/11/21", machine_id: 'Machine_C', command_type: 'ShutdownDevice', output: "output successful"},
  { id: 'Command 4', timestamp: "10:30PM 02/11/21", machine_id: 'Machine_D', command_type: 'PushFile', output: "output successful", parameters: {file_name: "test.txt", file_dest: "C:/Desktop"}},
  { id: 'Command 5', timestamp: "10:30AM 02/11/21", machine_id: 'Machine_E', command_type: 'KillProcess', output: "output successful", parameters: {app_pid: "12875", app_name: "notepad.exe"}},
  { id: 'Command 6', timestamp: "11:30AM 02/11/21", machine_id: 'Machine_F', command_type: 'Custom Command', output: "output successful", parameters: {content: "ls -l"}},
  { id: 'Command 7', timestamp: "3:00AM 02/11/21", machine_id: 'Machine_G', command_type: 'RestartDevice', output: "output successful"},
  { id: 'Command 8', timestamp: "1:30AM 01/11/21", machine_id: 'Machine_H', command_type: 'KillProcess', output: "output successful", parameters: {app_pid: "10000", app_name: "word.exe"}},
  { id: 'Command 9', timestamp: "10:30PM 02/10/21", machine_id: 'Machine_I', command_type: 'PushFile', output: "output successful", parameters: {file_name: "another.txt", file_dest: "C:/Users/Alex/DeskDuties"}},
  { id: 'Command 10', timestamp: "10:30PM 02/11/21", machine_id: 'Machine_J', command_type: 'Custom Command', output: "output successful", parameters: {content: "dir -w"}},
  { id: 'Command 11', timestamp: "10:30PM 02/11/21", machine_id: 'Machine_K', command_type: 'RestartApp', output: "output successful",  parameters: {app_pid: "75", app_name: "vscode.exe"}},
];
