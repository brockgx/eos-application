import React from 'react';
import { TextField, Input, Button, FormControl } from '@material-ui/core';
import { AttachFile, PinDropSharp} from '@material-ui/icons';
import styled from 'styled-components';
import { useState} from 'react';


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
      margin-bottom: 0px;
`;

const UploadFileBtn = styled.div`
      display: flex;
      padding-top: 20px;
      padding-bottom: 10px;
      width: 100%;
     
`;

const FileDestContainer = styled.div`
      margin-top: 10px;
      margin-bottom: 10px;
`;

const InputWrapper = styled.div`
      padding: 1px;
`;

export default function Command2(props){
  const [file, setFile] = useState(null);
  const [fileDest, setFileDest] = useState('');

  console.log(file)
  console.log(fileDest)
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('A file was submitted: ' + file.name);
    alert('File destination will be: ' + fileDest);
  }

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

  let uploadFile = (event) => {
    event.preventDefault();
    if(file !== null || fileDest === "") {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const final = reader.result.split(",", 2);
        console.log(reader.result);
        console.log(final[1]);
        props.filePush("The file: ***" + `${file.name}` + "*** has been sent to the selected machine to this directory: " + `${fileDest}`)
       // alert('A file was submitted: ' + file.name);
        //alert('File destination will be: ' + fileDest);
        //postFile(reader.result);
      }
      console.log("File uploading");
    } else {
      if(file !== null) { console.log("Error: no file has been uploaded"); }
      else { console.log("Error: no file location has been entered"); }
    }
  }

  return (
  <MainContainer>
    <CmdTwoContainer>
      <form onSubmit={uploadFile}>
      <FormControl style={{width: "100%"}}>
      <FileOption>
        <div style={{fontSize: "20px", width: "100%", paddingTop: "10px"}}>
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
            placeholder={(file === null || file === undefined ) ? 'No file chosen.' : `${file.name}`}
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
            onChange={handleFileDest}
            style = {{marginBottom:10, marginTop:10, fontSize:'20px'}}
          />
        </InputWrapper>
      </FileDestContainer>
      <BtnWrapper>
        <Button
          fullWidth     
          type="submit"
          variant="contained"
          onSubmit={uploadFile} 
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
