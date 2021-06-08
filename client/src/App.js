import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter, Route } from 'react-router-dom';
import { Router } from 'react-router-dom';

import { authCheckState } from './store/actions/auth';
import Layout from './hoc/layout/Layout';
import history from './history';

import { onlyHighLevelRoutes, routes } from './routes';

class App extends Component {
  componentDidMount() {
    // Kullanici login oldu diyelim. Sonra EntityList sayfasina gitti. Orada browser'da refresh tusuna basip uygulamayi reload etti. Bu durumda Redux State kayboluyor. Token artik yok (yani store'da yok, localStorage'da var ama). Bu durumda kullaniciyi auto-login yapiyoruz.
    // Auto-login yaparken eger EntityList icin route render edilirse, daha henuz buradaki actionCreator sonuclanip Redux State'e token yazilmadan once EntityList render ediliyor ve server'a token olmadan request gonderiyor. O durumda da kayitlar gelmiyor tabiki. Bu durumu engellemek icin asagidaki renderRoutes metodunda conditional rendering yaptim. React router'in hemen EntityList component'i yuklemesine izin vermedim. Ilk basta sadece highLevelRoutes render ediliyor. Token redux store'a yazildiktan sonra, buradaki mapStateToProps ile bize signIn bilgisi geliyor. App component yeniden render ediliyor. Bu seger renderRoutes metodu artik EntityList component'i (yani route'u) render ediyor. Boylece EntityList server'dan request yaparken elinde token oluyor artik ve kayitlar duzgun geliyor.
    this.props.onTryAutoSignup();
  }

  // Kullanici signIn olmus mu diye kontrol edip, route'lari ona gore render ediyoruz. Buna Guarded Routes deniyor.
  renderRoutes = () => {
    // console.log('[App renderRoutes] isSignedIn: ', this.props.isSignedIn);
    return (
      <div>
          {this.props.isSignedIn ? routes : onlyHighLevelRoutes}
      </div>
    );
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: '#F2F5FA',
          height: '100%',
          minHeight: '100vh'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: '70%' }}>
            {/* <BrowserRouter> */}
            <Router history={history}>
              <Layout>{this.renderRoutes()}</Layout>
            </Router>
            {/* </BrowserRouter> */}
          </div>
        </div>
      </div>
    );
  }
}

const containerStyle = {
  // border: '1px solid rgba(34, 36, 38, 0.15)',
  // padding: '1em 1em'
};

const mapStateToProps = state => {
  const { isSignedIn } = state.auth;
  return { isSignedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// npx create-react-app gpy_client_configuration
// --------------------------------------------------
//
// npm i --save redux react-redux redux-thunk
// npm i --save axios
// npm i --save react-router-dom
// npm i --save redux-form
// npm i --save lodash
//
// ,
//   "devDependencies": {
//     "eslint-config-prettier": "^4.0.0",
//     "eslint-plugin-prettier": "^3.0.1",
//     "prettier": "^1.16.4"
//   }
//
// --------------------------------------------------
// api isminde bir json-server kuralim:
//
// Su komutu calistirip, hep enter'a bastik:
//   tan@ :/c/git/gpy_configuration_server$ npm init
//
// Boylece package.json dosyasi olustu.
// Sonra json-server kurduk:
//   tan@ :/.../gpy_configuration_server$ npm i --save json-server
//
// Boylece package.json'a su dependency eklendi:
// "dependencies": {
//   "json-server": "^0.14.2"
// }
//
// Simdi Visual Code ile api klasorunu acalim ve oraya
// db.json isminde bir dosya olusturalim.
// {
//   "features": []
// }
//
// Daha sonra package.json'daki start script'i degistirdik:
// "scripts": {
//   "start": "json-server -p 3001 -w db.json"
// },
// --------------------------------------------------
//
//

// Use for…of to iterate over the values in an iterable, like an array for example. Strings are also an iterable type, so you can use for…of on strings:
// Use for…in to iterate over the properties of an object (the object keys):
//

// Express (mern) icin:
// npm i -g express express-validator bcryptjs config gravatar jsonwebtoken mongoose request
// npm i -D nodemon concurrently
// node .\server.js
