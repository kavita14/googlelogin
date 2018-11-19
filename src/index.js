import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import AdminProfile from './AdminProfile';
import UserProfile from './UserProfile';
import UserLogin from './UserLogin';
import AdminLogin from './AdminLogin';
import Home from './Home';





ReactDOM.render(<div><Router>
<Switch>
  <Route exact path="/" component={Home} />
  <Route exact path="/userlogin" component={UserLogin} />
  <Route exact path="/adminlogin" component={AdminLogin} />
  <Route exact path="/userprofile" component={UserProfile} />
  <Route exact path="/adminprofile" component={AdminProfile} />
  </Switch>
  </Router>
  </div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
