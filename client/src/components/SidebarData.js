import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
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
  }
];
