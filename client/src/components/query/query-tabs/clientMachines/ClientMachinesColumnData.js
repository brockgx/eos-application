// Column data for client machines table on Query.js page
// Columns: machine_name, timestamp, cpu_usage, ram_usage, disk_usage, disk_read, disk_write, network_usage
import { ColumnFilter, SelectColumnFilter, NumberRangeColumnFilter, DateTimeColumnFilter } from '../../metrics-table/ColumnFilter'

export const ClientMachinesColumnData = [
    { 
        Header: 'Name',
        accessor: 'name',
        Filter: ColumnFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'Host Name',
        accessor: 'host_name',
        Filter: ColumnFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'MAC Address',
        accessor: 'mac_address',
        Filter: ColumnFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'IP Address',
        accessor: 'address',
        Filter: ColumnFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'Ports',
        accessor: 'ports',
        Filter: ColumnFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'OS',
        accessor: 'os',
        Filter: ColumnFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'OS Version',
        accessor: 'os_full_version',
        Filter: ColumnFilter,
        // can be equals or includes
        filter: "includes"
    },
]