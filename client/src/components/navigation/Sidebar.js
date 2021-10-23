/*
 * Name: Sidebar.js
 * Purpose: Renders an interactive sidebar
 *          based on predefined menu options
 *          imported from a data file (SidebarData.js) 
 * 
 * Usage: implemented in App.js to render sidebar on every page
 */

// Module imports here
import styled from 'styled-components';

// Component imports here
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

// Import the Didebar data
import { SidebarData } from './SidebarData'

// Styled component declarations
const SidebarContainer = styled.div`
  flex: 1.5;
  background-color: #212D40;
  height: calc(100vh - 80px);
  position: sticky;
  top: 80px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 10px;

  #active{
    background-color: #687CA1;
  }
`;
const ListItem = styled.li`
  align-items: center;
  padding: 5px;
  height: 70px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 50px;

  a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 26px;
    font-weight: 500;
    display: flex;
    align-items: center;
    padding: 20px;
  }

  :hover {
    background-color: #687CA1;
  }

`;

const Title = styled.span`
  margin-left: 16px;
`;

/*
 * This is the main implementation for the Sidebar component 
*/
const Sidebar = () => {
  return (
    <SidebarContainer>
      <IconContext.Provider value={{color: '#fff'}}>
        <SidebarList>
          {SidebarData.map((value, key) => {
            return (
              <ListItem
                key={key}
                id={window.location.pathname === value.path
                  ? "active"
                  : ""}
                onClick={() => {
                  window.location.pathname = value.path;
                }}
                  >
                <Link to={value.path}>
                  {value.icon}
                  <Title>{value.title}</Title>
                </Link>
              </ListItem>
            )
          })}
        </SidebarList>
      </IconContext.Provider>
    </SidebarContainer>
  )
}
export default Sidebar