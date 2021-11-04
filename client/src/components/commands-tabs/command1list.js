/*
 * Name: command1list.js
 * Purpose: Renders a group of buttons that make up the 'Command Page' preset commands options (Tab 1)
 * 
 * Usage: Child of Command.js 
 *        Renders a group of buttons that make up the 'Command Page' preset commands options (Tab 1)
 */


// Module imports here
import React from 'react';

// Component imports here
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 19px;
`;

const DetailHeading = styled.text`
  font-size: 25px;
  font-weight: 600;
  padding-top: 15px;
  width: 100%;
`;

const ShutDeviceDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding-bottom: 4px;
    margin-top: 25px;
    margin-bottom: 10px;
    border-bottom: 1px solid grey;
`;

const ShutDownSpaceDiv = styled.div`
    flex: 2;
`;

const RestartDeviceDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding-bottom: 4px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid grey;
`;

const RestartDeviceSpaceDiv = styled.div`
    flex: 2;
`;

const KillProcessDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding-bottom: 4px;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid grey;
`;

const KillProcessSpaceDiv = styled.div`
    flex: 2;
`;

const RestartAppDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding-bottom: 4px;
    align-items: center;
    margin-top: 10px;
    border-bottom: 1px solid grey;
`;

const RestartAppSpaceDiv = styled.div`
    flex: 2;
`;

export default function Command1List(props) {

      const handleSubmit = (event) => {
        event.preventDefault();
        const value =  event.currentTarget.value;
        props.cmdChoice(event.currentTarget.value);
      }
      
    return (
    <Box sx={{ width: '100%'}}>
        <form onSubmit={handleSubmit}>
            <MainContainer>
                <DetailHeading>
                    Click the preset option you would like to run.
                </DetailHeading>
                <ShutDeviceDiv>
                    <div style={{flex: 1, }}>
                        Shutdown Device
                    </div>
                    <ShutDownSpaceDiv />
                    <Button
                        variant="contained"
                        type="submit"
                        value="shutdownmachine"
                        onClick={handleSubmit}
                        style={{flex: 1, padding: '0px'}}
                    >
                        Select
                    </Button>
                </ShutDeviceDiv>
                <RestartDeviceDiv>
                    <div style={{flex: 1, marginRight: "0px"}}> 
                        Restart Device
                    </div >
                    <RestartDeviceSpaceDiv />
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        value="restartmachine"
                        style={{flex: 1, padding: '0px'}}
                    >
                        Select
                    </Button>
                </RestartDeviceDiv>
                <KillProcessDiv>
                    <div style={{flex: 1}}>
                        Kill Process
                    </div>
                    <KillProcessSpaceDiv />
                    <Button
                        variant="contained"
                        value="appshutdown"
                        onClick={handleSubmit}
                        style={{flex: 1, padding: '0px'}}
                    >
                        Select
                    </Button>  
                </KillProcessDiv>
                <RestartAppDiv>
                    <div style={{flex: 1}}>
                        Restart Application
                    </div>
                    <RestartAppSpaceDiv />
                    <Button
                        onClick={handleSubmit}
                        value="restartapp"
                        variant="contained"
                        style={{flex: 1, padding: '0px'}}
                    >
                        Select
                    </Button>
                </RestartAppDiv>
            </MainContainer>
        </form>
    </Box>
    );
}