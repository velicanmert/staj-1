import React from 'react';

import NavigationItem from './navigationItem/NavigationItem';
import './NavigationItems.css';

const navigationItems = props => (
  <ul className={'NavigationItems'}>
    <NavigationItem link="/" exact>
      Ana Ekran
    </NavigationItem>

    {props.isAuthenticated ? (
      <>
        <NavigationItem link="/entities">Entity</NavigationItem>
        <NavigationItem link="/views">View</NavigationItem>
        <NavigationItem link="/features">Lookup</NavigationItem>
      </>
    ) : null}

    {props.isAuthenticated ? (
      <NavigationItem link="/signout">Sign Out</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Sign In</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
