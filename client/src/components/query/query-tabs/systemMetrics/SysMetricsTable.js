/*
 * Name: SysMetricsTable.js
 * Purpose: Renders the System Metrics Table for the Query page tabs
 * 
 * Used by: query.js
 */

// Module imports here
import {useState, useEffect, useMemo} from 'react'

// Component imports here
import MetricsTable from '../../metrics-table/MetricsTable';

// Column data for the Table
import { SysMetricsColumnData } from './SysMetricsColumnData'

/*
 * This is the main component for the System Metrics Table tab
*/
export const SysMetricsTable = () => {
  
  /*
  * useMemo() hook ensures the data inst recreated on every render
  * otherwise react-table woulf think that it is receving new data on every render
  * it would attempt to calculate a lot of logic every time - affecting performance
  */
  const sysMetricsColumns = useMemo(() => SysMetricsColumnData, [])
  
  // Variable to store the data from the API call
  const [sysMetrics, setMetrics] = useState([])
  
  // Hook used to render the client machines returned from API call
  useEffect(() => {
    const getMetrics = async () => {
      const data = await fetchMetrics()
      setMetrics(data.system_metrics)
    }
    getMetrics()
  }, [])

  // Function to fetch client machines from DB
  const fetchMetrics = async () => {
    const resp = await fetch('/metrics/getallsysmetrics')
    const data = await resp.json()
    if(resp.ok) {
      return data;
    } else {
      throw Error(`Request rejected with status ${resp.status}`);
    }
  }

  return (
    <div>
      <MetricsTable data={sysMetrics} columns={sysMetricsColumns} />
    </div>
  )
}