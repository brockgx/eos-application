import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    </div>
  )
}


