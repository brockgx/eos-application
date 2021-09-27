import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';


// import components
import Machines from '../components/dashboard/Machines';
import AddMachine from '../components/dashboard/AddMachine';
import Search from '../components/search/Search';

const Container = styled.div`
  flex: 10;
  background-color: #edf0f5;
  padding: 5px;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

// const Title = styled.h1`
//   font-weight: 600;
//   text-align: center;
// `;

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

const ConnectedMachines = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;
`;

const Dashboard = () => {
    const [machines, setMachines] = useState({description: "default desc", content: []})

    useEffect(() => {
      const getMachines = async () => {
        const machinesFromServer = await fetchMachines()
        setMachines(machinesFromServer)
      }
  
      getMachines()
    }, [])
  
    // Fetch device data from DB
    const fetchMachines = async () => {
      const resp = await fetch('/dash/clientmachines')
      const data = await resp.json()
      if(resp.ok) {
        console.log(data.content)
        return data;
      } else {
        throw Error(`Request rejected with status ${resp.status}`);
      }
    }

    //Filter machines
    const filterMachines = (machines, query) => {
      if (!query) {
        return machines
      }
  
      return machines.filter((machine) => {
        const machineName = machine.machine_name.toLowerCase()
        return machineName.includes(query)
      })
    }

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredMachines = filterMachines(machines.content, searchQuery);

    return (
        <Container>
          <Wrapper>
            {/* <Title>DASHBOARD PAGE</Title> */}
            <Top>
              <TopText>Connected Machines</TopText>
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <AddMachine />
            </Top>
            <Bottom>
              <ConnectedMachines>
                {filteredMachines.map((machine) => (
                  <Machines machine={machine} key={machine.name} />
                ))}
              </ConnectedMachines>
            </Bottom>
          </Wrapper>
        </Container>
    )
}

export { Dashboard }