import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
class Trade extends Component {

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
        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search trade"   
                            margin="normal">
        </TextField>
          Desired
        <Checkbox>
        </Checkbox>
          Offered
        <Checkbox>
        </Checkbox>
        <List margin="normal" >
          
            {pokemons.map((pokemon)=><li spacing={24} style={{padding: 24}} key={pokemon.id}>{pokemon.species}</li>)}
          
        </List>
      </div>
    );
  }
}
export default Trade;