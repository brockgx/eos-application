/*
 * Name: AvailApps.js
 * Purpose: Renders a dropdown "Autocomplete"-based component that makes up part of the 'Command Page' 
 * 
 * Usage: Child of Command.js 
 *        Fetches App data from database and displays in an Autocomplete dropdown component.
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

// Styled component declarations
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

export default function AvailApps(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const [value, setValue] = useState();

    const [appsAvail, setAppsAvail] = useState([])
      useEffect(() => {
        const getAppsAvail = async () => {
          const appsFromServer = await fetchAppsAvail()
          setAppsAvail(appsFromServer)
          }
        getAppsAvail()
  }, [])

    
    const mac = props.machChoice.mac_address
    //Fetch app data from DB
    const fetchAppsAvail = async () => {
      if (mac != undefined){
      const resp = await fetch(`/commands/machineapps/${mac}`)
      const data = await resp.json()
        if(resp.ok) {
          console.log(data)
          return data.content;
        } else {
            throw Error(`Request rejected with status ${resp.status}`);
        }
      }}

    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        await sleep(1e3); // For demo purposes. This can be awaiting fetch availApps, or removed entirely.
        if (active) {
          setOptions([...appsAvail]);
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
      props.changeAppChoice(newValue || "")
   }

  return (
    <MainContainer>
      <AutocompleteWrapper>
        <InputLabel style={{marginBottom: "15px", fontWeight: "600"}}>Select target application.</InputLabel>
        <Autocomplete
          id="avail-apps-demo"
          open={open}
          onOpen={() => {
          setOpen(true);
          }}
          onClose={() => {
          setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          disableCloseOnSelect
          options={options}
          getOptionLabel={(option) => option.app_name + " (PID: " + option.pid + ")"}
          renderTags={() => null}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.id}>
              {option.app_name + " (PID: " + option.pid + ")"} 
            </li>
          )}
          style={{marginTop: "8px", width: "75%"}}
          loading={loading}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} 
              variant="outlined"
              placeholder="discord.exe"
              required
              id="appsInput"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? 
                    <CircularProgress 
                      color="inherit" 
                      size={22} 
                      style={{
                        marginBottom: 10, 
                        marginRight: 10}} /> : null
                      }
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