import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useState} from 'react';
import { useEffect } from 'react';
const CmdThreeContainer = styled.div`
padding: 1px;
`;

const CustomInputWrapper = styled.div`
padding: 1px;
`;


export default function Command3(props){
  const [value, setValue] = useState();
  const [customCmd, setCustomCmd] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    props.changeCmd(event.target.value)
    setCustomCmd(event.target.value)
   
    console.log(customCmd)
  }

  const handleSubmit = (event, newValue) => {
    event.preventDefault();
     console.log(customCmd)
     setCustomCmd(newValue)
     alert('Custom command should be: ' + customCmd);
     
  }
  console.log(props)
  //console.log(value)
  //useEffect(() => { console.log(customCmd)}, [customCmd])
  return (
    <CmdThreeContainer>
      <div>
      Command 3 - Custom Commands. Enter Command(s) to run.
      </div>
      <CustomInputWrapper>
        <form onSubmit={handleSubmit}>
        <TextField
          id="customCmd"
          name="customCmd"
          multiline
          minRows={4}
          placeholder="eg. schtasks /run /tn <taskname> [/s <computer> [/u [<domain>\]<user> [/p <password>]]]"
          variant="outlined"
          required
          margin="normal"
          fullWidth
          //value={customCmd}
          value={value}
          onChange={handleChange}
          
         // onChange={(e, newValue) => setCustomCmd(newValue)}
        // onChange={(event) => props.changeCmd(event.target.value)}
         //onChange ={useEffect(() => { console.log(value)}, [value] )}
        >
        </TextField>
        <Button
          fullWidth
          type="submit"
          variant="contained"
        >
          Push Command
        </Button>
        </form>
      </CustomInputWrapper>
    </CmdThreeContainer>
  )
}


