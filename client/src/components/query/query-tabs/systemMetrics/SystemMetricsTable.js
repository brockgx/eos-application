import {useState, useEffect, useMemo} from 'react'
import MetricsTable from '../../metrics-table/MetricsTable';
import { SysMetricsColumnData } from './SysMetricsColumnData'


export const SystemMetricsTable = () => {
  
  /*
  * useMemo() hook ensures the data inst recreated on every render
  * otherwise react-table woulf think that it is receving new data on every render
  * it would attempt to calculate a lot of logic every time - affecting performance
  */
  const sysMetricsColumns = useMemo(() => SysMetricsColumnData, [])
  
  const [sysMetrics, setMetrics] = useState([])
  /*
   * Get sys metrics from API call
   */
  useEffect(() => {
    const getMetrics = async () => {
      const data = await fetchMetrics()
      setMetrics(data.system_metrics)
    }
    getMetrics()
  }, [])

  // Fetch data from DB
  const fetchMetrics = async () => {
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
      <MetricsTable data={sysMetrics} columns={sysMetricsColumns} />
    </div>
  )
}