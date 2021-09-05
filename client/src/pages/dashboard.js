import {useState, useEffect} from 'react';

import Machines from '../components/Machines.js';
import '../styles/dashboard.css';

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
    
    return (
        <div className="dashboard">
          <div className="dashboardTitle">
            <h1 >DASHBOARD PAGE</h1>
          </div>
            <div className="connectedMachine">
                <Machines
                  machine={machines.content}
                />
            </div>
        </div>
    )
}

export { Dashboard }