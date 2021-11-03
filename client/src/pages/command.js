/*
 * Name: command.js
 * Purpose: Renders various components that make up the 'Command Page' 
 * 
 * Usage: App.js to render the Command page
 */

// Module imports here
import React from 'react';
import  { useState } from 'react';
import { Button } from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core';

// Component imports here
import Command1List from '../components/commands-tabs/command1list';
import Command2 from '../components/commands-tabs/Command2';
import Command3 from '../components/commands-tabs/Command3';
import CmdMachineChoice from '../components/commands-tabs/CmdMachineChoice';
import AvailApps from '../components/commands-tabs/AvailApps';
import CmdShellOption from '../components/commands-tabs/CmdShellOption';
import CmdHistoryDropdown from '../components/commands-tabs/CmdHistoryDropdown';

import styled from 'styled-components';

/*
  Styling properties formatted in this general order:
  Flex
  Padding
  Margin
  Height/Width
  Border
  Background
  Font
  Word break/wrap/letterspacing
*/

// Styled component declarations
const Container = styled.div`
  flex: 10;
  padding: 3px;
  background-color: #edf0f5;
`;

const Top = styled.div`
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TopText = styled.span`
  font-size: 44px;
`;

const Bottom = styled.div`
  padding-left: 20px;
  padding-right: 30px;
`;

const CommandsTab = styled.div`
  display: flex;
  padding: 10px 20px 20px 10px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
  border-radius: 6px;
  background-color: #ffff;
  height: 95vh;
  width: 100%;
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
`;

const LHCommandOptionBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 20px;
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
  flex: 7;
  padding-left: 10px;
  padding-right: 10px;
  min-height: 270px;
  max-height: 340px;
  border: 1px solid grey;
  border-radius: 4px;
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
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 20px;
  margin-top: 20px;
  max-width: 500px;
  border: 1px solid red;
  font-weight: 600;
  font-size: 25px;
  color: red;
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

const DetailHeading = styled.text`
  font-size: 25px;
  font-weight: 600;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 20px;
  height: 100%;
  max-width: 850px;
  border: 1px solid grey;
  border-radius: 5px;
`;
 
const CommandHistoryDisplay = styled.div`
  padding-top: 5px;
  padding-left: 10px;
  padding-bottom: 20px;
  margin-bottom: 10px;

`;

const HistoryDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 10px;
  margin-top: 10px;
  white-space: pre;
  word-break: normal;
`;

const CmdHistoryOutputLine = styled.div`
  &:first-letter{
    font-weight: bold;
    font-size: 25px;
    letter-spacing: 5px;
  }
`;
const PastCommandDetailsLeftColumn = styled.div`
  flex: 1;
`;
const PastCommandDetailsRightColumn = styled.div`
  flex: 2;
  margin-left: 10px;
`;

const ScrollableCmdHistoryOutput = styled.div`
  padding-left: 10px;
  margin-top: 10px;
  height: 300px;
  border: 2px solid grey;
  border-radius: 4px;
  background-color: #ffff;
  font-size: 18px;
  overflow-y: scroll;
  resize: auto;
`;

const CurrentCommandOutput = styled.div`
  padding-left: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  height: 350px;
  border: 1px solid grey;
  border-radius: 6px;
  background-color: #ffff;
  overflow-y: scroll;
  white-space: pre;
  word-break: normal;
  font-size: 19px;
  resize: auto;
`;

/*
 * This is the main implementation for the "Command" page
 */

