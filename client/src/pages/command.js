import  {useState } from 'react';

import { Tabs, Tab } from '@material-ui/core';

import Command1 from '../components/commands-tabs/Command1';
import Command2 from '../components/commands-tabs/Command2';
import Command3 from '../components/commands-tabs/Command3';

import styled from 'styled-components';

//import '../styles/command.css';

const Container = styled.div`
  flex: 10;
  background-color: #edf0f5;
  padding: 5px;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 20px 40px;
`;

const TopText = styled.span`
  font-weight: 500;
  font-size: 44px;
  padding-bottom: 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;

`;
const CommandsTab = styled.div`
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  height: 85%;
  width: 95%;
  padding: 30px;
  background-color: #ffff;
  border-radius: 6px;
  height: 65vh;
  font-weight: 300;
  font-size: 24px;
`;

const Commands = (props) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    return (
      <Container>
        <Wrapper>
          <Top>
            <TopText>Commands</TopText>
          </Top>
          <Bottom>
            <CommandsTab>
              <Tabs  value={selectedTab} onChange={handleChange} >
                  <Tab label="Command Option 1" />
                  <Tab label="Command Option 2" />
                  <Tab label="Command Option 3" />
              </Tabs>
              {selectedTab === 0 && <Command1 />}
              {selectedTab === 1 && <Command2 />}
              {selectedTab === 2 && <Command3 />}
            </CommandsTab>
          </Bottom>
        </Wrapper>
      </Container>
    )
}

export { Commands }