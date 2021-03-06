import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Trade from './components/Trade';
import MainMenu from './components/MainMenu';

const App = () => (
  <div>
    <MainMenu />
    <Route path='/' exact component={HomePage} />
    <Route path='/homePage' exact component={HomePage} />
    <Route path='/login' exact component={Login} />
    <Route path='/trade' exact component={Trade} />


  </div>
)

export default App;