const Commands = (props) => {
    //for handling what command tab the user is on
    const [selectedTab, setSelectedTab] = useState(0);

    //handling change of what command tab the user is on
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
    const [cmdOutput, setCmdOutput] = useState('waiting...')

    //for reading the file the user inputs, and prepares details object in the format for the API
    let uploadFile = () => {
      if(file !== null) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const final = reader.result.split(",", 2);
          const details = {
            machine_id: machChoice.id,
            machine_name: machChoice.name,
            type: "fileupload",
            parameters: {
              b64file: final[1],
              destination: fileDest,
            }
          }
        //posts the details object to the API as a json string
        fetch('/commands/send', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(details)
        })
        .then(resp => resp.json())
        .then(data => setCmdOutput(data.content))
        return final[1];
        }
      } else {
        if(file !== null) { console.log("Error: no file has been uploaded"); }
        else { console.log("Error: no file location has been entered"); }
      }
    }    
    //if the user is sending a command, the detail object will include different parameters
    let sendCommand = () => {
      const details = {
        machine_id: machChoice.id,
        machine_name: machChoice.name,
        type: cmdChoice,
        parameters: {
          app_name: appChoice.app_name,
          app_id: appChoice.pid,
        } 
      }
      
      fetch('/commands/send', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(details)
      })
      .then(resp => resp.json())
      .then(data => setCmdOutput(data.content))
   }

    //if the user is sending a custom command, the detail object will include different parameters
    let sendCustomCommand = () => {
      const details = {
        machine_id: machChoice.id,
        machine_name: machChoice.name,
        type: "custom_command",
        parameters: {
          custom_command: customCmd,
          shell: cmdShellOption,
        } 
      }
      fetch('/commands/send', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(details)
      })
      .then(resp => resp.json())
      .then(data => setCmdOutput(data.content))
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      /* depending on what tab the user is on, the command executed will differ so that the relevant
      information is sent to the API and to the specific API route 
      */
      switch(selectedTab){
        case 0: 
          sendCommand()
          break;
        case 1:
          uploadFile()
          break;
        case 2: 
          sendCustomCommand()
          break;
        default:
      }
    } 

  return (
  <Container>
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
                <Tab label="Preset Command Options" style ={{textTransform: 'none', fontSize: '20px', fontWeight: '600'}}/>
                <Tab label="Push File to a Device" style ={{textTransform : 'none', fontSize: '20px', fontWeight: '600'}}/>
                <Tab label="Custom Command" style ={{textTransform : 'none', fontSize: '20px', fontWeight: '600'}}/>             
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
                  changeCmd={customCmd => setCustomCmd(customCmd)}/>}
            </LHCommandOptionBox>
          
            {/* SpaceBox is to make the command details box and the command options tab box 
            a consistent height while giving space for additional conditionally rendered dropdown menus
            The available apps and the shell option dropdown components only render when the relevant commands are selected,
            as to not confuse the user */}
            <SpaceBox>
              {(selectedTab === 0) && (cmdChoice === "appshutdown" || cmdChoice === "restartapp") && (machChoice.name !== undefined && machChoice.name !== null && machChoice.name !== "") 
              ? <AvailApps changeAppChoice={appChoice => setAppChoice(appChoice)} machChoice = {machChoice}/>
              // if The machine is not chosen, it will render an error box instead of rendering the app selection bar.
              : (selectedTab === 0) && (cmdChoice === "appshutdown" || cmdChoice === "restartapp") && (machChoice.name === undefined || machChoice.name || null || machChoice.name === "") 
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
                ? <div>
                    <DetailOutputText>
                      <DetailHeading>
                        {`> Selected Machine: `}
                      </DetailHeading>
                      {`${machChoice.name}`}
                    </DetailOutputText>
                    <MacAddText>{`(MAC Address: ${machChoice.mac_address})`}</MacAddText>
                  </div>
                : <DetailOutputText><DetailHeading>{'> '}Selected Machine: </DetailHeading> No Machine Chosen</DetailOutputText>} 

                {/*Command details displayed when a preset or custom command tab is selected */}
                <div>
                  {(selectedTab === 2 ) &&
                  <CustomCommandDisplay> 
                    <DetailOutputText>
                      <DetailHeading>{`> (Custom Command): `}</DetailHeading>
                      {`${customCmd}`}
                    </DetailOutputText>
                    <ShellOptionTextWrapper>{`(Command Shell Option): ${cmdShellOption}`}</ShellOptionTextWrapper>
                  </CustomCommandDisplay>}
                </div>
                <div>
                  {(selectedTab === 0 && cmdChoice !== undefined && cmdChoice !== null && cmdChoice !== '') 
                  ? <DetailOutputText>
                      <DetailHeading>{`> (Preset Command): `}</DetailHeading>
                      {`${cmdChoice}`}
                    </DetailOutputText>
                  : '' }
                </div>

                {/*Details of app selected if command selected is Restart/Kill application*/}
                <div>
                  {(selectedTab === 0) && (cmdChoice === "appshutdown" || cmdChoice === "restartapp") &&
                    <DetailOutputText> 
                      <DetailHeading>{'> Selected App: '}</DetailHeading>
                      {(appChoice.app_name !== "" && appChoice.app_name !== undefined) 
                      ? `${appChoice.app_name} (PID: ${appChoice.pid})` 
                      : "No App Chosen."}
                    </DetailOutputText>}
                </div> 
              
                {/*File Details if Command Selected is Push File */}
                <div>
                  {selectedTab === 1 &&
                  <FileOutputText>
                    <DetailOutputText>
                    <DetailHeading>
                      {"> File Name: "}
                    </DetailHeading>{(file === null || file === undefined) 
                      ? ' No file chosen.' 
                      : ` ${file.name}`}
                    </DetailOutputText>
                    <DetailOutputText>
                      <DetailHeading>{"> File Destination: "}</DetailHeading>{fileDest === "" 
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
        
        <RightSide>
          {/* The CommandHistoryDisplay will be the component that you will use to display the past 25 commands*/}
          <CommandHistoryDisplay>
            <h3 style = {{paddingTop: '5px'}}>COMMAND HISTORY</h3> 
            <CmdHistoryDropdown changeCmdHistoryChoice={cmdHistoryChoice => setCmdHistoryChoice(cmdHistoryChoice)}/>
            <HistoryDetailsContainer>
              <PastCommandDetailsLeftColumn>
                {/* Past command choice chosen in dropdown is then displayed showing: 
                  Machine name, Timestamp, Command Type, the Specific command if custom command, and the response/output from the command 
                */}
                <CmdHistoryOutputLine style={{paddingTop: "5px"}}>
                  <DetailHeading>{'> Machine: '}</DetailHeading>
                  {(cmdHistoryChoice !== "" && cmdHistoryChoice !== undefined) 
                  ? `${cmdHistoryChoice.machine_name}`
                  : "N/A"}
                </CmdHistoryOutputLine>
              
                <CmdHistoryOutputLine>
                  <DetailHeading>{'> Timestamp: '}</DetailHeading>
                  {(cmdHistoryChoice !== "" && cmdHistoryChoice !== undefined) 
                  ? `${cmdHistoryChoice.timestamp}`
                  : "N/A"}
                </CmdHistoryOutputLine>
              
                <CmdHistoryOutputLine>
                  <DetailHeading>{'> Type: '}</DetailHeading>
                  {(cmdHistoryChoice !== "" && cmdHistoryChoice !== undefined) 
                  ? `${cmdHistoryChoice.command_type}`
                  : "N/A"}
                </CmdHistoryOutputLine>
              
                <CmdHistoryOutputLine>
                  <DetailHeading>{'> Command: '}</DetailHeading>
                  {(cmdHistoryChoice.command_type === "custom_command" && cmdHistoryChoice !== undefined && cmdHistoryChoice !== "") 
                  ? `${cmdHistoryChoice.command_input}`
                  : "N/A"}
                </CmdHistoryOutputLine>
                <CmdHistoryOutputLine>
                  <DetailHeading>{'> Command Output: '}</DetailHeading> 
                </CmdHistoryOutputLine>
              </PastCommandDetailsLeftColumn>
              
              {/* Second column shows the output saved to the database for the past command chosen */}
              <PastCommandDetailsRightColumn>
                {(cmdHistoryChoice !== "" && cmdHistoryChoice !== undefined) 
                ? `Command #${cmdHistoryChoice.id} Output` 
                : ''}
                <ScrollableCmdHistoryOutput>
                  {(cmdHistoryChoice !== "" && cmdHistoryChoice !== undefined) 
                  ? `${cmdHistoryChoice.output}`
                  : "N/A"}
                </ScrollableCmdHistoryOutput>
              </PastCommandDetailsRightColumn>
            </HistoryDetailsContainer>
          </CommandHistoryDisplay> 

          {/* Current Command Output Display, displays "waiting..." until a command is sent and then it displays the response received */}
          <h3 style={{paddingLeft: "10px"}}>Current Command Output...</h3>
          <CurrentCommandOutput>
            {cmdOutput}
          </CurrentCommandOutput>
        </RightSide>
      </CommandsTab>                
    </Bottom>
  </Container>
  )
}

export { Commands }