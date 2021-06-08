import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../store/actions';
import materialIcons from 'material-design-icons/iconfont/material-icons.css';

class Header extends Component {
  onSignInClick = () => {
    // this.props.signIn(this.auth.currentUser.get().getId());
    const tempUserId = '123456';
    this.props.signIn(tempUserId);
  };

  onSignOutClick = () => {
    // this.auth.signOut();
    this.props.signOut();
  };

  renderAuthButton() {
    // // Ilk versiyonda component-level-state tutmustuk. Artik
    // // this.state.isSignedIn yerine this.props.isSignedIn kullaniyoruz:
    // // if (this.state.isSignedIn === null) {
    // if (this.props.isSignedIn === null) {
    //   //<div>I do not know if we are signed in</div>;
    //   return null;
    // } else

    if (this.props.isSignedIn) {
      //<div>I am signed in!</div>;
      return (
        <button className="ui red button" onClick={this.onSignOutClick}>
          <i className="user outline icon" />
          Sign Out
        </button>
      );
    } else {
      // <div>I am not signed in</div>;
      return (
        <button className="ui green button" onClick={this.onSignInClick}>
          <i className="user icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="ui top attached menu">
          <div className="ui simple dropdown icon item">
            <i className="play icon"></i>
            <div className="menu">
              <Link to="/" className="item">
                Ana Ekran
              </Link>
              <div className="item">
                <i className="material-icons">face</i>
                <i className="dropdown icon"></i>
                <span className="text">Properties Dosyaları</span>
                <div className="menu">
                  <Link to="/views" className="item">
                    view
                  </Link>
                  <Link to="/entities" className="item">
                    entity
                  </Link>
                  <div className="item">lookup</div>
                </div>
              </div>
              <div className="item">Entity Dosyaları Üret</div>
              <div className="item">
                <i className="dropdown icon"></i>
                <span className="text">New</span>
                <div className="menu">
                  <Link to="/features" className="item">
                    Features
                  </Link>
                  <div className="item">Image</div>
                </div>
              </div>
              <Link to="/features" className="item">
                Features
              </Link>
              <div className="item">Open...</div>
              <div className="item">Save...</div>
              <div className="item">Edit Permissions</div>
              <div className="divider"></div>
              <div className="header">Export</div>
              <div className="item">Share...</div>
            </div>
          </div>

          <div className="right menu">
            <div className="item">{this.renderAuthButton()}</div>

            <div className="ui right aligned category search item">
              <div className="ui transparent icon input">
                <input
                  className="prompt"
                  type="text"
                  placeholder="Search something..."
                />
                <i className="search link icon"></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
        </div>
        {/* <div className="ui bottom attached segment">
          <p>This is a bottom section</p>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state: ', state);
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(Header);
