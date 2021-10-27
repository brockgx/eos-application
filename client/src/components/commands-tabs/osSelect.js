import * as React from 'react';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState} from 'react';


export default function BasicSelect(props) {
    const [osChoice, setOsChoice] = useState('');
    const [value, setValue] = useState('');

  const handleClick = (event) => {

    setOsChoice(event.currentTarget.value);
    props.changeOS(event.currentTarget.value);
    
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Operating System</InputLabel>
        <Select
          label="Age"
          variant="outlined"
          defaultValue=""
          value={osChoice}
          onClick={handleClick}
        >
          <MenuItem value="windows">Windows</MenuItem>
          <MenuItem value="linux">Linux</MenuItem>
          <MenuItem value="powershell">Powershell</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}