import { Container } from '@material-ui/core';
import {useState, useEffect} from 'react';
import '../styles/dashboard.css';

const Dashboard = (props) => {
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
      const resp = await fetch('')
      const data = await resp.json()
      if(resp.ok) {
        //console.log(data.content[4].message)
        return data;
      } else {
        throw Error(`Request rejected with status ${resp.status}`);
      }
    }
    return (
        <div className="dashboard">
            <h1>DASHBOARD PAGE</h1>
            <Container>
                
            </Container>
        </div>
    )
}

export { Dashboard }