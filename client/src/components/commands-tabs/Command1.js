import * as React from 'react';

import ArrowForwardIosSharp from '@material-ui/icons/ArrowForwardIosSharp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AvailApps from './AvailApps';
import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import  {useState } from 'react';

const CmdAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
 
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
  '& .MuiAccordionSummary-expandIcon.Mui-expanded': {
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


export default function Command1() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [shutDevice, restartDevice, killProcess, restartProcess] = useState('');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
  const handleClick = (event) => {
    const value =  event.currentTarget.value;
    event.preventDefault();
    alert(`thank you for your message`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const value =  event.currentTarget.value;
     alert('A command was submitted: ' + `${value}`);
    }
   


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <CmdAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <CmdAccordionSummary  aria-controls="panel1d-content" id="panel1d-header">
          <Typography>PRESET COMMAND OPTION 1 - SHUTDOWN DEVICE</Typography>
        </CmdAccordionSummary>
        <CmdAccordionDetails>
          <div 
            className = "InputWButtonContain" 
            style={{
              display: 'flex', 
            }}
          >
            <div style={{
              flex: 3, 
              }}
            >
              <Typography>
                This is command option 1 - Shutdown device. Click confirm if you would like to shutdown "deviceName". 
              </Typography>
            </div>
            <Button
              variant="contained"
              type="submit"
              onSubmit={handleSubmit}
              value={shutDevice}
              style={{flex: 1, padding: '0px'}}
              //when it is clicked, it puts the input into a json object, and displays on the right hand side saying "Application to kill: x"
            >
              Confirm
            </Button>
          </div>
        </CmdAccordionDetails>
      </CmdAccordion>

      <CmdAccordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <CmdAccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>
            PRESET COMMAND OPTION 2 - RESTART DEVICE
          </Typography>
        </CmdAccordionSummary>
        <CmdAccordionDetails>
            <div 
              className = "InputWButtonContain" 
              style={{
                display: 'flex', 
              }}
            >
              <div style={{
                flex: 3, 
              }}>
              <Typography>
                This is command option 2 - restart device. Click confirm if you would like to restart "deviceName". 
              </Typography>
              </div>
              <Button
                variant="contained"
                onSubmit={handleSubmit}
                value={restartDevice}
                style={{flex: 1, padding: '0px'}}
                //when it is clicked, it puts the input into a json object, and displays on the right hand side saying "Application to kill: x"
              >
                Confirm
              </Button>
            </div>
          
        </CmdAccordionDetails>
      </CmdAccordion>

      <CmdAccordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <CmdAccordionSummary  aria-controls="panel3d-content" id="panel3d-header">
          <Typography>PRESET COMMAND OPTION 3 - KILL PROCESS</Typography>
        </CmdAccordionSummary>
        <CmdAccordionDetails>
          <Typography>
            This is command option 3 - Kill process. Please select the application you would like to kill.
            <div 
              className = "InputWButtonContain" 
              style={{
                marginTop: 30, 
                display: 'flex', 
              }}
            >
              <div 
                className = "AvailAppsContain" 
                style={{
                  flex: 3, 
                  alignContent: 'space-between', 
                  }}
              >
                <AvailApps/>
              </div>
              <Button
                variant="contained"
                onSubmit={handleSubmit}
                value={killProcess}
                style={{flex: 1, marginLeft: '20px', padding: '0px'}}
                //when it is clicked, it puts the input into a json object, and displays on the right hand side saying "Application to kill: x"
              >
                Confirm
              </Button>
            </div>
          </Typography>
        </CmdAccordionDetails>
      </CmdAccordion>

      <CmdAccordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <CmdAccordionSummary  aria-controls="panel4d-content" id="panel4d-header">
          <Typography>PRESET COMMAND OPTION 4 - RESTART APPLICATION</Typography>
        </CmdAccordionSummary>
        <CmdAccordionDetails>
          <Typography>
            This is command option 4 - Restart process. Please select the application you would like to restart.
            <div 
              style={{
                marginTop: 30, 
                display: 'flex', 
              }}
            >
              <div 
                style={{
                  flex: 3, 
                  alignContent: 'space-between', 
                  }}
              >
                <AvailApps/>
              </div>
              <Button
                variant="contained"
                onSubmit={handleSubmit}
                value={restartProcess}
                style={{flex: 1, marginLeft: '20px', padding: '0px'}}
                //when it is clicked, it puts the input into a json object, and displays on the right hand side saying "Application to kill: x"
              >
                Confirm
              </Button>
            </div> 
          </Typography>
        </CmdAccordionDetails>
      </CmdAccordion>
      </form>
    </div>
  );
}