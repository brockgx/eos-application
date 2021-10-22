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
import { AppsContext } from '../components/commands-tabs/appContext';

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
  padding-left: 20px;
  padding-top: 20px;
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
   padding-left: 5px;
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
    const [ file, setFile] = useState(null)
    const [fileDest, setFileDest] = useState('')
    const [appChoice, setAppChoice] = useState('')
    const [context, setContext] = useState('')
    const [cmdChoice, setCmdChoice] = useState('')
    //console.log(customCmd)
    //console.log(machineChoice)
    //console.log(file)

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
           
            <AppsContext.Provider value={[context, setContext]}>
            {selectedTab === 0 && 
              <Command1 
                machineChoice={machineChoice}
               cmdChoice={cmdChoice => setCmdChoice(cmdChoice)}
              />}
            {selectedTab === 1 && 
              <Command2 
                changeFile={file => setFile(file)} 
                changeFileDest={fileDest => setFileDest(fileDest)}
              />}
            {selectedTab === 2 && 
              <Command3 
                changeCmd={customCmd => setCustomCmd(customCmd)} />} 
            </AppsContext.Provider>
           
          </LeftSide>


          <RightSideOutput>
            <div style = {{marginLeft: '10px', paddingLeft: '10px', height: '100%', borderLeft: '1px solid grey', boxSizing: 'border-box'}} >
              <h3 style = {{paddingTop: '5px', paddingBottom: '20px'}}>Currently you have: no commands waiting.</h3> 
              <h4>{'>'} {machineChoice === "" ? 'MACHINE: No selected machine' : `SELECTED: ${machineChoice}`}</h4>
              <h4>{'>'} COMMAND: {customCmd === "" ? `PRESET COMMAND: ${cmdChoice}` :  `CUSTOM COMMAND: ${customCmd}`}</h4> 
              <h4>{'>'} {file === null ? 'FILE NAME: No file chosen.' : `FILE NAME: ${file.name}`}</h4>
              <h4>{'>'}{fileDest === ""? ' FILE DESTINATION: N/A' : ` FILE DESTINATION: ${fileDest}`}</h4>
              <h4>{context.appID}</h4>
            </div>
          </RightSideOutput>
        </CommandsTab>                  
      </Bottom>
    </Wrapper>
  </Container>
    )
}

export { Commands }