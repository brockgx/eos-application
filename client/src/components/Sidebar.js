import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { SidebarData } from './SidebarData'

import '../styles/sidebar.css';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <IconContext.Provider value={{color: '#fff'}}>
        <nav>
          <ul className="sidebarList">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className="sidebarListItem">
                  <Link to={item.path}>
                    {item.icon}
                    <span className="listItemName">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
      </nav>
      </IconContext.Provider>
    </div>
  )
}

export default Sidebar
