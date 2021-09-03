import  {useState } from 'react';

import { Tabs, Tab } from '@material-ui/core';

import Command1 from '../components/commands-tabs/Command1';
import Command2 from '../components/commands-tabs/Command2';
import Command3 from '../components/commands-tabs/Command3';

import '../styles/command.css';

const Commands = (props) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <div className="command">
          <div className="commandTitle">
            <h1>Command Page</h1>
          </div>
          <div className="commandsTab">
            <Tabs  value={selectedTab} onChange={handleChange} >
                <Tab label="Command Option 1" />
                <Tab label="Command Option 2" />
                <Tab label="Command Option 3" />
            </Tabs>
            {selectedTab === 0 && <Command1 />}
            {selectedTab === 1 && <Command2 />}
            {selectedTab === 2 && <Command3 />}
          </div>
        </div>
    )
}

export { Commands }