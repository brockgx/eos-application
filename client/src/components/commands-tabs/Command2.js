import React from 'react';
import {MenuItem, TextField, Checkbox, CssBaseline, Input, IconButton, FormControlLabel, Box, Container, Grid, Button, Menu  } from '@material-ui/core';
import {AttachFile} from '@material-ui/icons';
import styled from 'styled-components';
import { createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const Heading = styled.div`
  display: flex;
  align-items: left;
  justify-content: space-between;
  padding: 10px 20px 20px 40px;
`;

const TopText = styled.div`
  font-weight: 500;
  font-size: 44px;
  padding-bottom: 10px;
`;


const useStyles = createStyles((theme) => ({
  root: {
    height: '100vh',
  },

  fileOption: {
    //styling

  },

  AvailMachines: {
    //styling
  },
  FileDestination: {
    //styling
  },

  Submit: {
    //styling
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
    alert('Your file has been sent - Example Message');
   };
  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <div>
      <div className="CommandTwo">
        <h2>Command 2 - Upload File to send</h2>
        <p>Please select the file you would like to send</p>
      </div>

      <div className={classes.root}>
        <CssBaseline/>
        <form className={classes.form}>
        <Grid container spacing xs={12}>
        <Grid item xs ={12} className={classes.fileOption}>
          <Paper className={classes.paper}> This can be where you have your file to upload
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
        <Grid item xs={12} className={classes.AvailMachines}>
          <Paper className={classes.paper}> This can be where you Select a drop down menu of available machines
          
          <Button
            id="checkAvailMachine"
            aria-controls="machine-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true ' : undefined}
            onClick={handleClick}
          >
          Check available machines
          </Button>
          <Menu
              id="machineMenu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby' : 'checkAvailMachine',
              }}

          >
            <MenuItem onClick={handleClose}>Machine 1</MenuItem>
            <MenuItem onClick={handleClose}>Machine 2</MenuItem>
            <MenuItem onClick={handleClose}>Machine 3</MenuItem>
          </Menu>
          
          </Paper>

        </Grid>
        <Grid item xs={12} className={classes.FileDestination}>
          <Paper className={classes.paper}>
              
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                required
                label="This can be where you select the file destination."
                className="fileDest"
                style = {{marginBottom:50}}
              />
          </Paper>
        </Grid>
        </Grid>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
              className={classes.Submit}
            >
              Send File 
        </Button>
        </form>
      
    </div>
    </div>
  )
}
