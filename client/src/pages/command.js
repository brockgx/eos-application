import  {useState } from 'react';
import { Button } from '@material-ui/core';
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
import { TextField } from '@material-ui/core';
import Command1List from '../components/commands-tabs/command1list';

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
  box-sizing: border-box;
`;

const Bottom = styled.div`
  justify-content: space-between;
  padding: 0px 40px;
  box-sizing: border-box;

`;


const CommandsTab = styled.div`
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
  width: 95%;
  padding: 20px;
  background-color: #ffff;
  border-radius: 6px;
  height: 85vh;
  font-weight: 300;
  font-size: 24px;
  display: flex;
  flex-direction: row;
`;

const RightSide = styled.div`
   display: flex;
   flex: 1;
   margin-bottom: 20px;
   padding-left: 5px;
   box-sizing: border-box;
   margin-left: 0px;
   padding-left: 20px;
  
`;

const LeftSide = styled.div`
  display: flex;
  margin-right: 20px;
  height: 100%;
  flex: 1;
  flex-direction: column;
  gap: 20px;

`;

const OptionsArea = styled.div`
  margin-right: 20px;
  flex: 1;
  border: 1px solid yellow;
`;

const LHCommandOptionBox = styled.div`
  flex: 1;
`;

const CommandDetailsDisplay= styled.div`
  border: 1px solid purple;
  padding-left: 10px;
`;

const RightSideHistory = styled.div`
    height: 100%;
    margin-bottom: 20px;
    width: 90%;
    padding-right: 20px;
    border: 1px solid grey;
    flex: 1;
    
`;
 
const SpaceBox = styled.div`
    flex: 3;
`;

const defaultValues = {
  //whatever details the API/backend needs
  name: "",
  os: "",
  address: "",
  status: "0",
};


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
    const [filePush, setFilePush] = useState('')
    //console.log(customCmd)
    //console.log(machineChoice)
    //console.log(file)
    const [CommandDetails, setCommandDetails] = useState(defaultValues);
    const handleSubmit = (event) => {
      event.preventDefault();
      alert('A file was submitted: ' )
    }
  return (
  <Container>
    <Wrapper>
      <Top>
        <TopText>Commands </TopText>
      </Top>
      <Bottom>
        <CommandsTab>
          <div >
          <LeftSide>
          <TabsWrapper>
              <Tabs
                centered
                value={selectedTab} 
                style = {{marginLeft:-20, boxSizing: 'border-box'}} 
                onChange={handleChange} 
              >
                <Tab label="Preset Command Options" style ={{textTransform : 'none', fontSize: '20px'}}/>
                <Tab label="Push a File to a Device" style ={{textTransform : 'none', fontSize: '20px'}}/>
                <Tab label="Custom Commands" style ={{textTransform : 'none', fontSize: '20px'}}/>             
              </Tabs>
            </TabsWrapper>

            <LHCommandOptionBox>
        
            <AppsContext.Provider value={[context, setContext]}>
            <CmdMachineChoice changeMachine={machineChoice => setMachineChoice(machineChoice)} /> 
            {selectedTab === 0 && 
            <div>
              {/*<Command1 
                machineChoice={machineChoice}
               cmdChoice={cmdChoice => setCmdChoice(cmdChoice)}
              />
              */}
              <Command1List
              cmdChoice={cmdChoice => setCmdChoice(cmdChoice)}
              />
            </div>
              }
            {selectedTab === 1 && 
              <Command2 
                filePush={filePush => setFilePush(filePush)}
                changeFile={file => setFile(file)} 
                changeFileDest={fileDest => setFileDest(fileDest)}
              />}
            {selectedTab === 2 && 
              <Command3 
                changeCmd={customCmd => setCustomCmd(customCmd)} />} 
            </AppsContext.Provider>
           
            
          </LHCommandOptionBox>
          <SpaceBox style={{border: "1px solid grey"}}>
          SpaceBox
          </SpaceBox>
          <CommandDetailsDisplay style={{ flexGrow: 2}}>
              <h3 style = {{paddingTop: '5px'}}>COMMAND DETAILS</h3> 
             
              <h4>{'FILE NAME:'}{(file === null || file === undefined) ? ' No file chosen.' : ` ${file.name}`}</h4>
              <h4>{ 'FILE DESTINATION:'} {fileDest === ""? ' N/A' : ` FILE DESTINATION: ${fileDest}`}</h4>
              <h4>{filePush === "" ? '' : `${filePush}`}</h4>
              {(context.appID !== "" && context.appID !== undefined) &&
              <h4>{`Selected app: ${context.appID}`}</h4>
             }
             {(context.machineID !== "" && context.machineID !== undefined) &&
              <h4>{`SELECTED MACHINE: ${context.machineID}`}</h4>
              }
              <h4> COMMAND: {customCmd === "" ? `PRESET COMMAND: ${cmdChoice}` :  `CUSTOM COMMAND: ${customCmd}`}</h4> 
              <h5></h5>
              <Button
              style={{marginTop: "50px"}}
              fullWidth    
              variant="contained"
              onClick={handleSubmit}
              >
                {"Confirm & Send"}
                
              </Button>
          </CommandDetailsDisplay>
          </LeftSide>
          
          {
          /*<RightSide>
           </RightSide>*/
          }
         
          </div>
            <RightSideHistory>
            <h3 style = {{paddingTop: '5px', paddingBottom: '20px', marginBottom: "10px", marginRight: "10px"}}>COMMAND HISTORY</h3> 
            </RightSideHistory>
        </CommandsTab>                  
      </Bottom>
    </Wrapper>
  </Container>
    )
}

export { Commands }