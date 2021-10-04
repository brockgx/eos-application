import * as React from 'react'
import PresetCommandOptions from './PresetCommandOptions';
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

  export default function Command1() {

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
    <div>
      <div style ={{marginBottom: 30,}}>
        [TODO: command 1]
      </div>

      <div>
        <PresetCommandOptions />
      </div>
      <div>

        
      </div>
    </div>
  )
}


