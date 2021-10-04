import * as React from 'react';

import ArrowForwardIosSharp from '@material-ui/icons/ArrowForwardIosSharp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AvailApps from './AvailApps';
import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const CmdAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const CmdAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
  theme.palette.type === 'dark'
    ? 'rgba(255, 255, 255, .05)'
    : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const CmdAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function PresetCommandOptions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      <CmdAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <CmdAccordionSummary  aria-controls="panel1d-content" id="panel1d-header">
          <Typography>COMMAND OPTION 1 - KILL PROCESS</Typography>
        </CmdAccordionSummary>
        <CmdAccordionDetails>
          <Typography style={{marginBottom: 0}} >
            This is command option 1 - Kill process. Please select the application you would like to kill.
            <Paper style={{
                marginTop: 30, }}
            >
            <AvailApps/>
            </Paper>
          </Typography>
          <Button
            variant="contained"
            onClick={handleClick}
          //when it is clicked, it puts the input into a json object, and displays on the right hand side saying "Application to kill: x"
          >
            Confirm
        </Button>
        </CmdAccordionDetails>
      </CmdAccordion>
      <CmdAccordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <CmdAccordionSummary  aria-controls="panel2d-content" id="panel2d-header">
          <Typography>COMMAND OPTION 2 - RESTART DEVICE</Typography>
        </CmdAccordionSummary>
        <CmdAccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </CmdAccordionDetails>
      </CmdAccordion>
      <CmdAccordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <CmdAccordionSummary  aria-controls="panel3d-content" id="panel3d-header">
          <Typography>COMMAND OPTION 3 - RESTART APPLICATION</Typography>
        </CmdAccordionSummary>
        <CmdAccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          </Typography>
        </CmdAccordionDetails>
      </CmdAccordion>
    </div>
  );
}