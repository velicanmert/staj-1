import React, { useState } from 'react';
import { connect } from 'react-redux';

import './Layout.css';
import Toolbar from '../../components/navigation/toolbar/Toolbar';
import SideDrawer from '../../components/navigation/sideDrawer/SideDrawer';

// This component is kind of a higher order component since it's job is only to wrap
// other components. We do this wrapping within the App.js file.
const Layout = props => {
  const [isSideDrawerVisible, setSideDrawerVisibility] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisibility(false);
  };

  // Burada sol ustteki menu'ye basinca toggle efektini goremiyoruz. Sadece open yapabiliyoruz
  // ama close yapamiyoruz cunku sideDrawer menu'nun uzerini ortuyor. Ama ileride belki baska
  // bir yere toggle yapacak birsey koyabiliriz diye bu metodu sadece open seklinde degil, toggle
  // seklinde yazdik.
  const sideDrawerToggleHandler = () => {
    setSideDrawerVisibility(!isSideDrawerVisible);
  };

  return (
    <>
      <Toolbar
        isAuth={props.isSignedIn}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isSignedIn}
        open={isSideDrawerVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={'LayoutContent'}>{props.children}</main>
    </>
  );
};

const mapStateToProps = state => {
  const { isSignedIn } = state.auth;

  return {
    // isAuthenticated: state.auth.token !== null
    isSignedIn
  };
};

export default connect(mapStateToProps)(Layout);
