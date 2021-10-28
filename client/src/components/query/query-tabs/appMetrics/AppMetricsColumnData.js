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
        // can interchange with TextFilter
        Filter: SelectColumnFilter,
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
        // can interchange with SelectColumnFilter
        Filter: TextFilter,
        filter: "includes"
    },
    { 
        Header: 'App PID',
        accessor: 'app_pid',
        // can interchange with SelectColumnFilter
        Filter: TextFilter,
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