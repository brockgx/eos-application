import { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { ColumnData } from './ColumnData'

import '../../styles/querytable.css'
import styled from 'styled-components';

//Sources:
//        https://blog.logrocket.com/complete-guide-building-smart-data-table-react/
//        https://github.com/learnwithparam/logrocket-smart-table
//        https://github.com/gopinav/React-Table-Tutorials/tree/master/react-table-demo/src/components

const Container = styled.div`
  padding: 20px;
`;

const SysMetricsTable = ({ columns, data }) => {
  /*
   * useMemo() hook ensures the data inst recreated on every render
   * otherwise react-table woulf think that it is receving new data on every render
   * it would attempt to calculate a lot of logic every time - affecting performance
   */
  // const columns = useMemo(() => ColumnData, [])
  // const data = useMemo(() => metrics, [])

  // functions and arrays provided by useTable() hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  const firstPageRows = rows.slice(0, 10)
  return (
    <Container>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ↑'
                        : ' ↓'
                      : ' ↑↓'}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <div>Showing rows {firstPageRows.length} of {rows.length}</div>
    </Container>
  )
}

export default SysMetricsTable