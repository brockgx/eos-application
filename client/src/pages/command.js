/*
 * Name: Command.js
 * Purpose: Renders various components that make up the 'Command Page' 
 * 
 * Usage: App.js to render the Command page
 */

// Module imports here
import  {useState } from 'react';
import styled from 'styled-components';

// Component imports here
import Command1List from '../components/commands-tabs/command1list';
import Command2 from '../components/commands-tabs/Command2';
import Command3 from '../components/commands-tabs/Command3';
import BasicSelect from '../components/commands-tabs/osSelect';
import CmdMachineChoice from '../components/commands-tabs/CmdMachineChoice';
import AvailApps from '../components/commands-tabs/AvailApps';
//import DataTable from '../components/commands-tabs/commandhistory';
import { AppsContext } from '../components/commands-tabs/appContext';
import { Button } from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core';

// Styled component declarations
const Container = styled.div`
  flex: 10;
  background-color: #edf0f5;
  padding: 5px;
`;
const Wrapper = styled.div`
  padding: 20px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
`;
const TopText = styled.span`
  font-weight: 500;
  font-size: 44px;
`;
const Bottom = styled.div`
  display: flex;
  padding: 10px;
  background-color: #ffff;
  border-radius: 2px;
  min-height: 1000px;
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 20px;
  border-right: 1px solid black;
`;
const CommandsTab= styled.div`
  font-weight: 300;
  font-size: 18px;
  flex: 1;
  padding: 5px;
`;
const CommandDetailsDisplay= styled.div`
  padding: 10px;
  flex: 1;
`;
const DetailsTitle = styled.span`
  font-size: 24px;
  font-weight: 400;
  width: 20%;
`;
const DetailsContainer= styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
`;
const OutputRow= styled.div`
  font-size: 18px;
  font-weight: 300;
`;
const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 10px;
  padding-left: 20px;    
`;
const Title = styled.span`
  font-size: 24px;
  font-weight: 400;
  padding: 5px;
  margin-bottom: 10px;
  border-bottom : 2px solid blue;
`;
const ContentContainer = styled.div`
  border: 1px solid grey;
  border-radius: 2px;
  background-color: #eeff;
  width: 100%;
  height: 100%;
`;
const SpaceBox = styled.div`
  flex: 1;
`;

// Used to create default values for command details
const defaultValues = {  
  DeviceID: "",
  DeviceName: "",
  CommandType: "",
  Parameters: {
    file: "",
    b64file: "",
    destination: "",
    appID: "",
    custom_command: "",
  },
};

/*
 * This is the main implementation for the "Command" page
 */
