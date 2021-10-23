/*
 * Name: search.js
 * Purpose: Renders a search bar component 
 * 
 * Used by: dashboard.js for Global Filter input
 */

// Module imports here
import styled from 'styled-components';

// import icons and assets here
import * as FaIcons from 'react-icons/fa';
import SearchIcon from '../../assets/searchicon.png'

const SearchBar = styled.input`
  font-size: 20px;
  border: none;
  width: 20vw;
  border-bottom: 1px solid black;
  background-color: inherit;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: 0px 2px;
  padding: 0px 0px 5px 35px;
  margin-left: 10px;

  :focus{
    outline: none;
    border-bottom: 3px solid black;
  }
`;

const Search = ({ searchQuery, setSearchQuery }) => {

  // const history = useHistory();
  // const onSubmit = (e) => {
  //   history.push(`?s=${searchQuery}`);
  //   e.preventDefault();
  // };

  return (
    <form
      action="/"
      method="get"
      autoComplete="off"
    >
    <SearchBar
      
      value={searchQuery}
      onInput={(e) => setSearchQuery(e.target.value)}
      type="text"
      id="header-search"
      placeholder="Filter by machine name"
      name="s"
    />
    <FaIcons.FaTimes style={{color: "red", cursor: "pointer"}} onClick={(e) => setSearchQuery("")}/>

  </form>
);
};

export default Search;