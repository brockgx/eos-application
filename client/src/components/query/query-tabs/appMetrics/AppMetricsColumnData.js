/*
 * Name: AppMetricsColumnData.js
 *
 * Purpose: Column data for Applicatoion Metrics table
 * 
 * Usage: AppMetricsTable.js
 */

// Import filter functions from ColumnFilter.js 
import { TextFilter, SelectColumnFilter, NumberRangeColumnFilter, DateColumnFilter, TimeColumnFilter } from '../../metrics-table/ColumnFilters'

export const AppMetricsColumnData = [
    { 
        Header: 'Machine Name',
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
        Header: 'App Name',
        accessor: 'app_name',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'App PID',
        accessor: 'app_pid',
        Filter: TextFilter,
        // can be equals or includes
        filter: "includes"
    },
    { 
        Header: 'CPU Usage (%)',
        accessor: 'app_cpu',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    },
    { 
        Header: 'RAM Usage (%)',
        accessor: 'app_ram',
        Filter: NumberRangeColumnFilter,
        filter: "between"
    },
]