import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Fragment } from 'react';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layouts/Navbar';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layouts/Alerts';
import setAuthToken from './utils/setAuthToken';
if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App = () =>  {
    return (
      <AuthState>
      <ContactState>
        <AlertState>
      <Router>
      <Fragment>
        <Navbar></Navbar>
        <div className="container">
          <Alerts></Alerts>
          <Switch>
            <PrivateRoute exact path='/' component={Home}></PrivateRoute>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/login' component={Login}></Route>
          </Switch>
        </div>
      </Fragment>
      </Router>
      </AlertState>
      </ContactState>
      </AuthState>
    )
}

export default App;
