/*
 * Name: Query.js
 * Purpose: Renders various components that make up the 'Query Page' 
 * 
 * Usage: App.js to render the Query page
 */

// Module imports here
import {useState} from 'react'
import styled from 'styled-components';

// Component imports here
import { Tabs, Tab } from '@material-ui/core';
import {SysMetricsTable} from '../components/query/query-tabs/systemMetrics/SysMetricsTable.js'
import {AppMetricsTable} from '../components/query/query-tabs/appMetrics/AppMetricsTable.js'
import {ClientMachinesTable} from '../components/query/query-tabs/clientMachines/ClientMachinesTable.js'

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
  padding: 10px 20px 20px 40px;
`;
const TopText = styled.span`
  font-weight: 500;
  font-size: 44px;
  padding-bottom: 10px;
`;
// const Text = styled.span`
//   font-weight: 400;
//   font-size: 22px;
//   padding-bottom: 10px;
// `;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  padding: 10px;
  justify-content: space-between;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

/*
 * This is the main implementation for the "Query" page
*/
const Query = () => {
  
  // Used to store state of Tab component
  const [selectedTab, setSelectedTab] = useState(0);

  // Function to handle change event of Tab component
  const handleChange = (event, newValue) => {
      setSelectedTab(newValue);
  }
  return (
    <Container>
      <Wrapper>
        <Top>
          <TopText>Query Database</TopText>
        </Top>
        <Bottom>
          <div
            style={{display: "flex"}}
          >
            <div
            style={{display: "flex", height: "70vh"}}
            >
            <Tabs
              orientation="vertical"
              value={selectedTab}
              onChange={handleChange} 
              textColor="primary"
              indicatorColor="primary"
              style={{minWidth: "180px"}}
              >
              <Tab label="Client Machines" style={{ fontSize:"18px"}}/>
              {/* <Tab label="Integrated Metrics" /> */}
              <Tab label="System Metrics" style={{ fontSize:"18px"}}/>
              <Tab label="App Metrics" style={{ fontSize:"18px"}}/>
            </Tabs>
            </div>
            {selectedTab === 0 && <ClientMachinesTable />}
            {selectedTab === 1 && <SysMetricsTable/>}
            {selectedTab === 2 && <AppMetricsTable/>}
            {/* {selectedTab === 3 && <SystemMetricsTable/>}    */}
          </div>
        </Bottom>
      </Wrapper>
    </Container>
  )
}
export { Query }