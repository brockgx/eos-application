import * as React from 'react';

import ArrowForwardIosSharp from '@material-ui/icons/ArrowForwardIosSharp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AvailApps from './AvailApps';
import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import  {useState } from 'react';
import Command from '../../pages/command';



const CmdAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,

}));

const CmdAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIosSharp style={{ fontSize: '1.1rem' }} />}
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



export default function Command1(props) {
  const [expanded, setExpanded] = React.useState('');
  const [appChoice, setAppChoice] = useState('');
  const [cmdChoice, setCmdChoice] = useState('');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
   
  const handleClick = (event) => {
    const name = event.target.value
    event.preventDefault();
    props.changeCommandChoice(event.target.value)
    setCmdChoice(event.target.value)
    alert(`A command was submitted: ${name} and the application of ${appChoice}` );
  };

  const handleOptions = (event) => {
    event.preventDefault();
   
   setCmdChoice(event.target.name)
  }
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const value =  event.currentTarget.value;
    props.cmdChoice(event.currentTarget.value);
   // alert('A command was submitted: ' + `${value}`);
  }

  return (
  <div style={{paddingTop: "30px"}}>
    <form onSubmit={handleSubmit}>
      <CmdAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <CmdAccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{fontSize: '20px'}}>
          <div>
            Preset Option 1: Shutdown Device
          </div>
        </CmdAccordionSummary>
        <CmdAccordionDetails style={{flexDirection: "column", fontSize: '20px'}}>
          <div 
            className = "InputWButtonContain" 
            style={{display: 'flex'}}>
            <div style={{flex: 3}}>
              <div>
                Click confirm to shutdown the selected device.
              </div>
            </div>
            <Button
              variant="contained"
              type="submit"
              name="shutDevice"
              value="shutdownDevice"
             // onClick={handleClick}
             //onClick={handleClick}
             onClick={handleSubmit}
              style={{flex: 1, padding: '0px', height: "55px"}}
              //when it is clicked, it puts the input into a json object, and displays on the right hand side saying "Application to kill: x"
            >
              Confirm
            </Button>
          </div>
        </CmdAccordionDetails>
      </CmdAccordion>

      <CmdAccordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <CmdAccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <div style={{fontSize: '20px'}}>
            Preset Option 2: Restart Device
          </div>
        </CmdAccordionSummary>
        <CmdAccordionDetails style={{flexDirection: "column", fontSize: '20px'}}>
            <div 
              className = "InputWButtonContain" 
              style={{display: 'flex'}}>
              <div style={{flexDirection:"column", flex: 3, fontSize: '20px'}}>
                <div>
                  Click confirm to restart the selected device.
                </div>
              </div>
              <Button
                variant="contained"
                name="restartDevice"
                //onClick={handleClick}
                onClick={handleSubmit}
                //onClick={handleClick}
                value="RestartDevice"
                style={{flex: 1, padding: '0px', height: "55px"}}
                //when it is clicked, it puts the input into a json object, and displays on the right hand side saying "Application to kill: x"
              >
                Confirm
              </Button>
            </div>
          
        </CmdAccordionDetails>
      </CmdAccordion>

      <CmdAccordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <CmdAccordionSummary  aria-controls="panel3d-content" id="panel3d-header">
          <div style={{fontSize: '20px'}}>
            Preset Option 3: Kill Process
          </div>
        </CmdAccordionSummary>
        <CmdAccordionDetails style={{flexDirection:"column", fontSize: '20px'}}>
          <div>
            Please select the application you would like to kill then click 'confirm'.
            <div 
              className = "InputWButtonContain" 
              style={{marginTop: 30, display: 'flex', fontSize: '20px'}}>
              <div 
                className = "AvailAppsContain" 
                style={{flex: 3, alignContent: 'space-between', paddingRight: '20px'}}>
                <AvailApps changeApp={appChoice => setAppChoice(appChoice)} />
                
              </div>
              <h4>{appChoice}</h4>
              <Button
                variant="contained"
                name="killProcess"
                //onClick={handleClick}
                value="kill Process"
                onClick={handleSubmit}
                style={{flex: 1, padding: '0px'}}
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
          <div style={{fontSize: '20px'}}>
            Preset Option 4: Restart Application
          </div>
        </CmdAccordionSummary>
        <CmdAccordionDetails style={{flexDirection:"column", fontSize: '20px'}}>
          <div>
            Please select the application you would like to restart then click 'confirm'.
          <div style={{marginTop: 30, display: 'flex'}}>
            <div style={{flex: 3, alignContent: 'space-between', paddingRight: '20px'}}>
              <AvailApps changeApp={appChoice => setAppChoice(appChoice)}/>
            </div>
            <h4>{appChoice}</h4>
            <Button
              name="restartProcess"
             // onClick={handleClick}
              //onClick={handleClick}
              onClick={handleSubmit}
              value="RestartProcess"
              variant="contained"
              style={{flex: 1, padding: '0px'}}
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