import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Login',
    path: '/',
    icon: <AiIcons.AiOutlineLogin />,
    className: 'nav-text'
  },
  {
    title: 'Register',
    path: '/register',
    icon: <FaIcons.FaRegRegistered />,
    className: 'nav-text'
  }
];
