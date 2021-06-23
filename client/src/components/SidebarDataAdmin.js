import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';

export const SidebarDataAdmin = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    className: 'nav-text'
  },
  {
    title: 'Leave Form',
    path: '/leave',
    icon: <AiIcons.AiOutlineForm />,
    className: 'nav-text'
  },
  {
    title: 'User Info',
    path: '/userInfo',
    icon: <FaIcons.FaUserAlt />,
    className: 'nav-text'
  },
  {
    title: 'Edit',
    path: '/edit',
    icon: <AiIcons.AiFillEdit />,
    className: 'nav-text'
  },
  {
    title: 'All Users',
    path: '/users',
    icon: <FiIcons.FiUsers />,
    className: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
    className: 'nav-text'
  }
];
