/*
 * Name: GlobalFilter.js
 * Purpose: A global filter function to search
 *          all columns of the Metrics Tables 
 * 
 * Usage: MetricTable.js
 */

// Module imports here
import { useState } from 'react'
import { useAsyncDebounce } from 'react-table';
import styled from 'styled-components';

// Styled component declarations
const SearchContainer = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
`;
const SearchText = styled.span`
  font-size: 22px;
  font-weight: 400;
`;
const Input = styled.input`
  font-size: 20px;
  border: none;
  width: 500px;
  border-bottom: 1px solid black;
  background-color: inherit;
  margin-left:10px;
  &:focus{
    outline: none;
    border-bottom: 2px solid black;
  }
`;

/*
 * This is the component of Global Filter
*/
export const GlobalFilter = ({filter, setFilter, preGlobalFilteredRows, prefill}) => {
  
  // Variable to store value of input field
  const [value, setValue] = useState(prefill)

  // Function to handle change event of input 
  // Debounces user input (0.5 sec)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 500 //half a second
  )

  // Return number of records for input placeholder
  const count = preGlobalFilteredRows.length;

  return (
    <SearchContainer>
      <SearchText>Search: </SearchText>
      <Input 
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} records...`}
      />
    </SearchContainer>
  )
}
