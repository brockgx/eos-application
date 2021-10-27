import * as React from 'react';

import AvailApps from './AvailApps';
import { Button } from '@material-ui/core';
import  {useState } from 'react';
import Box from '@material-ui/core/Box';

export default function Command1List(props) {
    const [cmdChoice, setCmdChoice] = useState('');
    const [appChoice, setAppChoice] = useState('');

      const handleSubmit = (event) => {
        event.preventDefault();
        const value =  event.currentTarget.value;
        props.cmdChoice(event.currentTarget.value);
       // alert('A command was submitted: ' + `${value}`);
      }

    return (
    <Box sx={{ width: '100%'}}>
    <form onSubmit={handleSubmit}>
        <div style={{display: "flex", flexDirection: "column", fontSize:'20px', }}>
            <div  style={{display: "flex", flexDirection: "row", gap: "10px", marginTop: "10px", marginBottom: "10px", paddingBottom: "4px", borderBottom: "1px solid grey" }} >
                <div style={{flex: 1, }}>
                    Shutdown Device
                </div>
                <div style={{flex: 2}}>
            </div>
                <Button
                    variant="contained"
                    type="submit"
                    value="Shutdown Device"
                    onClick={handleSubmit}
                    style={{flex: 1, padding: '0px'}}
                >
                    Select
                </Button>
            </div >
            <div style={{display: "flex", flexDirection: "row", gap: "10px", marginTop: "10px", marginBottom: "10px", paddingBottom: "4px", borderBottom: "1px solid grey" }}>
            <div style={{flex: 1, marginRight: "0px"}}> 
            Restart Device
            </div >
            <div style={{flex: 2}}>
            </div>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    value="Restart Device"
                    style={{flex: 1, padding: '0px'}}
                >
                Select
                </Button>
            </div>
        
            <div style={{display: "flex", flexDirection: "row", gap: "10px", marginTop: "10px", marginBottom: "10px", alignItems: "center", paddingBottom: "4px", borderBottom: "1px solid grey" }} >
                <div style={{flex: 1}}>
                Kill Process
                </div>
                <div 
                    className = "AvailAppsContain" 
                    style={{flex: 2}}>
                    <AvailApps changeApp={appChoice => setAppChoice(appChoice)} />
                </div>
               
                <Button
                variant="contained"
                value="Kill Process"
                onClick={handleSubmit}
                style={{flex: 1, padding: '0px'}}
                >
                Select
                </Button>
                
            </div >
            <div  style={{display: "flex", flexDirection: "row", gap: "10px", marginTop: "10px", marginBottom: "10px", alignItems: "center", paddingBottom: "4px", borderBottom: "1px solid grey" }} >
                <div style={{flex: 1}}>
                Restart Application
                </div>
                <div 
                    className = "AvailAppsContain" 
                    style={{flex: 2}}>
                    <AvailApps changeApp={appChoice => setAppChoice(appChoice)} />
                </div>
                <Button
                    onClick={handleSubmit}
                    value="Restart Process"
                    variant="contained"
                    style={{flex: 1, padding: '0px'}}
                    >
                    Select
                </Button>
            </div>
        </div>
    </form>
    </Box>
    );
}