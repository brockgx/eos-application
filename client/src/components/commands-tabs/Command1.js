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
    const name =  event.currentTarget.name;
    event.preventDefault();
    console.log(name)
    alert(`A command was submitted: ${name}`);
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
          <div>
            Preset Option 1: Shutdown Device
          </div>
        </CmdAccordionSummary>
        <CmdAccordionDetails style={{flexDirection: "column"}}>
          <div 
            className = "InputWButtonContain" 
            style={{display: 'flex'}}>
            <div style={{flex: 3}}>
              <div>
                Click confirm to shutdown 
              </div>
            </div>
            <Button
              variant="contained"
              type="submit"
              name="shutDevice"
              //value={shutDevice}
              onClick={handleClick}
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
          <div>
            Preset Option 2: Restart Device
          </div>
        </CmdAccordionSummary>
        <CmdAccordionDetails>
            <div 
              className = "InputWButtonContain" 
              style={{display: 'flex'}}>
              <div style={{flex: 3}}>
                <div>
                  Click confirm to restart "deviceName". 
                </div>
              </div>
              <Button
                variant="contained"
                name="restartDevice"
                onClick={handleClick}
                //value={restartDevice}
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
          <div>
            Preset Option 3: Kill Process
          </div>
        </CmdAccordionSummary>
        <CmdAccordionDetails>
          <div>
            Please select the application you would like to kill then click 'confirm'.
            <div 
              className = "InputWButtonContain" 
              style={{marginTop: 30, display: 'flex'}}>
              <div 
                className = "AvailAppsContain" 
                style={{flex: 3, alignContent: 'space-between'}}>
                <AvailApps/>
              </div>
              <Button
                variant="contained"
                name="killProcess"
                onClick={handleClick}
                //onSubmit={handleSubmit}
                value={killProcess}
                style={{flex: 1, marginLeft: '20px', padding: '0px'}}
                //when it is clicked, it puts the input into a json object, and displays on the right hand side saying "Application to kill: x"
              >
                Confirm
              </Button>
            </div>
          </div>
        </CmdAccordionDetails>
      </CmdAccordion>

      <CmdAccordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <CmdAccordionSummary  aria-controls="panel4d-content" id="panel4d-header">
          <div>
            Preset Option 4: Restart Application
          </div>
        </CmdAccordionSummary>
        <CmdAccordionDetails>
          <div>
            Please select the application you would like to restart then click 'confirm'.
          <div style={{marginTop: 30, display: 'flex'}}>
            <div style={{flex: 3, alignContent: 'space-between'}}>
              <AvailApps/>
            </div>
            <Button
              name="restartProcess"
              onClick={handleClick}
              variant="contained"
              //onSubmit={handleSubmit}
              value={restartProcess}
              style={{flex: 1, marginLeft: '20px', padding: '0px'}}
              //when it is clicked, it puts the input into a json object, and displays on the right hand side saying "Application to kill: x"
            >
              Confirm
            </Button>
            </div> 
          </div>
        </CmdAccordionDetails>
      </CmdAccordion>
    </form>
  </div>
  );
}