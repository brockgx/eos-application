import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const CmdThreeContainer = styled.div`
  border: 3px solid purple;
`;

const CustomInputWrapper = styled.div`
  border: 3px solid green;
`;


export default function Command3(){

  return (
    <CmdThreeContainer>
      <div>
      Command 3 - Custom Commands. Enter Command(s) to run.
      </div>
      <CustomInputWrapper>
        <TextField
          id="custom-cmd"
          multiline
          label="Required"
          variant="outlined"
          required
          margin="normal"
          fullWidth
        >
        </TextField>
      </CustomInputWrapper>
    </CmdThreeContainer>
  )
}


