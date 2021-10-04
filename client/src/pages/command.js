import  {useState } from 'react';

import { Tabs, Tab } from '@material-ui/core';
import Command1 from '../components/commands-tabs/Command1';
import Command2 from '../components/commands-tabs/Command2';
import Command3 from '../components/commands-tabs/Command3';
import CmdMachineChoice from '../components/commands-tabs/CmdMachineChoice';

import React from 'react';
import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import { createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//import '../styles/command.css';

const Container = styled.div`
  flex: 10;
  background-color: #edf0f5;
  padding: 5px;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 10px;
  align-content: flex-end;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 0px 40px;
`;

const TopText = styled.span`
  font-weight: 500;
  font-size: 44px;
  padding-bottom: 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;

`;
const CommandsTab = styled.div`
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  height: 85%;
  width: 95%;
  padding: 30px;
  background-color: #ffff;
  border-radius: 6px;
  height: 85vh;
  font-weight: 300;
  font-size: 24px;
`;
const useStyles = createStyles((theme) => ({
  root: {
    height: '100vh',
  },
}));

const Commands = (props) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    }

    return (
  <Container>
    <Grid container 
    spacing={2} 
    className={classes.AvailMachines} 
    direction="column" 
    style = {{marginBottom:20}}>
      <Grid item xs={12}>
        <Wrapper>
          <Top>
            <TopText>Commands</TopText>
          </Top>
          <Grid item xs={12}>
            <Bottom>
              <Grid container>
                <Grid item xs={12}>
                  <CommandsTab>                              
                    <Grid container>
                      <Grid item xs={7} spacing={2}>
                      
                      <Grid container>
                        <Grid item xs>
                          <Tabs 
                          centered 
                          className={classes.tabOption} 
                          value={selectedTab} 
                          style = {{marginBottom:40, marginLeft:-20}} 
                          onChange={handleChange} >
                          <Tab label="Command Option 1" />
                          <Tab label="Command Option 2" />
                          <Tab label="Command Option 3" />
                          </Tabs>
                        </Grid>
                        <Grid item xs={11}>
                          {selectedTab === 0 && <Command1 />}
                          {selectedTab === 1 && <Command2 />}
                          {selectedTab === 2 && <Command3 />} 
                        </Grid>
                      </Grid>
                      </Grid>
                      <Grid item xs = {5}>
                      <CmdMachineChoice />
                        <Paper variant="outlined" style = {{height: '70vh'}}>
                        Currently you have: no commands waiting. 
                        </Paper>
                      </Grid>
                    </Grid>
                  </CommandsTab>
                </Grid> 
              </Grid>                   
            </Bottom>
          </Grid>
        </Wrapper>
      </Grid>
    </Grid>
  </Container>
    )
}

export { Commands }