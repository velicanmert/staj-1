import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
import UserInfo from './pages/UserInfo';

function App() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/userInfo' component={UserInfo} />
          <Route path='/edit' component={Edit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
