import * as FaIcons from 'react-icons/fa';

import './search.css';

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
    <input
      className="searchBar"
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