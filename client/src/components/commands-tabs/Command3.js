import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField, 
  CssBaseline, 
  Input, 
  Grid, 
  Button, 
} from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '65vh',
  },
}));

export default function Command3(){

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
      [TODO: command 3]
      </div>
      <div>
        <TextField
          id="custom-cmd"
          multiline
          label="Required"
          variant="outlined"
          required
          margin="normal"
          fullWidth
        >

        </TextField>


      </div>
    </div>
  )
}


