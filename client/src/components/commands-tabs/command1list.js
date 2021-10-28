import React from 'react';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    
`;

const ShutDeviceDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid grey;
    
`;

const ShutDownSpaceDiv = styled.div`
    flex: 2;
`;

const RestartDeviceDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid grey;
`;

const RestartDeviceSpaceDiv = styled.div`
    flex: 2;
`;

const KillProcessDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid grey;
`;

const KillProcessSpaceDiv = styled.div`
    flex: 2;
`;

const RestartAppDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
    padding-bottom: 4px;
    border-bottom: 1px solid grey;
`;

const RestartAppSpaceDiv = styled.div`
    flex: 2;
`;

//divs still to be made into styled components 
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
                <ShutDeviceDiv>
                    <div style={{flex: 1, }}>
                        Shutdown Device
                    </div>
                        <ShutDownSpaceDiv />
                    <Button
                        variant="contained"
                        type="submit"
                        value="Shutdown Device"
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
                        value="Restart Device"
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
                        value="Kill Process"
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
                        value="Restart Process"
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