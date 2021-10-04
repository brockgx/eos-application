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

export default function CmdMachineChoice() {
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
          setOptions([...machinesAvail]);
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
      id="availMachinesInput"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.machineID === value.machineID}
      disableCloseOnSelect
      getOptionLabel={(option) => option.machineID}
      
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.machineID}
        </li>
      )}
      options={options}
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      loading={loading}
      style={{ width: 500, marginBottom: 30}}
      renderInput={(params) => (
        <TextField {...params} 
        label="Select your target machine(s)." 
        variant="outlined"
        placeholder="Machine 1, Machine 2 etc."
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

//hardcoded but will be 
const machinesAvail = [
  { machineID: 'The Shawshank Redemption'},
  { machineID: 'The Godfather'},
  { machineID: 'The Godfather: Part II'},
  { machineID: 'The Dark Knight'},
  { machineID: '12 Angry Men'},
  { machineID: "Schindler's List"},
  { machineID: 'Pulp Fiction'},
];