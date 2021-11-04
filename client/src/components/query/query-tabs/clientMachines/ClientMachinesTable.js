/*
 * Name: ClientMachinesTable.js
 * Purpose: Renders the Client Machines Table for the Query page tabs
 * 
 * Usage: Query.js
 */

// Module imports here
import {useState, useEffect, useMemo} from 'react'

// Component imports here
import MetricsTable from '../../metrics-table/MetricsTable';

// Column data for the Table
import { ClientMachinesColumnData } from './ClientMachinesColumnData'

/*
 * This is the main component for the Client Machines Table tab
*/
export const ClientMachinesTable = (props) => {
  /*
  * useMemo() hook ensures the data inst recreated on every render
  * otherwise react-table woulf think that it is receving new data on every render
  * it would attempt to calculate a lot of logic every time - affecting performance
  */
  const clientMachinesColumns = useMemo(() => ClientMachinesColumnData, [])

  // Variable to store the data from the API call
  const [clientMachines, setclientMachines] = useState([])

  // Hook used to render the client machines returned from API call
  useEffect(() => {
    const getMachines = async () => {
      const data = await fetchData()
      setclientMachines(data.content)
    }
    getMachines()
  }, [])

  // Function to fetch client machines from DB
  const fetchData = async () => {
    const resp = await fetch('/dash/clientmachines')
    const data = await resp.json()
    if(resp.ok) {
      return data;
    } else {
      throw Error(`Request rejected with status ${resp.status}`);
    }
  }
  
  return (
    <div>
      <MetricsTable data={clientMachines} columns={clientMachinesColumns} machineName={props.machineName} />
    </div>
  )
}