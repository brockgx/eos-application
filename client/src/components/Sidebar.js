import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { SidebarData } from './SidebarData'

import '../styles/sidebar.css';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <IconContext.Provider value={{color: '#fff'}}>
        <ul className="sidebarList">
          {SidebarData.map((value, key) => {
            return (
              <li
                key={key}
                className="sidebarListItem"
                id={window.location.pathname === value.path
                  ? "active"
                  : ""}
                onClick={() => {
                  window.location.pathname = value.path;
                }}
                  >
                <Link to={value.path}>
                  {value.icon}
                  <span className="listItemName">{value.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </IconContext.Provider>
    </div>
  )
}

export default Sidebar
