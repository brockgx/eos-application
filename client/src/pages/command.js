import  {useState } from 'react';

import { Tabs, Tab } from '@material-ui/core';
import Command1 from '../components/commands-tabs/Command1';
import Command2 from '../components/commands-tabs/Command2';
import Command3 from '../components/commands-tabs/Command3';
import CmdMachineChoice from '../components/commands-tabs/CmdMachineChoice';
import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
//import '../styles/command.css';

const Container = styled.div`
  flex: 10;
  background-color: #edf0f5;
  padding: 5px;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  padding: 10px;
  align-content: flex-end;
  box-sizing: border-box;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 0px 40px;
  box-sizing: border-box;
`;

const TopText = styled.span`
  font-weight: 500;
  font-size: 44px;
  padding-bottom: 10px;
  flex: 1;
  box-sizing: border-box;
`;

const TabsWrapper = styled.div`
  padding: 0px;
  flex: 80%;
  box-sizing: border-box;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  box-sizing: border-box;

`;


const CommandsTab = styled.div`
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
  width: 95%;
  padding: 30px;
  background-color: #ffff;
  border-radius: 6px;
  height: 75vh;
  font-weight: 300;
  font-size: 24px;
  display: flex;
`;

const RightSideOutput = styled.div`
   flex: 1;
   padding-bottom: 20px;
   padding-left: 20px;
`;

const LeftSide = styled.div`
  padding-right: 20px;
  flex: 1;
`;

 
const Commands = (props) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }
    const [ machineChoice, setMachineChoice] = useState('')
    const [ customCmd, setCustomCmd] = useState('')

    console.log(customCmd)
    console.log(machineChoice)

  return (
  <Container>
    <Wrapper>
      <Top>
        <TopText>Commands </TopText>
      </Top>
      <Bottom>
        <CommandsTab>
          <LeftSide>
            <TabsWrapper>
              <Tabs
                centered
                value={selectedTab} 
                style = {{marginBottom:20, marginLeft:-20, boxSizing: 'border-box'}} 
                onChange={handleChange} 
              >
                <Tab label="Preset Command Options" style ={{textTransform : 'none', fontSize: '20px'}}/>
                <Tab label="Push a File to a Device" style ={{textTransform : 'none', fontSize: '20px'}}/>
                <Tab label="Custom Commands" style ={{textTransform : 'none', fontSize: '20px'}}/>             
              </Tabs>
            </TabsWrapper>
              
            <CmdMachineChoice changeMachine={machineChoice => setMachineChoice(machineChoice)} />        
            {selectedTab === 0 && <Command1 />}
            {selectedTab === 1 && <Command2 />}
            {selectedTab === 2 && <Command3 changeCmd={customCmd => setCustomCmd(customCmd)} />} 
          </LeftSide>

          <RightSideOutput>
            <div style = {{marginLeft: '10px', paddingLeft: '10px', height: '100%', border: '1px solid grey', boxSizing: 'border-box'}} >
              Currently you have: no commands waiting. 
              <h1>{machineChoice}</h1>
              <h2>{customCmd}</h2> 
            </div>
          </RightSideOutput>
        </CommandsTab>                  
      </Bottom>
    </Wrapper>
  </Container>
    )
}

export { Commands }