import React from 'react';
import {useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import  {useState } from 'react';
import styled from 'styled-components';
import {AppsContext} from './appContext';

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
    const [context, setContext] = useContext(AppsContext)

    const handleChange = (event, newValue) => {
      event.preventDefault();
      props.changeApp(newValue.appID)
      setValue(newValue)
      if (newValue === null){
        return "No application chosen."
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
          
          isOptionEqualToValue={(option, value) => option.appID === value.appID}
          disableCloseOnSelect
          options={options}
          getOptionLabel={(option) => option.appID}
          renderTags={() => null}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option.appID}
            </li>
          )}
          value={value}
          loading={loading}
          onChange={(e, newValue)=> setContext(newValue || "")}
          renderInput={(params) => (
            <TextField {...params} 
              variant="outlined"
              placeholder="discord.exe"
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

const appsAvail = [
  { appID: 'discord.exe'},
  { appID: 'notepad.exe'},
  { appID: 'explorer.exe'},
  { appID: 'Taskmgr.exe'},
  { appID: 'Spotify.exe'},
  { appID: 'AdobeUpdateService.exe'},
  { appID: 'chrome.exe'},
 
];