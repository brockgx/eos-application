/*
 * Name: IntegratedMetricsTable.js
 * Purpose: Renders a Table of Integrated System & App metrics
 * 
 * Usage: Query.js
 */

// Module imports here
import {useState, useEffect, useMemo} from 'react'

// Component imports here
import MetricsTable from '../../metrics-table/MetricsTable';

// Column data for the Table
import { IntegratedMetricsColumnData } from './IntegratedMetricsColumnData'

/*
 * This is the main component for the Integrated Metrics Table tab
*/
export const IntegratedMetricsTable = (props) => {
  /*
  * useMemo() hook ensures the data inst recreated on every render
  * otherwise react-table woulf think that it is receving new data on every render
  * it would attempt to calculate a lot of logic every time - affecting performance
  */
  const integratedMetricsColumns = useMemo(() => IntegratedMetricsColumnData, [])

  // Variable to store the data from the API call
  const [metrics, setMetrics] = useState([])

  // Hook used to render the client machines returned from API call
  useEffect(() => {
    const getMachines = async () => {
      const data = await fetchData()
      setMetrics(data.content)
    }
    getMachines()
  }, [])

  // Function to fetch client machines from DB
  const fetchData = async () => {
    const resp = await fetch('/metrics/getallmetrics')
    const data = await resp.json()
    if(resp.ok) {
      return data;
    } else {
      throw Error(`Request rejected with status ${resp.status}`);
    }
  }
    
  return (
    <div>
      <MetricsTable data={metrics} columns={integratedMetricsColumns} machineName={props.machineName}/>
    </div>
  )
}