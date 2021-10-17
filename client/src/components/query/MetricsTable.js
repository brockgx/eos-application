import { useMemo,useState } from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table'
import { ColumnData } from './ColumnData'

import '../../styles/querytable.css'
import styled from 'styled-components';

import { IconButton, Collapse, Button, Modal, Select } from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { GlobalFilter } from './GlobalFilter';
import { Checkbox } from './Checkbox';

//Sources:
//        https://blog.logrocket.com/complete-guide-building-smart-data-table-react/
//        https://github.com/learnwithparam/logrocket-smart-table
//        https://github.com/gopinav/React-Table-Tutorials/tree/master/react-table-demo/src/components

const Container = styled.div`
  padding: 20px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
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


// Define a default UI for filtering
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

const MetricsTable = ({ data }) => {
  /*
   * useMemo() hook ensures the data inst recreated on every render
   * otherwise react-table woulf think that it is receving new data on every render
   * it would attempt to calculate a lot of logic every time - affecting performance
   */
  const columns = useMemo(() => ColumnData, [])

  const defaultColumn = useMemo(() => {
    return{
      // Let's set up our default Filter UI
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
      defaultColumn, // Be sure to pass the defaultColumn option
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
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

  // destructure globalFilter from state
  const {globalFilter} = state

  // destructure pageIndex, pageSize from state
  // used for pagination
  const {pageIndex, pageSize} = state

  // Variable & function to handle dropdown
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //const firstPageRows = rows.slice(0, 20)
  return (
    
    <Container>
      <Top>
        <Left>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
        </Left>
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
          ? (
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
          )
          : (
            null
          )
        }
        </HideColumns>
      </Top>
      
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>    
                  {column.render('Header')}
                  <Sort>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ↓'
                        : ' ↑'
                      : ''}
                  </Sort>
                  <Filter>
                    {column.canFilter ? column.render('Filter') : null}
                  </Filter>
                </TableHeader>         
              ))}
            </TableRow>
          ))}
        </TableHead>
        
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
      <Pagination>
        <RowsPerPage>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </RowsPerPage>
        <PageButtons>
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {
              [10, 25, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
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
      
      <div>
        {JSON.stringify(
          {
            selectedFlatRows: selectedFlatRows.map((row) => row.original),
          },
          null,
          2
        )}
      </div>
    </Container>
  )
}

export default MetricsTable