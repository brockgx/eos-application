/*
 * Name: Dashboard.js
 * Purpose: Renders various components that make up the 'Dashboard Page' 
 * 
 * Usage: App.js to render the Support page
 */

// Module imports here
import {useState, useEffect} from 'react';
import styled from 'styled-components';

// Component imports here
import Machines from '../components/dashboard/Machines';
import Search from '../components/dashboard/Search';

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
  padding-bottom: 15px;
`;
const Bottom = styled.div`
  display: flex;
  padding-right: 20px;
  justify-content: space-between;
`;
const ConnectedMachines = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;
`;

/*
 * This is the main implementation for the "Dashboard" page
 */
const Dashboard = () => {
  
  // Used to store the client machines returned from the API
  const [machines, setMachines] = useState({description: "default desc", content: []})

  // Hook used to render the client machines returned from API call
  useEffect(() => {
    const getMachines = async () => {
      const machinesFromServer = await fetchMachines()
      setMachines(machinesFromServer)
    }
    getMachines()
  }, [])
  
  // Function to fetch client machines from DB
  const fetchMachines = async () => {
    const resp = await fetch('/dash/clientmachines')
    const data = await resp.json()
    if(resp.ok) {
      return data;
    } else {
      throw Error(`Request rejected with status ${resp.status}`);
    }
  }

  // Function to create a global filter for machine names
  const filterMachines = (machines, query) => {
    if (!query) {
      return machines
    }
    return machines.filter((machine) => {
      const machineName = machine.name
      return machineName.includes(query)
    })
  }

  // Variables used by global filtering function
  const { search } = window.location;
  const query = new URLSearchParams(search);
  const [searchQuery, setSearchQuery] = useState(query || undefined);
  const filteredMachines = filterMachines(machines.content, searchQuery);

  return (
    <Container>
      <Wrapper>
        <Top>
          <TopText>Connected Machines</TopText>
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Top>
        <Bottom>
          <ConnectedMachines>
            {/* Map the client machines from the DB to the "Machines" component */}
            {filteredMachines.map((machine) => (
              <Machines machine={machine} key={machine.mac_address} />
            ))}
          </ConnectedMachines>
        </Bottom>
      </Wrapper>
    </Container>
  )
}
export { Dashboard }