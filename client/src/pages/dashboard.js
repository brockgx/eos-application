import React from 'react';
import {useState, useEffect} from 'react';
import * as IoIcons from 'react-icons/io';

import styled from 'styled-components';
// import Machines from '../components/Machines.js';
import MachinesV2 from '../components/MachinesV2.js';
// import '../styles/dashboard.css';

// the below line was the original line
// const Dashboard = (props) => {


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

const TopButton = styled.button`
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  border: filled;
  border-radius: 5px;
  border-color: #6a994e;
  background-color: #6a994e;
  color: #f8f7ff;
  cursor: pointer;
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
      const resp = await fetch('/getmachines')
      const data = await resp.json()
      if(resp.ok) {
        console.log(data.content)
        return data;
      } else {
        throw Error(`Request rejected with status ${resp.status}`);
      }
    }

    const refreshPage = () => {
      window.location.reload();
    }

    return (
        <Container>
          <Wrapper>
            {/* <Title>DASHBOARD PAGE</Title> */}
            <Top>
              <TopText>Connected Machines</TopText>
              <IoIcons.IoMdRefresh 
                onClick={refreshPage} 
                style={{ 
                  width: "30px", 
                  height: "30px",
                  marginRight: "1520px",
                  marginBottom: "3px",
                  cursor: "pointer"
                  }} 
                />
              <TopButton>Add New Machine</TopButton>
            </Top>
            <Bottom>
              <ConnectedMachines>
                {machines.content.map((machine) => (
                  <MachinesV2 machine={machine} key={machine.id} />
                ))}
              </ConnectedMachines>
            </Bottom>
          </Wrapper>
        </Container>
    )
}

export { Dashboard }