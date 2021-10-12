// Column data for sys metrics table on Query.js page
// Columns: machine_name, timestamp, cpu_usage, ram_usage, disk_usage, disk_read, disk_write, network_usage
export const ColumnData = [
    { 
        Header: 'Machine Name',
        accessor: 'name',
    },
    { 
        Header: 'Time',
        accessor: 'time',
    },
    { 
        Header: 'CPU Usage (%)',
        accessor: 'cpu',
    },
    { 
        Header: 'RAM Usage (%)',
        accessor: 'ram',
    },
    { 
        Header: 'Disk Usage (%)',
        accessor: 'disk',
    },
    { 
        Header: 'Disk Read (Mb)',
        accessor: 'disk_read',
    },
    { 
        Header: 'Disk Write (Mb)',
        accessor: 'disk_write',
    },
    { 
        Header: 'Network Usage (%)',
        accessor: 'network',
    }
]