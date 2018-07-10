import React, { Component } from 'react';
// import PokemonList from './components/PokemonList.js';

import Login from './components/Login.js';
import Trade from './components/Trade.js';

import './App.css';

import { Provider } from 'react-redux';
import store from './store.js'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
         <Login />
         <Trade />
        </div>
      </Provider>
    );
  }
}
// <PokemonList />
export default App;
