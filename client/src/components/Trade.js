import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

class Trade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pokemons: [],
      all_pokemons: [],
      check: true,
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
    else if(this.state.check){
      return this.state.desired_pokemons.filter(function(pokemon){
        return pokemon.species.toLowerCase().search(
          filterText.toLowerCase()) !== -1;
      });
    } else {
      return this.state.owned_pokemons.filter(function(pokemon){
        return pokemon.species.toLowerCase().search(
          filterText.toLowerCase()) !== -1;
      });
    }
    
  }

  toggleCheck() {
    this.setState({
      check: !this.state.check
    });
    this.handleChange(null);
  }

  handleChange(event) {
    if (event) {
      this.setState({search: event.target.value})
    }
    const filteredPokemons = this.filterList(this.state.search);
    this.setState({ pokemons: filteredPokemons });
  }

  render() {
    const pokemons = this.state.pokemons;
    const check = this.state.check;
    const search = this.state.search;

    return (
      <div>
        <TextField style={{padding: 24}}
                            id="searchInput"
                            value={search}
                            placeholder="Search trade"   
                            margin="normal"
                            onChange={this.handleChange.bind(this)}>
        </TextField>
          Desired
        <Checkbox checked={check} onClick={this.toggleCheck.bind(this)}>
        </Checkbox>
          Offered
        <Checkbox checked={!check} onClick={this.toggleCheck.bind(this)}>
        </Checkbox>
        <List component="nav" margin="center" style={ {} }>
            { 
              pokemons.map((pokemon)=>
              <ListItem  button component='a' key={pokemon.id} style={ {'borderBottom':'1px solid #0000008a'} }>
                <ListItemText primary={pokemon.species} /> 
              </ListItem>
            )}
        </List>
      </div>
    );
  }
}

export default Trade;