const Commands = (props) => {
  // Variable to handle state of Tabs component
  const [selectedTab, setSelectedTab] = useState(0);

  // Function to handle change event of Tab component
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
  const [osChoice, setOsChoice] = useState('')
    
  //console.log(customCmd)
  //console.log(machineChoice)
  //console.log(file)
  const [commandDetails, setCommandDetails] = useState(defaultValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(context.machineID);
    console.log(fileDest);
    console.log(file);
    console.log(osChoice)
    {/* 
    setCommandDetails({
      ...commandDetails,
      machineChoice: commandDetails.DeviceID,
      cmdChoice: commandDetails.CommandType,
      appChoice: commandDetails.Parameters.appID,
      file: commandDetails.Parameters.file,
      b64file: commandDetails.Parameters.b64file,
      customCmd: commandDetails.Parameters.custom_command,


    });
    console.log(...commandDetails);
    */}
  }

  {/**
  fetch('/cmd/cmddetails', {
  method: 'POST',
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(commandDetails)
  })

  */
  }

  return (
    <Container>
      <Wrapper>
        <Top>
          <TopText>Commands </TopText>
        </Top>
        <Bottom>
          <LeftSide>
            <form onSubmit={handleSubmit}>
              <CommandsTab>
                <Tabs
                  value={selectedTab} 
                  indicatorColor="primary" 
                  onChange={handleChange} 
                >
                  <Tab label="Preset Command Options" style={{fontSize: "18px", fontWeight: "400"}} />
                  <Tab label="Push File to a Device" style={{fontSize: "18px", fontWeight: "400"}} />
                  <Tab label="Custom Commands" style={{fontSize: "18px", fontWeight: "400"}} />             
                </Tabs>
              
                <AppsContext.Provider value={[context, setContext]}>
                  <CmdMachineChoice changeMachine={machineChoice => setMachineChoice(machineChoice)} /> 
                  {selectedTab === 0 && <Command1List cmdChoice={cmdChoice => setCmdChoice(cmdChoice)} />}
                  {/*<Command1 
                    machineChoice={machineChoice}
                  cmdChoice={cmdChoice => setCmdChoice(cmdChoice)}
                  />
                  */}
                  {selectedTab === 1 && 
                    <Command2 
                      filePush={filePush => setFilePush(filePush)}
                      changeFile={file => setFile(file)} 
                      changeFileDest={fileDest => setFileDest(fileDest)}
                  />}
                  {selectedTab === 2 && 
                    <Command3 
                      changeCmd={customCmd => setCustomCmd(customCmd)}
                  />} 
                </AppsContext.Provider>

                <SpaceBox style={{maxHeight: selectedTab === 0 || 2 ? "56px": "17px"}}>
                  {(selectedTab === 0) && (cmdChoice === "Kill Process" || cmdChoice === "Restart Process") &&
                    <div 
                      className = "AvailAppsContain" 
                      style={{flex: 2}}>
                      <AvailApps changeApp={appChoice => setAppChoice(appChoice)} />
                    </div>
                  }
                  {/*
                  {(selectedTab === 2) &&
                  <div
                    className = "AvailAppsContain" 
                    style={{flex: 2}}>
                    <AvailApps changeApp={appChoice => setAppChoice(appChoice)} />
                  </div>
                  }
                  */
                  }
                  {(selectedTab === 2) &&
                    <div
                      className = "osSelectContain" 
                      style={{flex: 2}}>
                      <BasicSelect changeOS={osChoice => setOsChoice(osChoice)} />
                    </div>
                  }
                </SpaceBox>
              </CommandsTab>
              <CommandDetailsDisplay> 
                <DetailsTitle>COMMAND DETAILS</DetailsTitle>
                <DetailsContainer>
                  {/*Machine Selected*/}
                  <OutputRow>
                    <strong>{"> "}</strong>
                    {"Selected Machine: "} 
                    {(context.machineID !== "" && context.machineID !== undefined) ? ` ${context.machineID}`: "No Machine Chosen"}
                  </OutputRow>
                  {/*Command Selected */}
                  <OutputRow>
                    {(selectedTab === 2 ) && `(Custom Command): ${customCmd}`}
                  </OutputRow>
                  <OutputRow>
                    {selectedTab === 2 && (osChoice !== undefined && osChoice !== null)
                      ? <strong>{"> "}</strong> + "Operating System: " + {osChoice}
                      : ''
                    }
                    {(selectedTab === 0 && cmdChoice !== undefined && cmdChoice !== null && cmdChoice !== '')
                      ? <><strong>{"> "}</strong> (Preset Command): {cmdChoice}</>
                      : ''
                    }
                  </OutputRow>

                  {/*App Selected if Command selected is Restart/Kill application*/}
                  {(selectedTab === 0) && (cmdChoice === "Kill Process" || cmdChoice === "Restart Process") &&
                    <OutputRow>
                      <strong>{"> "}</strong>
                      {'Selected App: '}
                      {(appChoice.appID !== "" && appChoice.appID !== undefined)
                        ? `${appChoice.appID}`
                        : "No App Chosen."
                      }
                    </OutputRow>
                  }

                  {/*File Details if Command Selected is Push File */}
                  {selectedTab === 1 &&
                    <>
                      <OutputRow>
                        <strong>{"> "}</strong>
                        {"File Name: "}{(file === null || file === undefined)
                          ? ' No file chosen.'
                          : ` ${file.name}`
                        }
                      </OutputRow>
                      <OutputRow>
                        <strong>{"> "}</strong>
                        {"File Destination: "}{fileDest === "" ? ' N/A' : `${fileDest}`}
                        {(filePush === "") ? '' : `${filePush}`}
                      </OutputRow>
                    </>
                  }
                </DetailsContainer>
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
            </form>
          </LeftSide>
          <RightSide>
            <Title>Command History</Title>
            <ContentContainer></ContentContainer>
          </RightSide>
        </Bottom>
      </Wrapper>
    </Container>
  )
}
export { Commands }