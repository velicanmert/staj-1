import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarDataUser } from './SidebarDataUser';
import { SidebarDataAdmin } from './SidebarDataAdmin';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { SidebarData } from './SidebarData';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  if (localStorage.getItem('token')) {
    if (localStorage.getItem('isAdmin') > 0) {
      return (
        <>
          <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                  <Link to='#' className='menu-bars' onClick={showSidebar}>
                    <FaIcons.FaBars />
                  </Link>
                </li>
                {SidebarDataAdmin.map((item, index) => {
                  return (
                    <li key={index} className={item.className}>
                      <Link to={item.path} onClick={showSidebar}>
                        {item.icon}
                        <span className='title'>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
        </>
      );
    } else {
      return (
        <>
          <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                  <Link to='#' className='menu-bars' onClick={showSidebar}>
                    <FaIcons.FaBars />
                  </Link>
                </li>
                {SidebarDataUser.map((item, index) => {
                  return (
                    <li key={index} className={item.className}>
                      <Link to={item.path} onClick={showSidebar}>
                        {item.icon}
                        <span className='title'>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
        </>
      );
    }
  } else {
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars' onClick={showSidebar}>
                  <FaIcons.FaBars />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.className}>
                    <Link to={item.path} onClick={showSidebar}>
                      {item.icon}
                      <span className='title'>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
}

export default Navbar;
