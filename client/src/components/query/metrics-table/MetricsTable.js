/*
 * Name: MetricsTable.js
 * Purpose: Uses the 'react-table' package to render a table 
 * Documentation: https://react-table.tanstack.com/docs/overview
 * Sources: https://blog.logrocket.com/complete-guide-building-smart-data-table-react/
 *          https://github.com/gopinav/React-Table-Tutorials/tree/master/react-table-demo/
 * 
 * Usage: Various tables rendered in 'query-tabs' subfolder
 */

// Module imports here
import { useMemo,useState } from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table'
import { CSVLink } from "react-csv";
import styled from 'styled-components';

// Component imports here
import { Button, Select } from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Checkbox } from './Checkbox';
import { GlobalFilter } from './GlobalFilter';

// Styled component declarations
const Container = styled.div`
  padding: 20px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;
const Left = styled.div`
  position: sticky
`;
const Middle = styled.div`
  position: sticky
`;
const HideColumns = styled.div`
  font-size: 20px;
  font-weight: 400;
  padding-bottom: 20px;

`;
const Dropdown = styled.div`
`;
const DropdownOptions = styled.div`
  padding: 10px;
  position: absolute;
  opacity: 1;
  width: 200px;
  border-radius: 5px;
  background-color: #F3F4F7;
  box-shadow: 0px 0px 1px -5px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 0px 1px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 1px -5px rgba(0,0,0,0.75);
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
const TableHeader = styled.th`
  border: 1px solid #687CA1;
  padding: 8px;  
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  border: 1px solid white;
  background-color: #687CA1;
  color: white;
  font-size: 22px;
  font-weight: 400;
`;
const TableHead = styled.thead`
`;
const TableBody = styled.tbody`
`;
const TableRow = styled.tr`
  font-size: 18px;
  font-weight: 300;
  text-align: center;

  &:nth-child(even) {
    background-color: #CDD3E0;
  }

  &:hover{
    background-color: #AEB8CC;
  }
`;
const TableData = styled.td`
  border: 1px solid #687CA1;
  padding: 8px;
`;
const Sort = styled.span`
`;
const Filter = styled.div`
`;
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RowsPerPage = styled.span`
  font-size: 18px;
  font-weight: 300;
  padding: 5px;
`;
const PageButtons = styled.div`
  display: flex;
  align-items: center;
`;


// Define the default Column Filter for react-table
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

/*
 * This is the main component for the Metrics Table
*/
const MetricsTable = ({ data, columns, machineName }) => {

  const defaultColumn = useMemo(() => {
    return{
      // Pass the Default Column Filter to all columns to avoid error
      Filter: DefaultColumnFilter,
    }
  },[])

  // Destructured functions and arrays provided by useTable() hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    preGlobalFilteredRows,
    state,
    setGlobalFilter,
    selectedFlatRows,
    allColumns,
    getToggleHideAllColumnsProps

  } = useTable(
    {
      columns,
      data,
      // Be sure to pass the defaultColumn option otherwise you get errors
      defaultColumn, 
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    // Section below renders checkboxes for show/hide columns functionality
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ( {getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({row}) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            )
          },
          ...columns
        ]
      })
    }
  );

  // Destructure pageIndex, pageSize & globalFilter from state
  const {pageIndex, pageSize, globalFilter} = state

  // Used to hold dropdown state
  const [expanded, setExpanded] = useState(false);

  // Function to handle change event of dropdown
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container>
      {/* Top tag holds the top bar of user inputs
        * Left: "export .csv" button
        * Middle: Global Search bar
        * Right: "Show/Hide columns" button
      */}
      <Top>
        <Left>
        <CSVLink
          data={selectedFlatRows.map((row) => row.original)}
          filename={"reprot_" + new Date().toLocaleDateString() + ".csv"}
          target="_blank"
        >
          <Button 
            style={{width: "220px"}}
            variant="outlined"
          >
            Export .csv
          </Button>
        </CSVLink>
        </Left>
        <Middle>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            filter={globalFilter}
            setFilter={setGlobalFilter}
            prefill={machineName}
          />
        </Middle>
        <HideColumns>
          <Button 
            style={{width: "220px"}}
            variant="outlined"
            endIcon={ <ExpandMoreIcon />}
            onClick={handleExpandClick}>
            Hide/Show Columns
          </Button>
          {
            expanded 
            ?
            <DropdownOptions>
                <Checkbox {...getToggleHideAllColumnsProps()}/> {' '} Toggle All
                {
                  allColumns.map(column => (
                    <Dropdown key={column.id}>
                      <label>
                        <input  type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                        {column.Header}
                      </label>
                    </Dropdown>
                  ))
                }
              </DropdownOptions>
            : null
          }
        </HideColumns>
      </Top>
      
      {/* React Table component begins here */}
      <Table {...getTableProps()}>
        {/* Render the Table's header with sort and filter functionality  */}
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader {...column.getHeaderProps()}>    
                  <Sort {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {/* Add controls for sort direction */}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ↓'
                        : ' ↑'
                      : ''}
                  </Sort>
                  {/* Render filter for each column */}
                  <Filter>
                    {column.canFilter ? column.render('Filter') : null}
                  </Filter>
                </TableHeader>   
              ))}
            </TableRow>
          ))}
        </TableHead>
        {/* Render the Table's body by mapping the data to each row  */}
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return  <TableData {...cell.getCellProps()}>{cell.render('Cell')}</TableData>
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {/* Render pagination and next/previous page controls  */}
      <Pagination>
        <RowsPerPage>
          Page{' '}
          <strong>{pageIndex + 1}</strong>
          {' '}of{' '}
          <strong>{pageOptions.length}</strong>
        </RowsPerPage>
        <PageButtons>
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {
              [10, 25, 50].map(pageSize => (
                <option key={pageSize} value={pageSize} style={{padding:"5px"}}>
                  Show {pageSize}
                </option>
              ))}
          </Select>
          <Button 
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            >
              {'<<'}
          </Button>
          <Button 
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            >
              Previous
          </Button>
          <Button 
            onClick={() => nextPage()}
            disabled={!canNextPage}
            >
              Next
          </Button>
          <Button 
            onClick={() => gotoPage(pageCount-1)}
            disabled={!canNextPage}
            >
              {'>>'}
          </Button>
        </PageButtons>
      </Pagination>
    </Container>
  )
}
export default MetricsTable