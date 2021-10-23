/*
 * Name: SysMetricsColumnData.js
 * Purpose: Column data for System Metrics table
 * 
 * Used by: SysMetricsTable.js
 */

// Import filter functions from ColumnFilter.js 
import { TextFilter, SelectColumnFilter, NumberRangeColumnFilter,  DateColumnFilter, TimeColumnFilter} from '../../metrics-table/ColumnFilters'

export const SysMetricsColumnData = [
    { 
        Header: 'Name',
        accessor: 'name',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'Date',
        accessor: 'date',
        Filter: DateColumnFilter,
        filter: "equals"
    },
    { 
        Header: 'Time',
        accessor: 'time',
        Filter: TimeColumnFilter,
        filter: "equals"
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
        Header: 'Disk Names',
        accessor: 'disk_names',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'Disk Usage (%)',
        accessor: 'disk_use',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    },
    { 
        Header: 'Disk Read (B)',
        accessor: 'disk_read',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    },
    { 
        Header: 'Disk Write (B)',
        accessor: 'disk_write',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    },
    { 
        Header: 'Network Usage (B)',
        accessor: 'network',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    }
]