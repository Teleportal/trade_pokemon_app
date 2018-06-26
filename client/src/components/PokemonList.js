import React, { Component } from 'react';
import axios from 'axios';

class PokemonList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: []
    };
  }

  componentDidMount() {
      axios.get("/pokemons.json")
      .then(response => {
          console.log(response.data)
          this.setState({
              pokemons: response.data
          })
          console.log(this.state);
      })
      .catch(error => console.log(error,"error"))
  }

  render() {
    const pokemons = this.state.pokemons;
    return (
      <div>
        <h1>PokemonList</h1>
        <ul>
        {pokemons.map((pokemon)=><li key={pokemon.id}>{pokemon.species}</li>)}
        </ul>
      </div>
    );
  }
}

export default PokemonList;