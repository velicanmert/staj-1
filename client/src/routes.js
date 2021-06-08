import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SignOut from './containers/auth/signOut/SignOut';

import MainPage from './components/mainPage/MainPage';

import EntityList from './components/entities/EntityList';
import EntityCreate from './components/entities/EntityCreate';
import EntityShow from './components/entities/EntityShow';
import EntityDelete from './components/entities/EntityDelete';
import EntityEdit from './components/entities/EntityEdit';

import ViewList from './components/views/ViewList';
import ViewCreate from './components/views/ViewCreate';
// import ViewShow from './components/views/ViewShow';
import ViewDelete from './components/views/ViewDelete';
import ViewEdit from './components/views/ViewEdit';

import FeatureCreate from './components/features/FeatureCreate';
import FeatureDelete from './components/features/FeatureDelete';
import FeatureEdit from './components/features/FeatureEdit';
// import FeatureList from './components/features/FeatureList';
import FeatureShow from './components/features/FeatureShow';

// Auth ... gibi sayfalar her zaman visit edilmeyebilir. Sadece eger kullanicilar o sayfaya gittiklerinde bunlari import edelim diye (direkt import etmek yerine), LAZY LOADING yapalim dedik.
// import Auth from './containers/Auth/Auth';
const Auth = React.lazy(() => {
  return import('./containers/auth/Auth');
});

// React.lazy kullaninca, Suspense ile wrap etmek gerekiyor.
export const routes = (
  <Suspense fallback={<p>Loading...</p>}>
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/auth" exact render={props => <Auth {...props} />}></Route>
      <Route path="/signout" exact component={SignOut} />

      <Route path="/entities" exact component={EntityList} />
      <Route path="/entities/new" exact component={EntityCreate} />
      <Route path="/entities/edit/:id" exact component={EntityEdit} />
      <Route path="/entities/delete/:id" exact component={EntityDelete} />
      <Route path="/entities/:id" exact component={EntityShow} />

      <Route path="/views" exact component={ViewList} />
      <Route path="/views/new" exact component={ViewCreate} />
      <Route path="/views/edit/:id" exact component={ViewEdit} />
      <Route path="/views/delete/:id" exact component={ViewDelete} />
      {/* <Route path="/views/:id" exact component={ViewShow} /> */}

      <Route path="/features/new" exact component={FeatureCreate} />
      <Route path="/features/edit/:id" exact component={FeatureEdit} />
      <Route path="/features/delete/:id" exact component={FeatureDelete} />
      <Route path="/features/:id" exact component={FeatureShow} />

      {/* Bilinmeyen route'lar ana sayfaya redirect edilsin: */}
      <Redirect to="/" />
    </Switch>
  </Suspense>
);

// React.lazy kullaninca, Suspense ile wrap etmek gerekiyor.
export const onlyHighLevelRoutes = (
  <Suspense fallback={<p>Loading...</p>}>
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/auth" exact render={props => <Auth {...props} />}></Route>
      <Route path="/signout" exact component={SignOut} />

      {/* Burada bilinmeyen route'lar ana sayfaya redirect edilirse eger, su sekilde bir yan etkisi oluyor: Diyelim ki EntityList sayfasinda iken kullanici browserda refresh butonuna basti. Bu durumda uygulama reload oldu ve redux state kayboldu. Uygulama yeniden yuklenirken, App component yukleniyor. Orada auto-login yapmaya calisiyorum. Bu sirada redux store'da isSignedIn=false oluyor ve bu nedenle EntityList route henuz render edilmiyor. Auto-login bittikten ve store'da isSignedIn=true olduktan hemen sonra App component rerender oluyor. Bu sefer EntityList route render ediliyor. Fakat biz bu arada asagidaki Redirect'i koyarsak, ilk seferinde hemen ana sayfaya yonlendirmis oluyoruz. Auto-login bittikten sonra artik EntityList sayfasinda degil, ana sayfada oldugumuz icin EntityList sayfasi refresh etmek yerine ana sayfaya yonlendirmis seklinde bir user experience oluyor. O nedenle cozum icin Redirect yerine, baska bir 404 yontemi olan asagidaki path attribute bulunmayan Route kullandim. */}
      {/* <Redirect to="/" /> */}

      <Route
        render={() => (
          <div style={{ padding: '1em 1em' }}>
            <h1>404: Page Not Found</h1>
            <h3>Please Sign In first.</h3>
          </div>
        )}
      />
    </Switch>
  </Suspense>
);
