import React from 'react';

// import Logo from '../../Logo/Logo';
import NavigationItems from '../navigationItems/NavigationItems';
import BackDrop from '../../ui/backdrop/Backdrop';
import './SideDrawer.css';

const sideDrawer = props => {
  let attachedClasses = ['SideDrawer', 'SideDrawerClose'];
  if (props.open) {
    attachedClasses = ['SideDrawer', 'SideDrawerOpen'];
  }

  // NOT: Sidedrawer acikken bir menu item'a tiklayinca sidedrawer'in kapanmasi gerekiyor. Bunun icin kolaylik olsun diye Max en distaki div'e su kismi ekledi: "onClick={props.closed}". Aslinda NavigationItems'lara gidip, oraya bir fonksiyon gecip, sadece onlara tiklandiginda sidedrawer'un kapanmasini saglamaliydi ama ugrasmamak icin bu kolay yolu secti. Su anda sidedrawer acikken orda herhangi bir yere tiklayinca kapaniyor.
  return (
    <>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={'Logo'}>
          {/* <Logo /> */}
          <span style={{ color: 'rgb(190, 73, 73)' }}>
            {/* &#10003; &#8594; &#8596; &#8597; GPY Konfigurasyon  */}
            &#8597; GPY Konfigurasyon
          </span>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
