import { useState, useMemo } from 'react'
import { useAsyncDebounce } from 'react-table'
import styled from 'styled-components';

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  font-size: 18px;
  font-weight: inherit;
  border: none;
  width: 0%;
  border-bottom: 1px solid white;
  color: white;
  background-color: inherit;
  margin: 5px;
  &:focus{
    outline: none;
    border-bottom: 2px solid #4B5E81;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    color: red;
    opacity: 0.5;
  }
  :-ms-input-placeholder {
     color: red;
     opacity: 0.5;
  }
`;
const NumInput = styled.input`
  font-size: 18px;
  width: 30%;
  font-weight: inherit;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  background-color: inherit;
  padding: "2px";
  &:focus{
    outline: none;
    border-bottom: 2px solid #4B5E81;
  }
  
  -moz-appearance: textfield;
  appearance: textfield;
  margin: 5px; 
  
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button{
    -webkit-appearance: none;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    color: white;
    text-align: center;
    opacity: 0.6;
  }
  :-ms-input-placeholder {
     color: white;
     opacity: 0.6;
     text-align: center;
  }

`;

export const ColumnFilter = ({ column }) => {
  
  // destructure column object
  const { filterValue, setFilter} = column

  // create new value and onChange event for debouncing
  const [value, setValue] = useState(filterValue)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 500 //half a second
  )

  return (
    <Container>
      <Input 
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </Container>
  )
}

export const DateTimeColumnFilter = ({ column }) => {
  
  // destructure column object
  const { filterValue, setFilter} = column

  // create new value and onChange event for debouncing
  const [value, setValue] = useState(filterValue)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 500 //half a second
  )

  return (
    <Container>
      <Input
        type="datetime-local"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </Container>
  )
}

// Select Filter
export const SelectColumnFilter = ({column}) => {
  
  // destructure column object
  const { filterValue, setFilter, preFilteredRows, id } = column
  
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// Filter number range
// Uses two number boxes and filters rows to
// ones that have values between the two
export const NumberRangeColumnFilter = ({column}) => {
 
  // destructure column object
  const { filterValue = [], preFilteredRows, setFilter, id } = column

  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <Container >
      <NumInput
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseFloat(val, 10) : undefined,
            old[1]
          ]);
        }}
        placeholder={`Min (${min})`}
      />
      <span
      style={{
        backgroundColor: "inherit",
        color: "white",
        fontSize: "18px",
      }}>to</span>
      
      <NumInput
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseFloat(val, 10) : undefined
          ]);
        }}
        placeholder={`Max (${max})`}
      />
    </Container>
  );
}