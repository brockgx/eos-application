import React from 'react';
import { TextField, CssBaseline, Input, Button, FormControl } from '@material-ui/core';
import { AttachFile, RoundedCorner } from '@material-ui/icons';
import styled from 'styled-components';
import { useState} from 'react';
import { borderRadius } from '@mui/system';


const MainContainer= styled.div`
      padding: 0px;
      box-sizing: border-box;
`;

const CmdTwoContainer = styled.div`
      margin: 0px;
`;

const BtnWrapper= styled.div`
      padding: 1px;
`;

const FileOption = styled.div`
      margin-bottom: 20px;
`;

const UploadFileBtn = styled.div`
      display: flex;
      padding-top: 30px;
      padding-bottom: 10px;
      width: 100%;
`;

const FileDestContainer = styled.div`
      margin-top: 10px;
      margin-bottom: 20px;
`;

const InputWrapper = styled.div`
      padding: 1px;
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
    <CmdTwoContainer>
      <form onSubmit={handleSubmit}>
      <FormControl style={{width: "100%"}}>
      <FileOption>
        <div style={{fontSize: "20px", width: "100%"}}>
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
            placeholder={file === null ? 'No file chosen.' : `${file.name}`}
            inputProps={{readOnly: true,}}
          />
        </UploadFileBtn>
      </FileOption>
    
      <FileDestContainer style = {{fontSize:'20px'}}>
        Please enter the desired file destination:
        <InputWrapper>
          <TextField
            placeholder="eg. C:\Program Files\Adobe"
            fullWidth
            required
            name="fileDest"
            value={fileDest}
            onChange={(e) => setFileDest(e.currentTarget.value)}
            style = {{marginBottom:10, marginTop:10, fontSize:'20px'}}
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
