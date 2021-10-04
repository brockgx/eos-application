import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBox from '@material-ui/icons/CheckBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import  {useState } from 'react';

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export default function AvailApps() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [value, setValue] = useState();

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

    


  return (
      <div>
    <Autocomplete
      id="checkboxes-tags-avail-machines-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.appID === value.appID}
      disableCloseOnSelect
      getOptionLabel={(option) => option.appID}
      renderTags={() => null}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.appID}
        </li>
      )}
      options={options}
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      loading={loading}
      renderInput={(params) => (
        <TextField {...params} 
        label="Select the application you would like to kill" 
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
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
//
const appsAvail = [
  { appID: 'discord.exe'},
  { appID: 'notepad.exe'},
  { appID: 'explorer.exe'},
  { appID: 'Taskmgr.exe'},
  { appID: 'Spotify.exe'},
  { appID: 'AdobeUpdateService.exe'},
  { appID: 'chrome.exe'},
 
];