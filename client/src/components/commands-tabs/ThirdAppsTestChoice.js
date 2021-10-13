import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBox from '@material-ui/icons/CheckBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from "@material-ui/core/Chip";
import  {useState } from 'react';

//D:\Users\Alex\Documents\2_University\2021_Sem2\SWE40002\Code Copies\2.10.21 what the files looked like at 6-46-am\before deleted old avail machine tab\src\components\CmdMachineChoice.js
function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export default function FavAppsCheckbx() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [favApps, setFavApps] = useState([]);
    const onDelete = (appID) => () => {
        setFavApps((favApps) => favApps.filter((a) => a.appID !== appID));
    }
    console.log(favApps);
    

    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        await sleep(1e2); // For demo purposes.
  
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
      multiple
      id="checkboxes-tags-avail-machines-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, favApps) => option.appID === favApps.appID}
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
      value={favApps}
      onChange={(e, newFavApps) => setFavApps(newFavApps)} 
      loading={loading}
      style={{ width: 500}}
      renderInput={(params) => (
        <TextField {...params} 
        label="Select the applications you would like to favourite." 
        variant="outlined"
        placeholder="eg. chrome.exe, discord.exe etc. "
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
    <div>
        {
       // manage and render your own tag list here
       } 
       {favApps.map((a) =>(
           <Chip key={a.appID} label={a.appID} onDelete={onDelete(a.appID)} />
            
       ))}
       
    </div>
    </div>
  );
}

// currently hardcoded, but should be able to dynamically get this info
//
const appsAvail = [
  { appID: 'The Shawshank Redemption', year: 1994, group: "13th Site"},
  { appID: 'The Godfather', year: 1972, group: "Sydney Site" },
  { appID: 'The Godfather: Part II', year: 1974, group: "13th Site"},
  { appID: 'The Dark Knight', year: 2008, group: "Sydney Site"},
  { appID: '12 Angry Men', year: 1957, group: "Sydney Site"},
  { appID: "Schindler's List", year: 1993, group: "Melbourne Site" },
  { appID: 'Pulp Fiction', year: 1994, group: "Melbourne Site" },
  { appID: 'City of God', year: 2002 },
  { appID: 'Se7en', year: 1995 },
  { appID: 'The Silence of the Lambs', year: 1991 },
  { appID: "It's a Wonderful Life", year: 1946 },
  { appID: 'Life Is Beautiful', year: 1997 },
  { appID: 'The Usual Suspects', year: 1995 },
  { appID: 'Léon: The Professional', year: 1994 },
  { appID: 'Spirited Away', year: 2001 },
  { appID: 'Saving Private Ryan', year: 1998 },
  { appID: 'Once Upon a Time in the West', year: 1968 },
  { appID: 'American History X', year: 1998 },
  { appID: 'Interstellar', year: 2014 },
 
];