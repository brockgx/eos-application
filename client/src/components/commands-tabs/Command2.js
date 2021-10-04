import React from 'react';
import {
        TextField, 
        CssBaseline, 
        Input, 
        Grid, 
        Button, 
      } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { AttachFile } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
  root: {
    height: '65vh',
  },

  fileOption: {
    //styling
    border: "1px solid grey",
    marginTop: "30px",
  },

  AvailMachines: {
    //styling
    border: "2px solid grey",
    marginTop: "30px",
  },
  FileDestination: {
    //styling
    border: "2px solid grey",
    marginTop: "30px",
  },

  Submit: {
    //styling
    border: "1px solid red",
    marginTop: "30px",
    padding: "15px",
  },

  DisplayAvailMachines: {
    //styling
    border: "2px solid green",
    padding: "15px",
    justifyContent: 'space-between',
  },

  form: {
    fullWidth: "true",
  },

  paper: {

  },


  OptionTwo: {
    marginTop: "15px",
    padding: "15px",
  },

  RightHandColumn:{
    padding: "15px",
    justifyContent: 'space-between',
  },

  CommandTwo: {
    marginTop: "30px",
    padding: "15px",
  },
}));


export default function Command2(){
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSubmit = (onSubmit) => {
    <h1>Your command has been sent</h1>
   };
  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
      <div className={classes.root}>
      <div>
        <CssBaseline/>
        <form className={classes.form}>
          
          <Grid item container xs ={12} elevation={10} spacing={3} direction="column" className={classes.OptionTwo}>
                  <Grid item>
                        <div className="CommandTwo">
                          <p>Step 1. Please select the file you would like to send</p>
                        </div>
                        <Grid container direction="column">
                          <Grid item xs ={12} className={classes.fileOption} elevation={4} alignItems="flex-start">
                          <Paper className={classes.paper}> Please select the file you would like to send.
                          <Input type="file" 
                                  variant="outlined" 
                                  style={{display: 'none'}} 
                                  id="upload-file-button"/>
                            <label htmlFor="upload-file-button">
                              <Button variant="raised" color="default" component="span">
                                Upload File <AttachFile></AttachFile>
                              </Button>
                            </label>
                          </Paper>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                  <Grid item>
                  <Grid container direction ="column" xs={12} className={classes.FileDestination}>
                      <Grid item>
                      <Paper className={classes.paper}>
                        This can be where you select the file destination
                        <TextField
                          placeholder="File Destination"
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          required
                          label="Write the file destination."
                          className="fileDest"
                          style = {{marginBottom:50, marginTop:30}}
                        />
                      </Paper>
                      </Grid>
                  </Grid>
                  </Grid>
            <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 2}}
                  onSubmit={handleSubmit}
                  className={classes.Submit}
                >
                  Push File 
            </Button>
          </Grid>    
        </form>
    </div>
    </div>
  )
}
