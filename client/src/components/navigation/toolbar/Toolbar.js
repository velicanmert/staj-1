import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

import history from '../../../history';
// import { signIn, signOut } from '../../../store/actions';

// import Logo from '../../logo/Logo';
// import NavigationItems from '../navigationItems/NavigationItems';
import DrawerToggle from '../sideDrawer/drawerToggle/DrawerToggle';
import './Toolbar.css';

class Toolbar extends Component {
  onSignInClick = () => {
    // // this.props.signIn(this.auth.currentUser.get().getId());
    // const tempUserId = '123456';
    // this.props.signIn(tempUserId);
    //
    // Do some programmatic navigation to get the user to the root route.
    // We are forcibly routing the user to the signout page.
    history.push('/auth');
  };

  onSignOutClick = () => {
    // this.auth.signOut();
    // this.props.signOut();
    //
    // Do some programmatic navigation to get the user to the root route.
    // We are forcibly routing the user to the signout page.
    history.push('/signout');
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn) {
      //<div>I am signed in!</div>;
      return (
        <button
          className="ToolbarButton ToolbarButtonDanger"
          onClick={this.onSignOutClick}
        >
          <PersonIcon style={{ marginRight: '3px' }} />
          Sign Out
        </button>
      );
    } else {
      // <div>I am not signed in</div>;
      return (
        <button
          className="ToolbarButton ToolbarButtonSuccess"
          onClick={this.onSignInClick}
        >
          <PersonIcon style={{ marginRight: '3px' }} />
          Sign In
        </button>
      );
    }
  };

  renderSearchButton = () => {
    return (
      <div
        style={{
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '8px',
          marginLeft: '5px'
        }}
      >
        <div className="ToolbarInput">
          <input type="text" placeholder="Search something..." />
          {/* <i className="search link icon"></i> */}
          <SearchIcon style={{ opacity: '0.7' }} />
        </div>
        {/* <div className="results"></div> */}
      </div>
    );
  };

  render() {
    return (
      <header className={'Toolbar'}>
        <DrawerToggle clicked={this.props.drawerToggleClicked} />

        <nav>
          {this.renderAuthButton()}
          {this.renderSearchButton()}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps)(Toolbar);
