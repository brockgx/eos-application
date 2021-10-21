import {useState, useEffect, useMemo} from 'react'
import MetricsTable from '../../metrics-table/MetricsTable';
import { ClientMachinesColumnData } from './ClientMachinesColumnData'

export const ClientMachinesTable = () => {
  /*
  * useMemo() hook ensures the data inst recreated on every render
  * otherwise react-table woulf think that it is receving new data on every render
  * it would attempt to calculate a lot of logic every time - affecting performance
  */
  const clientMachinesColumns = useMemo(() => ClientMachinesColumnData, [])

  const [clientMachines, setclientMachines] = useState([])

  /*
   * Get client machines from API call
   */
  useEffect(() => {
    const getMachines = async () => {
      const data = await fetchMachines()
      setclientMachines(data.content)
    }
    getMachines()
  }, [])

  // Fetch data from DB
  const fetchMachines = async () => {
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
      <MetricsTable data={clientMachines} columns={clientMachinesColumns} />
    </div>
  )
}