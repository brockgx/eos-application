/*
 * Name: SidebarData.js
 * Purpose: Define the menu items for the sidebar
 *          set the title, icon and path for each item
 * 
 * Usage: imported by Sidebar.js to render the sidebar menu
 */

// Import various icon libraries from 'react-icons'
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <FaIcons.FaHome />,
  },
  {
    title: 'Query',
    path: '/query',
    icon: <FaIcons.FaDatabase />,
  },
  {
    title: 'Commands',
    path: '/command',
    icon: <FaIcons.FaTerminal />,
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
  },
]