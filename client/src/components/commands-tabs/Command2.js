import React from 'react';
import { TextField, CssBaseline, Input, Button, FormControl } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import styled from 'styled-components';
import { useState} from 'react';


const MainContainer= styled.div`
      padding: 0px;
      box-sizing: border-box;
`;

const CmdTwoContainer = styled.div`
      margin: 1px;
`;

const BtnWrapper= styled.div`
      padding: 1px;
`;

const FileOption = styled.div`
      margin-bottom: 20px;
      
     
`;

const UploadFileBtn = styled.div`
      padding-top: 10px;
      padding-bottom: 10px;
      width: 100%;
`;

const FileDestContainer = styled.div`
      padding: 10px;
      
      margin-top: 10px;
      margin-bottom: 20px;
`;

const InputWrapper = styled.div`
      padding: 1px;
      margin-left: 10px;
      margin-right: 10px;
`;

export default function Command2(){
  const [file, setFile] = useState(null);
  const [fileDest, setFileDest] = useState('');

   console.log(file)
   console.log(fileDest)
   const handleSubmit = (event) => {
   event.preventDefault();
    alert('A file was submitted: ' + file.name);
    alert('File destination will be: ' + fileDest);
   }

  return (
  <MainContainer>
    <CssBaseline/>
      <CmdTwoContainer>
        <form onSubmit={handleSubmit}>
        <FormControl style={{width: "100%"}}>
        <FileOption>
          <div style={{
            padding: "10px",
            fontSize: "20px",
            width: "100%",

          }}>
            Click the button to select the file you would like to send:
          </div>
          
          <UploadFileBtn >
            <Input     
              type="file" 
              name="fileUpload"
              variant="outlined"
              style={{display: 'none'}} 
              id="fileUpload"
              onChange={(e) => setFile(e.currentTarget.files[0])}
            />
           
          <label htmlFor="fileUpload">
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
            style={{marginLeft: '30px', width: "70%"}}
              id="fileNameDisplay"
              placeholder="No file chosen."
              inputProps={{readOnly: true,}}
            />
          </UploadFileBtn>
        </FileOption>
      <div >
          {file === null ? 'No file chosen.' : `selected file is: ${file.name}`}
      </div>
        <FileDestContainer>
          Please enter the desired file destination:
          <InputWrapper>
            <TextField
              placeholder="eg. C:\Program Files\Adobe"
              fullWidth
              required
              name="fileDest"
              value={fileDest}
              onChange={(e) => setFileDest(e.currentTarget.value)}
              style = {{marginBottom:10, marginTop:10}}
            />
          </InputWrapper>
        </FileDestContainer>
        <BtnWrapper>
          <Button
            fullWidth     
            type="submit"
            variant="contained"
            onSubmit={handleSubmit} 
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
