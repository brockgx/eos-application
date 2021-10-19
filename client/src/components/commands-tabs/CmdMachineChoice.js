import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import  {useState } from 'react';
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

export default function CmdMachineChoice(props) {
    
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [value, setValue] = useState();
    const [machineChoice, setMachineChoice] = useState('');

    const handleChange = (event, newValue) => {
      event.preventDefault();
      props.changeMachine(event.target.value)
      setMachineChoice(event.target.value)
      setValue(newValue)
      //console.log(machineChoice)
    }

   // console.log(props)

    const handleSubmit = (event, newValue) => {
      event.preventDefault();
       console.log(machineChoice)
       setMachineChoice(newValue)
       alert('Custom command should be: ' + machineChoice);
       
    }

    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        await sleep(1e3); // For demo purposes. This can be awaiting for the data to be received from the API
  
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

    console.log(value)


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

          isOptionEqualToValue={(option, value) => option.machineID === value.machineID}
          disableCloseOnSelect
          getOptionLabel={(option) => option.machineID}
          
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option.machineID}
            </li>
          )}

          options={options}
          value={value}
          loading={loading}
          fullWidth
          onChange={handleChange}
         // onChange={(e, newValue) => setValue(newValue)}
          style={{marginBottom: 30}}

          renderInput={(params) => (
            <TextField {...params} 
              variant="outlined"
              fullWidth 
              label="Select your target machine" 
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
      </AutocompleteWrapper>
    </MainContainer>
  );
}

//hardcoded but will be 
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