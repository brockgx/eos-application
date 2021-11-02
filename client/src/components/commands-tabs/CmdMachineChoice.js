import React from 'react';
import {useState } from 'react';
import {useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
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

/* 
    CmdMachineChoice.js 29/10/21 notes.
      -> Needs to have a message when there are no machines when you click the dropdown. It currently stays on loading...
      -> 
*/

export default function CmdMachineChoice(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [value, setValue] = useState();
    
    const [machines, setMachines] = useState([])
    useEffect(() => {
      const getMachines = async () => {
        const machinesFromServer = await fetchMachines()
        setMachines(machinesFromServer)
      }
      getMachines()
    }, [])

    // Fetch device data from DB
    const fetchMachines = async () => {
    const resp = await fetch(`/commands/availableMachines`)
    const data  = await resp.json()
      if(resp.ok) {
        console.log(data.content)
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
        await sleep(1e3); // For demo purposes. This can be awaiting for the data to be received from the API
        if (active) {
          setOptions([...machines]);
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
        setValue(newValue || "")
        props.changeMachChoice(newValue || "")
     }

  return (
    <MainContainer>
      <AutocompleteWrapper>
        <Autocomplete
          id="availMachinesInput"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name + " (" + option.mac_address + ")"}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option.name + " (" + option.mac_address + ")"} 
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
              label="Select your target machine" 
              placeholder="Machine 1, Machine 2 etc."
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

/*
//hardcoded for testing
const machinesAvail = [
  { machineID: 'MyronPC'},
  { machineID: 'BrockPC'},
  { machineID: 'AlexPC'},
  { machineID: 'DylanPC'},
  { machineID: 'KeeganPC'},
  { machineID: 'DipeshPC'},
  { machineID: 'AlfredPC'},
  { machineID: 'HitchcockPC'},
];

*/