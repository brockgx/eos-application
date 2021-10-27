import { useState } from 'react'
import { useAsyncDebounce } from 'react-table';
import styled from 'styled-components';

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
  border-bottom: 1px solid black;
  background-color: inherit;
  margin-left:10px;
  &:focus{
    outline: none;
    border-bottom: 2px solid black;
  }
`;

export const GlobalFilter = ({filter, setFilter, preGlobalFilteredRows}) => {
  
  // create new value and onChange event for debouncing
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 500 //half a second
  )

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
