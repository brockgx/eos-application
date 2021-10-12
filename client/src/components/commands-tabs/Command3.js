import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const CmdThreeContainer = styled.div`
padding: 1px;
`;

const CustomInputWrapper = styled.div`
padding: 1px;
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


