import React, { Component } from 'react';
import PokemonList from './components/PokemonList.js';
import Trade from './components/Trade.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Trade />
      </div>
    );
  }
}
// <PokemonList />
export default App;
