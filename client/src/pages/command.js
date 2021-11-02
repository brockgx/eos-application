import React from 'react';
import  {useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core';

import Command1List from '../components/commands-tabs/command1list';
import Command2 from '../components/commands-tabs/Command2';
import Command3 from '../components/commands-tabs/Command3';
import CmdMachineChoice from '../components/commands-tabs/CmdMachineChoice';
import AvailApps from '../components/commands-tabs/AvailApps';
import CmdShellOption from '../components/commands-tabs/CmdShellOption';
import CmdHistoryDropdown from '../components/commands-tabs/CmdHistoryDropdown';
import styled from 'styled-components';


/* 
    command.js 29/10/21 notes.
      -> line 345-350~
      The CommandHistoryDisplay component will be the component that you will use to display the past 10 commands 
      from a fetch command(?), this should be added, it does not need to be a table like the query table. 
      Possibly displaying a dropdown that fetches the past 10 commands, 
      or fetching the past 10 commands and displaying the json string directly into the 
      CommandHistoryDisplay component as a proof of concept to show Jordan that that information can be viewed. 
*/


/*
  Styling properties formatted in this general order:
  Flex
  Padding
  Margin
  Background
  Height
  Font
*/
const Container = styled.div`
  flex: 10;
  padding: 3px;
  background-color: #edf0f5;
`;

const Wrapper = styled.div`
`;

const Top = styled.div`
  padding-left: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TopText = styled.span`
  font-size: 44px;
`;

const Bottom = styled.div`
  padding-left: 40px;
  padding-right: 40px;
`;

//padding: top right bottom left
//box-sizing: relates to the method of calculation of width and height of a container.
const CommandsTab = styled.div`
  display: flex;
  padding: 10px 20px 20px 20px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  border-radius: 6px;
  background-color: #ffff;
  height: 85vh;
  box-sizing: border-box;
  font-weight: 300;
  font-size: 24px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  height: 100%;
`;

const TabsWrapper = styled.div`
  margin-bottom: 20px;
`;

const LHCommandOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

`;

const SpaceBox = styled.div`
  flex: 1;
  margin-bottom: 20px;
  margin-top: 10px;
  max-height: 94px;

`;

const ShellOptionBox = styled.div`
  flex: 2;
 

`;

const CommandDetailsDisplay= styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid purple;
  border-radius: 4px;
  min-height: 270px;
  max-height: 340px;
  word-break: break-all;
  
`;

const DetailOutputText = styled.div`
  &:first-letter{
    font-weight: bold;
    font-size: 25px;
    letter-spacing: 5px;
  }
`;

const MacAddText = styled.div`
  padding-left: 50px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
`;

const AppErrorText = styled.div`
  font-weight: 600;
  color: red;
  font-size: 25px;
  border: 1px solid red;
  padding-left: 10px;
  padding-right: 10px;
`;

const ShellOptionTextWrapper = styled.div`
  padding-left: 50px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
`;

const CustomCommandDisplay = styled.div`
`;

const FileOutputText = styled.div`
`;

const RightSideHistory = styled.div`
  flex: 1;
  padding-right: 20px;
  margin-bottom: 20px;
  border: 1px solid grey;
  border-radius: 5px;
  height: 100%;
`;
 
const CommandHistoryDisplay = styled.div`
  padding-top: 5px;
  padding-left: 10px;
  padding-bottom: 20px;
  margin-bottom: 10px;
  margin-right: 10px;
  height: 90%;
`;


const HistoryDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 30px;
  border: 1px solid purple;
  border-radius: 4px;
  word-break: break-all;
  
`;

const CmdHistoryOutput = styled.div`
  &:first-letter{
    font-weight: bold;
    font-size: 25px;
    letter-spacing: 5px;
  }
`;




const Commands = (props) => {
    //for handling what command tab the user is on
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }
    const [customCmd, setCustomCmd] = useState('')
    const [file, setFile] = useState(null)
    const [fileDest, setFileDest] = useState('')
    const [appChoice, setAppChoice] = useState('')
    const [machChoice, setMachChoice] = useState('')
    const [cmdChoice, setCmdChoice] = useState('')
    const [cmdShellOption, setCmdShellOption] = useState('')
    const [cmdHistoryChoice, setCmdHistoryChoice] = useState('')

    console.log(machChoice.name)
    //for reading the file the user inputs, and prepares details object in the format for the API
    let uploadFile = () => {
      if(file !== null) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const final = reader.result.split(",", 2);
          const details = {
            DeviceID: machChoice.mac_address,
            DeviceName: machChoice.name,
            CommandType: selectedTab,
            Parameters: {
              //file: file.name,
              b64file: final[1],
              destination: fileDest,
            }
          }
          //posts the details object to the API as a json string
          fetch('/commands/sendfile', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(details)
          })
          console.log(reader.result);
          return final[1];
        }
        console.log("File uploading");
      } else {
        if(file !== null) { console.log("Error: no file has been uploaded"); }
        else { console.log("Error: no file location has been entered"); }
      }
    }    
    //if the user is sending a command, the detail object will include different parameters
    let sendCommand = () => {
      const details = {
        DeviceID: machChoice.mac_address,
        DeviceName: machChoice.name,
        CommandType: cmdChoice,
        Parameters: {
          app_name: appChoice.app_name,
          app_id: appChoice.pid,
        } 
      }
      
      fetch('/commands/send', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(details)
      })
  }

    //if the user is sending a custom command, the detail object will include different parameters
    let sendCustomCommand = () => {
      const details = {
        DeviceID: machChoice.mac_address,
        DeviceName: machChoice.name,
        CommandType: "Custom_command",
        Parameters: {
          command: customCmd,
          cmd_shell_choice: cmdShellOption,
        } 
      }
      fetch('/commands/send', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(details)
      })
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(machChoice.name);
      console.log(fileDest);
      console.log(file);
      //depending on what tab the user is on, the command executed will differ so that the relevant
      //information is sent to the API and to the specific API route
      switch(selectedTab){
        case 0: 
          //
          sendCommand()
          console.log("This is preset command tab")
          break;
        case 1:
          uploadFile()
          break;
        case 2: 
          //
          sendCustomCommand()
          console.log("This is custom tab")
          break;
        default:
          //
      }
    } 

  return (
  <Container>
    <Wrapper>
      <Top>
        <TopText>Commands</TopText>
      </Top>
      <Bottom>
        <CommandsTab>
          <form style={{maxWidth: '673px'}} onSubmit={handleSubmit}>
            <LeftSide>
              <TabsWrapper>
                <Tabs 
                  centered 
                  value={selectedTab} 
                  onChange={handleChange}
                  indicatorColor="primary" 
                >
                  <Tab label="Preset Command Options" style ={{textTransform : 'none', fontSize: '20px'}}/>
                  <Tab label="Push File to a Device" style ={{textTransform : 'none', fontSize: '20px'}}/>
                  <Tab label="Custom Commands" style ={{textTransform : 'none', fontSize: '20px'}}/>             
                </Tabs>
              </TabsWrapper>
              
              <LHCommandOptionBox>
                <CmdMachineChoice changeMachChoice={machChoice => setMachChoice(machChoice)}/> 
                {selectedTab === 0 && 
                  <Command1List 
                    cmdChoice={cmdChoice => setCmdChoice(cmdChoice)}/>}
                {selectedTab === 1 && 
                  <Command2 
                    changeFile={file => setFile(file)} 
                    changeFileDest={fileDest => setFileDest(fileDest)}/>}
                {selectedTab === 2 && 
                  <Command3 
                  changeCmd={customCmd => setCustomCmd(customCmd)} />} 
             
              </LHCommandOptionBox>
            
              {/* SpaceBox is to make the command details box and the command options tab box 
              stable height while giving space for additional conditionally rendered dropdown menus
              The available apps and the shell option dropdown components only render when the relevant commands are selected,
              as to not confuse the user */}
              <SpaceBox>
                {(selectedTab === 0) && (cmdChoice === "Kill Process" || cmdChoice === "Restart Process") && (machChoice.name !== undefined && machChoice.name !== null && machChoice.name !== "") 
                ? <AvailApps changeAppChoice={appChoice => setAppChoice(appChoice)} machChoice = {machChoice}/>
                // if The machine is not chosen, it will render an error box instead of rendering the app selection bar.
                : (selectedTab === 0) && (cmdChoice === "Kill Process" || cmdChoice === "Restart Process") && (machChoice.name === undefined || machChoice.name || null || machChoice.name === "") 
                  && <AppErrorText>Please select a target machine before attempting to select an application to handle.</AppErrorText>}
                {(selectedTab === 2) && 
                  <ShellOptionBox>
                    <CmdShellOption changeShellOption={cmdShellOption => setCmdShellOption(cmdShellOption)}/>
                  </ShellOptionBox>}
              </SpaceBox>

              <CommandDetailsDisplay> 
                <h3 style = {{paddingTop: '5px'}}>COMMAND DETAILS</h3> 
                <div style={{flex: 4}}>

                  {/*Conditionally renders details depending on whether a machine is selected*/}
                  {(machChoice.name !== "" && machChoice.name !== undefined) 
                  ?
                    <div>
                      <DetailOutputText>{`> Selected Machine: ${machChoice.name}`}</DetailOutputText>
                      <MacAddText>{`(MAC Address: ${machChoice.mac_address})`}</MacAddText>
                    </div>
                  : <DetailOutputText>{'>'} Selected Machine: No Machine Chosen</DetailOutputText>} 

                  {/*Command details displayed when a preset or custom command tab is selected */}
                  <div>
                    {(selectedTab === 2 ) &&
                    <CustomCommandDisplay> 
                      <DetailOutputText>{`> (Custom Command): ${customCmd}`}</DetailOutputText>
                      <ShellOptionTextWrapper>{`(Command Shell Option): ${cmdShellOption}`}</ShellOptionTextWrapper>
                    </CustomCommandDisplay>}
                  </div>
                  <div>
                    {(selectedTab === 0 && cmdChoice !== undefined && cmdChoice !== null && cmdChoice !== '') 
                    ? <DetailOutputText>{`> (Preset Command):  ${cmdChoice}`}</DetailOutputText>
                    : '' }
                  </div>

                  {/*Details of app selected if command selected is Restart/Kill application*/}
                  <div>
                    {(selectedTab === 0) && (cmdChoice === "Kill Process" || cmdChoice === "Restart Process") &&
                     <DetailOutputText> 
                        {'> Selected App: '}{(appChoice.app_name !== "" && appChoice.app_name !== undefined) 
                        ? `${appChoice.app_name} (PID: ${appChoice.pid})` 
                        : "No App Chosen."}
                      </DetailOutputText>
                    }
                  </div> 
                
                  {/*File Details if Command Selected is Push File */}
                  <div>
                    {selectedTab === 1 &&
                    <FileOutputText>
                      <DetailOutputText>
                        {"> File Name: "}{(file === null || file === undefined) 
                        ? ' No file chosen.' 
                        : ` ${file.name}`}
                      </DetailOutputText>
                      <DetailOutputText>
                        {"> File Destination: "}{fileDest === "" 
                        ? ' N/A' 
                        : `${fileDest}`}
                      </DetailOutputText>
                    </FileOutputText>}
                  </div>

                </div>

                <Button
                  style={{marginTop: "20px", flex: 1, marginBottom: "10px"}}
                  fullWidth    
                  variant="contained"
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  {"Confirm & Send"}
                </Button>
              </CommandDetailsDisplay>
            </LeftSide>
          </form>
          
          <RightSideHistory>
            {/* The CommandHistoryDisplay will be the component that you will use to display the past 10 commands from a fetch command(?)*/}
            <CommandHistoryDisplay>
              <h3 style = {{paddingTop: '5px'}}>COMMAND HISTORY</h3> 
              <HistoryDetailsContainer>
                <CmdHistoryDropdown changeCmdHistoryChoice={cmdHistoryChoice => setCmdHistoryChoice(cmdHistoryChoice)}/>
                <CmdHistoryOutput style={{paddingTop: "50px"}}>
                  {'> Command ID: '}{(cmdHistoryChoice !== "" && cmdHistoryChoice !== undefined) 
                  ? `${cmdHistoryChoice.id}`
                  : "No Command Selected"}
                </CmdHistoryOutput>
                <CmdHistoryOutput>
                  {'> Timestamp: '}{(cmdHistoryChoice !== "" && cmdHistoryChoice !== undefined) 
                  ? `${cmdHistoryChoice.timestamp}`
                  : "N/A"}
                </CmdHistoryOutput>
                <CmdHistoryOutput>
                  {'> Machine ID: '}{(cmdHistoryChoice !== "" && cmdHistoryChoice !== undefined) 
                  ? `${cmdHistoryChoice.machine_id}`
                  : "N/A"}
                </CmdHistoryOutput>
                <CmdHistoryOutput>
                  {'> Command type: '}{(cmdHistoryChoice !== "" && cmdHistoryChoice !== undefined) 
                  ? `${cmdHistoryChoice.command_type}`
                  : "N/A"}
                </CmdHistoryOutput>
                <CmdHistoryOutput>
                  {'> Command Output: '}{(cmdHistoryChoice !== "" && cmdHistoryChoice !== undefined) 
                  ? `${cmdHistoryChoice.output}`
                  : "N/A"}
                </CmdHistoryOutput>
                <CmdHistoryOutput>
                  {'> Command Parameters: '}
                  {(cmdHistoryChoice.command_type === "Custom Command") && `${cmdHistoryChoice.parameters.content}`}
                  
                </CmdHistoryOutput>

                {(cmdHistoryChoice.command_type === "PushFile") &&
                <div style={{paddingLeft: "50px"}}>
                  <CmdHistoryOutput>{`> File Name: ${cmdHistoryChoice.parameters.file_name}`}</CmdHistoryOutput>
                  <CmdHistoryOutput>{`> File Destination: ${cmdHistoryChoice.parameters.file_dest}`}</CmdHistoryOutput>
                </div>}
                
                {(cmdHistoryChoice.command_type === "KillProcess" || cmdHistoryChoice.command_type === "RestartApp") &&
                
                  (cmdHistoryChoice.parameters.app_name !== null && cmdHistoryChoice.parameters.app_name !== undefined) &&
                  <div style={{paddingLeft: "50px"}}>
                  <CmdHistoryOutput>{`> App Name: ${cmdHistoryChoice.parameters.app_name}`}</CmdHistoryOutput>
                  <CmdHistoryOutput>{`> App ID: ${cmdHistoryChoice.parameters.app_pid}`}</CmdHistoryOutput>
                  </div>}
                  
              </HistoryDetailsContainer>
            </CommandHistoryDisplay> 
          </RightSideHistory>

        </CommandsTab>                  
      </Bottom>
    </Wrapper>
  </Container>
  )
}

export { Commands }