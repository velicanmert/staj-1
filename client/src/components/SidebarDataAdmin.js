import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';

export const SidebarDataAdmin = [
  {
    title: 'Ana Sayfa',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    className: 'nav-text'
  },
  {
    title: 'İzin Girişi',
    path: '/leave',
    icon: <AiIcons.AiOutlineForm />,
    className: 'nav-text'
  },
  {
    title: 'Kullanıcı Bilgileri',
    path: '/userInfo',
    icon: <FaIcons.FaUserAlt />,
    className: 'nav-text'
  },
  {
    title: 'Kullanıcı Bilgilerini Düzenle',
    path: '/edit',
    icon: <AiIcons.AiFillEdit />,
    className: 'nav-text'
  },
  {
    title: 'Kullanıcılar',
    path: '/users',
    icon: <FiIcons.FiUsers />,
    className: 'nav-text'
  },
  {
    title: 'Çıkış',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
    className: 'nav-text'
  }
];
