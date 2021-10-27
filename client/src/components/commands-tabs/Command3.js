import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useState} from 'react';

const CmdThreeContainer = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-items: center;
`;


const CustomInputWrapper = styled.div`
padding: 0px;
width: 100%;
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
      <div style={{paddingTop: "10px", width: "100%", fontSize:'20px'}}>
      Custom Commands. Enter Command(s) to run.
      </div>
      <form onSubmit={handleSubmit}>
      <CustomInputWrapper>
          <div style={{width: "100%"}}>
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
          </div>
          </CustomInputWrapper>
          <div style={{display: "flex", justifyContent: "left", alignItems: "center", paddingTop: "20px"}}>
          <Button
            style={{width: "50%"}} 
            type="submit"
            variant="contained"
          >
            Push Command
          </Button>
          </div>
        </form>
      
    </CmdThreeContainer>
  )
}


