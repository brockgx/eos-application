/*
 * Name: command2.js
 * Purpose: Renders components that make up the 'Command Page' push file command tab (Tab 2)
 * 
 * Usage: Child of Command.js 
 *        Receives file object and file destination input and sends through to command.js through props
 */

// Module imports here
import React from 'react';
import { useState} from 'react';

// Component imports here
import { TextField, Input, Button, FormControl } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';

import styled from 'styled-components';

const MainContainer= styled.div`
      box-sizing: border-box;
`;

const FileOption = styled.div`
      margin-bottom: 0px;
`;

const UploadFileBtn = styled.div`
      display: flex;
      margin-top: 10px;
      padding-top: 20px;
      padding-bottom: 10px;
      width: 100%;
`;

const FileDestContainer = styled.div`
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 20px;
`;

const InputWrapper = styled.div`
      padding: 1px;
`;

export default function Command2(props){
  const [file, setFile] = useState(null);
  const [fileDest, setFileDest] = useState('');

  const handleFile = (event) => {
    event.preventDefault();
    props.changeFile(event.target.files[0])
    setFile(event.target.files[0])
  }

  const handleFileDest = (event) => {
    event.preventDefault();
    props.changeFileDest(event.target.value)
    setFileDest(event.target.value)
  }
  
  return (
  <MainContainer>
    <FormControl style={{width: "100%"}}>
      <FileOption>
        <div style={{fontSize: "20px", width: "100%", paddingTop: "15px"}}>
          Click the button to select the file you would like to send:
        </div>
        <UploadFileBtn >
          <Input     
            type="file" 
            name="fileUpload"
            variant="outlined"
            style={{display: 'none'}} 
            id="fileUpload"
            onChange = {handleFile}
          />
          <label htmlFor="fileUpload" style={{flex: 2}}>
          <Button 
            variant="outlined" 
            color="default" 
            component="span"
            value={file}
          > 
            Upload File <AttachFile />
          </Button>
          </label>

          <TextField
            style={{marginLeft: '10px', flex: 7}}
            id="fileNameDisplay"
            placeholder={(file === null || file === undefined ) 
            ? 'No file chosen.' 
            : `${file.name}`}
            inputProps={{readOnly: true,}}
          />
        </UploadFileBtn>
      </FileOption>
  
      <FileDestContainer>
        Please enter the desired file destination:
        <InputWrapper>
          <TextField
            placeholder="eg. C:\Program Files\Adobe"
            fullWidth
            required
            name="fileDest"
            value={fileDest}
            onChange={handleFileDest}
            style = {{
              marginBottom:10, 
              marginTop:10, 
              fontSize:'20px'}}
          />
        </InputWrapper>
      </FileDestContainer>
    </FormControl>
  </MainContainer>
  )
}
