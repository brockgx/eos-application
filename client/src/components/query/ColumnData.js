// Column data for sys metrics table on Query.js page
// Columns: machine_name, timestamp, cpu_usage, ram_usage, disk_usage, disk_read, disk_write, network_usage
import { ColumnFilter, SelectColumnFilter, NumberRangeColumnFilter, DateTimeColumnFilter } from './ColumnFilter'

export const ColumnData = [
    { 
        Header: 'Machine Name',
        accessor: 'name',
        Filter: ColumnFilter,
        
        
    },
    { 
        Header: 'Time',
        accessor: 'time',
        Filter: DateTimeColumnFilter,
        
    },
    { 
        Header: 'CPU Usage (%)',
        accessor: 'cpu',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    },
    { 
        Header: 'RAM Usage (%)',
        accessor: 'ram',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    },
    { 
        Header: 'Disk Usage (%)',
        accessor: 'disk',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    },
    { 
        Header: 'Disk Read (MB)',
        accessor: 'disk_read',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    },
    { 
        Header: 'Disk Write (MB)',
        accessor: 'disk_write',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    },
    { 
        Header: 'Network Usage (%)',
        accessor: 'network',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    }
]