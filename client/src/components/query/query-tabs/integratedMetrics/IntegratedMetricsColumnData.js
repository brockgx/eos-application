/*
 * Name: IntegratedMetricsColumnData.js
 * Purpose: Column data for Integrated Metrics Table
 * 
 * Usage: IntegratedMetricsTable.js
 */

// Import filter functions from ColumnFilter.js
import { TextFilter, SelectColumnFilter, NumberRangeColumnFilter, DateTimeColumnFilter } from '../../metrics-table/ColumnFilters'

export const IntegratedMetricsColumnData = [
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