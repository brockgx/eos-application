import React from 'react';
import  {useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core';

import Command1List from '../components/commands-tabs/command1list';
import Command2 from '../components/commands-tabs/Command2';
import Command3 from '../components/commands-tabs/Command3';
import CmdMachineChoice from '../components/commands-tabs/CmdMachineChoice';
import AvailApps from '../components/commands-tabs/AvailApps';
import { MachineContext } from '../components/commands-tabs/machineContext';

import styled from 'styled-components';


/* 
    command.js 29/10/21 notes.
      -> line 190-200~
      in sendCustomCommand, os_choice is hardcoded as an example here, but a simple select box or buttons in a box should be added 
      in the SpaceBox component to conditionally render when on custom command tab

      -> line 300-315~
      under "App Selected if Command selected is Restart/Kill application" appchoice.appID might not 
      be the correct thing to call anymore, due to the change from hardcoded to calling 
      for the apps from the API. So this needs to be checked to ensure it is the correct name, 
      or change if it is outdated.
      
      -> line 345-350~
      The CommandHistoryDisplay component will be the component that you will use to display the past 10 commands 
      from a fetch command(?), this should be added, it does not need to be a table like the query table. 
      Possibly displaying a dropdown that fetches the past 10 commands, 
      or fetching the past 10 commands and displaying the json string directly into the 
      CommandHistoryDisplay component as a proof of concept to show Jordan that that information can be viewed. 
*/


const Container = styled.div`
  flex: 10;
  background-color: #edf0f5;
  padding: 2px;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  align-content: flex-end;
  box-sizing: border-box;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0px 0px 40px;
  box-sizing: border-box;
`;

const TopText = styled.span`
  font-weight: 500;
  font-size: 44px;
  padding-bottom: 0px;
  flex: 1;
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
  padding: 10px 20px 20px 20px;
  background-color: #ffff;
  border-radius: 6px;
  height: 85vh;
  font-weight: 300;
  font-size: 24px;
  display: flex;
  flex-direction: row;
`;

const LeftSide = styled.div`
  display: flex;
  margin-right: 20px;
  height: 100%;
  flex: 1;
  flex-direction: column;
  gap: 20px;
`;

const TabsWrapper = styled.div`
  padding: 0px;
  box-sizing: border-box;
`;

const LHCommandOptionBox = styled.div`
  flex: 3;
  height: 50%;
`;

const SpaceBox = styled.div`
    flex: 1;
    flex-shrink: 3;
`;

const CommandDetailsDisplay= styled.div`
  border: 1px solid purple;
  padding-left: 10px;
  flex-grow: 5;
  min-height: 330px;
  max-height: 340px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  word-break: break-all;
`;

const RightSideHistory = styled.div`
    height: 100%;
    margin-bottom: 20px;
    width: 90%;
    padding-right: 20px;
    border: 1px solid grey;
    flex: 1;
`;
 
const CommandHistoryDisplay = styled.div`
    padding-top: 5px;
    padding-left: 10px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    margin-right: 10px;
    height: 90%;
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
    const [machContext, setMachContext] = useState('')
    const [cmdChoice, setCmdChoice] = useState('')

    //for reading the file the user inputs, and prepares details object in the format for the API
    let uploadFile = () => {
      if(file !== null) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const final = reader.result.split(",", 2);
          const details = {
            DeviceID: machContext.name,
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
        DeviceID: machContext.name,
        CommandType: cmdChoice,
        Parameters: {
          app_name: appChoice,
        //app_id: 
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
        DeviceID: machContext.name,
        CommandType: customCmd,
        Parameters: {
          command: "",
          //os_choice is hardcoded, a simple select box or buttons in a box should be added 
          //in the SpaceBox component to conditionally render when on custom command tab
          os_choice: "Windows",
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
      console.log(machContext.machineID);
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
                <Tabs centered value={selectedTab} onChange={handleChange}>
                  <Tab label="Preset Command Options"
                    style ={{textTransform : 'none', fontSize: '20px'}}/>
                  <Tab label="Push File to a Device" 
                    style ={{textTransform : 'none', fontSize: '20px'}}/>
                  <Tab label="Custom Commands" 
                    style ={{textTransform : 'none', fontSize: '20px'}}/>             
                </Tabs>
              </TabsWrapper>
              
              <LHCommandOptionBox>
                <MachineContext.Provider value={[machContext, setMachContext]}>
                  <CmdMachineChoice /> 
                  {selectedTab === 0 && 
                  <div>
                    <Command1List cmdChoice={cmdChoice => setCmdChoice(cmdChoice)}/>
                  </div>}
                  {selectedTab === 1 && 
                    <Command2 
                      changeFile={file => setFile(file)} 
                      changeFileDest={fileDest => setFileDest(fileDest)}
                    />}
                  {selectedTab === 2 && 
                    <Command3 changeCmd={customCmd => setCustomCmd(customCmd)} />} 
                </MachineContext.Provider>
              </LHCommandOptionBox>
            
              {/* SpaceBox is to make the command details box and the command options tab box  */}
              <SpaceBox style={{maxHeight: selectedTab === 0 || 2 ? "56px": "17px"}}>
                {(selectedTab === 0) && (cmdChoice === "Kill Process" || cmdChoice === "Restart Process") &&
                <div className = "AvailAppsContain" style={{flex: 2}}> 
                  <AvailApps machine={machContext}/>
                </div>}
              </SpaceBox>

              <CommandDetailsDisplay> 
                <h3 style = {{paddingTop: '5px'}}>COMMAND DETAILS</h3> 
                <div style={{flex: 4}}>

                  {/*Machine Selected*/}
                  <div>
                    {"> Selected Machine: "} 
                    {(machContext.name !== "" && machContext.name !== undefined) ? ` ${machContext.name}`: "No Machine Chosen"}  
                  </div>

                  {/*Command Selected */}
                  <div>
                  {(selectedTab === 2 ) && `> (Custom Command): ${customCmd}`}
                  </div>
                  <div>
                    {(selectedTab === 0 && cmdChoice !== undefined && cmdChoice !== null && cmdChoice !== '') ?
                      `> (Preset Command): ${cmdChoice}` : '' }
                  </div>

                  {/*App Selected if Command selected is Restart/Kill application*/}
                  <div>
                    {(selectedTab === 0) && (cmdChoice === "Kill Process" || cmdChoice === "Restart Process") &&
                      <div>  
                        {'> Selected App: '}
                        {(appChoice.appID !== "" && appChoice.appID !== undefined) ?
                          `${appChoice.appID}` : "No App Chosen."}
                      </div>
                    }
                  </div> 
                
                  {/*File Details if Command Selected is Push File */}
                  <div>
                    {selectedTab === 1 &&
                    <div>
                      <div>
                        {"> File Name: "}{(file === null || file === undefined) ? 
                        ' No file chosen.' : ` ${file.name}`}
                      </div>
                      <div>
                        {"> File Destination: "}{fileDest === "" ? ' N/A' : `${fileDest}`}
                      </div>
                    </div>
                  }
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
              COMMAND HISTORY 
            </CommandHistoryDisplay> 
          </RightSideHistory>

        </CommandsTab>                  
      </Bottom>
    </Wrapper>
  </Container>
  )
}

export { Commands }