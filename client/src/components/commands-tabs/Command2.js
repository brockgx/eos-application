import React from 'react';
import {
        TextField, 
        CssBaseline, 
        Input,
        Button, 
        Divider,
      } from '@material-ui/core';

import { AttachFile } from '@material-ui/icons';
//import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import { useForm } from 'react-hook-form';
//import { forwardRef, useImperativeHandle } from 'react';


const MainContainer= styled.div`
      padding: 0px;
`;

const CmdTwoContainer = styled.div`
      margin: 1px;
`;

const BtnWrapper= styled.div`
      padding: 1px;
`;

const FileOption = styled.div`
      display: flex;
      margin-bottom: 20px;
      border: 1px solid grey;
     
`;

const UploadFileBtn = styled.div`
      padding-top: 10px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      align-content: flex-start;
      flex: 2;
`;

const FileDestContainer = styled.div`
      padding: 10px;
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
  const [file, setFile] = useState({
    fileUpload: "",
    fileDest: "",
  });
  const [fileDest, setFileDest] = useState('');
  const { register } = useForm();

   const handleChange = (event) => {
        const value =  event.currentTarget.value;
        event.preventDefault();
        setFile({
          ...file,
          [event.currentTarget.name]: value
        })
        };
        //setFileDest(event.currentTarget.value)
        
        console.log(file.fileUpload)
        console.log(file.fileDest)
        console.log(`You clicked the ${file.fileUpload} button it worked`, file, fileDest )
   
   const handleSubmit = (event) => {
   event.preventDefault();
    alert('A file was submitted: ' + file.fileUpload);
    alert('File destination will be: ' + file.fileDest);
   }
  
  
  return (
  <MainContainer>
    <CssBaseline/>
      <CmdTwoContainer>
        <form onSubmit={handleSubmit}>
        <FormControl style={{width: "100%"}}>
        <FileOption>
          <div style={{
            display: "flex", 
            justifyContent: "flex-start",
            flexWrap: "wrap",
            flex: 3,
            padding: "10px",
            marginRight: "0px",
            fontSize: "20px",
          }}>
          Click the button to select the file you would like to send:
          </div>
          <Divider orientation="vertical" flexItem/>
          <UploadFileBtn >
            <Input     
              {...register('fileUpload', {required: true})} 
              type="file" 
              name="fileUpload"
              variant="outlined"
              style={{display: 'none'}} 
              id="fileUpload"
              onChange={handleChange}
            />
           
          <label htmlFor="fileUpload">
            <Button 
              variant="outlined" 
              color="default" 
              component="span"
              value={file.fileUpload}
            > 
              Upload File <AttachFile />
            </Button>
            </label>
    
          </UploadFileBtn>
        </FileOption>
        <button onClick={handleChange}>
          Pass console.log indirectly
        </button>
        <FileDestContainer>
          Please enter the desired file destination:
          <InputWrapper>
            <TextField
              placeholder="eg. C:\Program Files\Adobe"
              fullWidth
              required
              name="fileDest"
              value={file.fileDest}
              onChange={handleChange}
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
        </FormControl>
        </form>
      </CmdTwoContainer>
  </MainContainer>
  )
}
