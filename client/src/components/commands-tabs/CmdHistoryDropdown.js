/*
 * Name: CmdHistoryDropdown.js
 * Purpose: Renders a dropdown "Autocomplete"-based component that make up the 'Command Page' 
 * 
 * Usage: Child of Command.js 
 *        Fetches Past 25 commands data from the database and displays options in an Autocomplete dropdown component.
 *        This component is based on the Autocomplete component template provided for free on material-ui's website.
 *        Source: https://mui.com/components/autocomplete/#asynchronous-requests
 */


// Module imports here
import React from 'react';
import {useState } from 'react';
import {useEffect } from 'react';

// Component imports here
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

    const [cmdHistoryChoice, setCmdHistoryChoice] = useState([])
      useEffect(() => {
        const getCmdHistory = async () => {
          const cmdHistoryFromServer = await fetchCmdHistory()
          setCmdHistoryChoice(cmdHistoryFromServer)
          }
        getCmdHistory()
  }, [])

    //Fetch command data from DB
    const fetchCmdHistory = async () => {
      const resp = await fetch(`/commands/pastcommands`)
      const data = await resp.json()
        if(resp.ok) {
          console.log(data)
          return data.content;
        } else {
            throw Error(`Request rejected with status ${resp.status}`);
        }
      }
   
    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        await sleep(1e3); // For demo purposes. This can be removed or integrated with the fetchCmdHistory command.
        if (active) {
          setOptions([...cmdHistoryChoice]);
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
          getOptionLabel={(option) => option.machine_name + " (" + option.command_type + ") " + "#" + option.id }
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option.machine_name + " (" + option.command_type + ") " + "#" + option.id } 
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