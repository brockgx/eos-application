import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useState} from 'react';

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
  }

  const handleSubmit = (event, newValue) => {
    event.preventDefault();
    setCustomCmd(newValue)
    alert('Custom command should be: ' + customCmd);
     
  }
  console.log(props)
  
  return (
    <CmdThreeContainer>
      <div>
      Custom Commands. Enter Command(s) to run.
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
            value={value}
            onChange={handleChange}
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


