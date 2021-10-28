import React from 'react';
import { useState} from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const CmdThreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const CustomInputWrapper = styled.div`
  width: 100%;
`;

const CustomCmdTitle = styled.div`
  padding-top: 10px;
  width: 100%;
  font-size: 20px;
`;

export default function Command3(props){
  const [value, setValue] = useState();
  const [customCmd, setCustomCmd] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    props.changeCmd(event.target.value)
    setCustomCmd(event.target.value)
  }
  
  return (
  <CmdThreeContainer>
    <CustomCmdTitle>
      Custom Commands. Enter Command(s) to run.
    </CustomCmdTitle>
    <CustomInputWrapper>
      <TextField
        id="customCmd"
        name="customCmd"
        multiline
        style={{paddingTop: "10px"}}
        minRows={4}
        placeholder="eg. ls "
        variant="outlined"
        required
        margin="normal"
        fullWidth
        value={value}
        onChange={handleChange}
      >
      </TextField>
    </CustomInputWrapper>
  </CmdThreeContainer>
  )
}


