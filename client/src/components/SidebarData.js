import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Concept',
    path: '/concept',
    icon: <FaIcons.FaEye />,
    cName: 'nav-text'
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <FaIcons.FaHome />,
    cName: 'nav-text'
  },
  {
    title: 'Query',
    path: '/query',
    icon: <FaIcons.FaDatabase />,
    cName: 'nav-text'
  },
  {
    title: 'Commands',
    path: '/command',
    icon: <FaIcons.FaTerminal />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/home',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
]