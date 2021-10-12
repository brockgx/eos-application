import React from 'react';
import {
        TextField, 
        CssBaseline, 
        Input, 
        Grid, 
        Button, 
      } from '@material-ui/core';

import { AttachFile } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';


const CmdTwoGridContainer = styled(Grid)`
      padding: 1px;
`;

const BtnWrapper= styled.div`
      padding: 1px;
      Width: 100%;
      display: flex;
      align-content: center;
      justify-content: space-between;
`;

const MainContainer= styled.div`
      justify-content: space-between;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
`;

const HeadingText= styled.div`
      justify-content: space-between;
`;

const FileOption = styled.div`
padding: 1px;
`;

const UploadFileWrapper = styled.div`
padding: 1px;
`;

const UploadFileBtn = styled.div`
padding: 1px;
`;

const FileDestContainer = styled.div`
padding: 1px;
`;

const InputWrapper = styled.div`
padding: 1px;
`;

export default function CMDTWOREF(){
  const handleSubmit = (onSubmit) => {
    alert(`thank you for your message`);
   };

  return (
    <MainContainer>
      <CssBaseline/>
      <Form onSubmit = {handleSubmit} >
        <CmdTwoGridContainer 
          item container 
          xs = {12} 
          elevation = {10} 
          spacing = {3} 
          direction = "column"
        >
          <Grid item>
            <HeadingText>
              Step 1. Please select the file you would like to send
            </HeadingText>
            <Grid 
              container 
              direction = "column"
            >
              <FileOption
                item xs = {12} 
                elevation = {4} 
                alignItems = "flex-start"
              >
                <UploadFileWrapper>
                  <Paper
                  > Click the button to select the file you would like to send.
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
                          variant="raised" 
                          color="default" 
                          component="span"
                        >
                          Upload File <AttachFile></AttachFile>
                        </Button>
                      </label>
                    </UploadFileBtn>
                  </Paper>
                </UploadFileWrapper>
              </FileOption>
            </Grid>
          </Grid>
                    
          <Grid item>
            <FileDestContainer>
              <Grid 
                container 
                direction = "column" 
                xs={12} 
              >
                <Grid item>
                  <Paper>
                    Please enter the desired file destination:
                    <InputWrapper>
                      <TextField
                        placeholder="Enter File Destination Here"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        style = {{marginBottom:10, marginTop:10}}
                      />
                    </InputWrapper>
                  </Paper>
                </Grid>
              </Grid>
            </FileDestContainer>
          </Grid>
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
        </CmdTwoGridContainer>
      </Form>
    </MainContainer>
  )
}