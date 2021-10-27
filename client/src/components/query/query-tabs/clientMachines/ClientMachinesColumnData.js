/*
 * Name: ClientMachinesColumnData.js
 * Purpose: Column data for Client Machines table
 * 
 * Usage: ClientMachinesTable.js
 */

// Import filter functions from ColumnFilter.js
import { TextFilter } from '../../metrics-table/ColumnFilters'

export const ClientMachinesColumnData = [
    { 
        Header: 'Name',
        accessor: 'name',
        // can interchange with SelectColumnFilter
        Filter: TextFilter,
        filter: "includes"
    },
    { 
        Header: 'Host Name',
        accessor: 'host_name',
        // can interchange with SelectColumnFilter
        Filter: TextFilter,
        filter: "includes"
    },
    { 
        Header: 'MAC Address',
        accessor: 'mac_address',
        // can interchange with SelectColumnFilter
        Filter: TextFilter,
        filter: "includes"
    },
    { 
        Header: 'IP Address',
        accessor: 'address',
        // can interchange with SelectColumnFilter
        Filter: TextFilter,
        filter: "includes"
    },
    { 
        Header: 'Ports',
        accessor: 'ports',
        // can interchange with SelectColumnFilter
        Filter: TextFilter,
        filter: "includes"
    },
    { 
        Header: 'OS',
        accessor: 'os',
        // can interchange with SelectColumnFilter
        Filter: TextFilter,        
        filter: "includes"
    },
    { 
        Header: 'OS Version',
        accessor: 'os_full_version',
        // can interchange with SelectColumnFilter
        Filter: TextFilter,
        filter: "includes"
    },
]