/*
 * Name: IntegratedMetricsColumnData.js
 * Purpose: Column data for Integrated Metrics Table
 * 
 * Usage: IntegratedMetricsTable.js
 */

// Import filter functions from ColumnFilter.js
import { TextFilter, NumberRangeColumnFilter, DateColumnFilter, TimeColumnFilter, SelectColumnFilter } from '../../metrics-table/ColumnFilters'

export const IntegratedMetricsColumnData = [
    {
        Header: 'Type',
        accessor: 'type',
        // can interchange with TextFilter
        Filter: SelectColumnFilter,
        filter: "equals"
    },
    {
        Header: 'Name',
        accessor: 'name',
        // can interchange with SelectColumnFilter
        Filter: TextFilter,
        filter: "equals"
    },
    {
        Header: 'Machine',
        accessor: 'machine_name',
        // can interchange with TextFilter
        Filter: TextFilter,
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
        // can interchange with SelectColumnFilter
        Filter: SelectColumnFilter,
        filter: "equals"
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