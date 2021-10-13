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


export default function Command3(){

  const [customCmd, setCustomCmd] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    setCustomCmd(event.target.value)
    console.log(customCmd)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
     console.log(customCmd)
     alert('Custom command should be: ' + customCmd);
     
  }
   

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
          value={customCmd}
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


