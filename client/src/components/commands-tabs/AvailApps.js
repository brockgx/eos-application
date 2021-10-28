import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import  {useState } from 'react';
import styled from 'styled-components';
import {useEffect } from 'react';
import {useContext} from 'react';
import {AppsAvailContext} from './appsContext';
import { MachineContext } from './machineContext';

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
    const [machContext, setMachContext] = useState('')
    const [appsContext, setAppsContext] = useContext(AppsAvailContext)

   
    {/* const handleChange = (event, newValue) => {
      event.preventDefault();
      props.changeApp(newValue || "")
      setValue(newValue || "")
    }
    */}

    const [appsAvail, setAppsAvail] = useState([])
      useEffect(() => {
        const getAppsAvail = async () => {
          const appsFromServer = await fetchAppsAvail()
          setAppsAvail(appsFromServer)
          }
        getAppsAvail()
  }, [])

//Fetch app data from DB


    const fetchAppsAvail = async () => {
    const resp = await fetch(`/commands/machineapps/${props.machine.mac_address}`)
    const data = resp.json()
      if(resp.ok) {
        console.log(data.content)
        return data;
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
        await sleep(1e3); // For demo purposes.
  
        if (active) {
          setOptions([...appsAvailTest]);
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

    
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('A command was submitted: ' + `${value}`);
  }

    

  return (
    <MainContainer>
      
      <AutocompleteWrapper>
       
        <Autocomplete
          id="avail-apps-demo"
          open={open}
          onOpen={() => {
          setOpen(true);
          }}

          onClose={() => {
          setOpen(false);
          }}
          
          isOptionEqualToValue={(option, value) => option.name === value.name}
          disableCloseOnSelect
          options={options}
          getOptionLabel={(option) => option.name}
          renderTags={() => null}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option.name + "( PID: " + option.pid + ")"} 
            </li>
          )}
          value={value}
          loading={loading}
          //onChange={handleChange}
          //onChange={(e, newValue)=> setValue(newValue || "")}
          onChange={(e, newValue)=> setValue(newValue || "")}
          renderInput={(params) => (
            <TextField {...params} 
              variant="outlined"
              placeholder="discord.exe"
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




const appsAvailTest = [
  { name: 'discord.exe'},
  { name: 'notepad.exe'},
  { name: 'explorer.exe'},
  { name: 'Taskmgr.exe'},
  { name: 'Spotify.exe'},
  { name: 'AdobeUpdateService.exe'},
  { name: 'chrome.exe'},
 
];
