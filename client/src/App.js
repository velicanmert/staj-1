import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
import UserInfo from './pages/UserInfo';
import Logout from './pages/Logout';
import Login from './pages/Login';
import Register from './pages/Register';
import Leave from './pages/Leave';

function App() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/home' exact component={Home} />
          <Route path='/leave' exact component={Leave} />
          <Route path='/userInfo' exact component={UserInfo} />
          <Route path='/edit' exact component={Edit} />
          <Route path='/logout' exact component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
