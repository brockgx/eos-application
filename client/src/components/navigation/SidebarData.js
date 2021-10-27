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