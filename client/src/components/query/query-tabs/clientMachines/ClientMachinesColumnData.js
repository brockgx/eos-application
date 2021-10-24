/*
 * Name: ClientMachinesColumnData.js
 * Purpose: Column data for Client Machines table
 * 
 * Usage: ClientMachinesTable.js
 */

// Import filter functions from ColumnFilter.js
import { TextFilter, SelectColumnFilter, NumberRangeColumnFilter, DateTimeColumnFilter } from '../../metrics-table/ColumnFilters'

export const ClientMachinesColumnData = [
    { 
        Header: 'Name',
        accessor: 'name',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'Host Name',
        accessor: 'host_name',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'MAC Address',
        accessor: 'mac_address',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'IP Address',
        accessor: 'address',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'Ports',
        accessor: 'ports',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'OS',
        accessor: 'os',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'OS Version',
        accessor: 'os_full_version',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
]