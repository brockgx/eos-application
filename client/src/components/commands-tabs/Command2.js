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
import FormControl from '@material-ui/core/FormControl';
import { useForm } from 'react-hook-form';
import { forwardRef, useImperativeHandle } from 'react';


const MainContainer= styled.div`
      padding: 0px;
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
     
     
`;

const CmdTwoContainer = styled.div`
      padding: 20px;
      
`;

const BtnWrapper= styled.div`
      padding: 1px;
`;

const FileOption = styled.div`
      padding-left: 10px;
      margin-bottom: 20px;
      border: 1px solid grey;
      display: flex;
      flex-direction: column;
      align-items: center;
`;

const UploadFileBtn = styled.div`
      padding: 10px;
      
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
        <form 
        style={{alignItems: 'center'}}
        onSubmit={handleSubmit}>
        <FormControl>
        <FileOption>
          Click the button to select the file you would like to send.
          <UploadFileBtn>
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
              style={{width: '100%', alignContent: 'center'}}
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
