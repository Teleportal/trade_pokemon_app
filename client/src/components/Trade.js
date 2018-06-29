import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
class Trade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      all_pokemons: [],
      desired_pokemons: [],
      owned_pokemons: []
    };
  }

  componentDidMount() {
      axios.get("/pokemons.json")
      .then(response => {
          console.log('pokemons',response.data)
          this.setState({
              pokemons: response.data,
              all_pokemons: response.data
          })
          console.log(this.state);
      })
      .catch(error => console.log(error,"error"))


      axios.get("/desired_pokemons.json")
      .then(response => {
          console.log('desired_pokemons',response.data)
          this.setState({
              desired_pokemons: response.data
          })
          console.log(this.state);
      })
      .catch(error => console.log(error,"error"))

      axios.get("/owned_pokemons.json")
      .then(response => {
          console.log('owned_pokemons',response.data)
          this.setState({
              owned_pokemons: response.data
          })
          console.log(this.state);
      })
      .catch(error => console.log(error,"error"))
  }

  filterList(filterText) {
    console.log(filterText.trim() == '');
    if ( filterText.trim() == '' ) {
      return this.state.all_pokemons;
    } 
    else {
      return this.state.pokemons.filter(function(pokemon){
        return pokemon.species.toLowerCase().search(
          filterText.toLowerCase()) !== -1;
      });
    }
  };

  handleChange(event) {
    const filteredPokemons = this.filterList(event.target.value);
    this.setState({ pokemons: filteredPokemons });
  }

  
  


  render() {
    const pokemons = this.state.pokemons;
    return (
      <div>
        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search trade"   
                            margin="normal"
                            onChange={this.handleChange.bind(this)}>
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