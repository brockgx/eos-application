import React from 'react';
import {
        TextField, 
        CssBaseline, 
        Input,
        Button, 
      } from '@material-ui/core';

import { AttachFile } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { useState} from 'react';

const CmdTwoContainer = styled.div`
      padding: 1px;
     
`;

const BtnWrapper= styled.div`
      padding: 1px;
`;

const MainContainer= styled.div`
      padding: 1px;
`;

const Form = styled.form`
      padding: 1px;
`;

const HeadingText= styled.div`
      padding: 1px;
`;

const FileOption = styled.div`
      padding-left: 20px;
      margin-bottom: 20px;
     
      border: 1px solid grey;
`;

const UploadFileWrapper = styled.div`
      padding: 1px;
`;

const UploadFileBtn = styled.div`
      padding: 1px;
`;

const FileDestContainer = styled.div`
      padding: 1px;
      border: 1px solid grey;
      margin-top: 10px;
      margin-bottom: 20px;
`;

const InputWrapper = styled.div`
      padding: 1px;
      margin-left: 10px;
      margin-right: 10px;
`;

export default function Command2(){

  const handleSubmit = (onSubmit) => {
    alert(`thank you for your message`);
   };
  
  return (
  <MainContainer>
    <CssBaseline/>
    <Form onSubmit = {handleSubmit} >
      <CmdTwoContainer>
        <FileOption>
          Click the button to select the file you would like to send.
          <UploadFileBtn>
            <Input     
              type="file" 
              variant="outlined"
              className="UploadFileBtn" 
              style={{display: 'none'}} 
              id="upload-file-button"
            />
            <label htmlFor="upload-file-button">
            <Button 
              variant="outlined" 
              color="default" 
              component="span"
            >
              Upload File <AttachFile />
            </Button>
            </label>
          </UploadFileBtn>
        </FileOption>

        <FileDestContainer>
          Please enter the desired file destination:
          <InputWrapper>
            <TextField
              placeholder="eg. C:\Program Files\Adobe"
              fullWidth
              required
              style = {{marginBottom:10, marginTop:10}}
            />
          </InputWrapper>
        </FileDestContainer>
        <BtnWrapper>
          <Button
            fullWidth
            onSubmit={handleSubmit}               
            type="submit"
            variant="contained"
          >
            Push File 
          </Button>
        </BtnWrapper>
      </CmdTwoContainer>
    </Form>
  </MainContainer>
  )
}
