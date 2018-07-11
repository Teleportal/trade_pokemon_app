import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import HomePage from './HomePage'

class Trade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pokemons: [],
      value: 'desired',
      desired_pokemons: [],
      owned_pokemons: []
    };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCombatPower = this.handleCombatPower.bind(this)
  }

  componentWillMount() {
    
  }

   componentDidMount() {
      this.getPokemons();
  }

  getPokemons() {
    console.log('getting pokemons');
    axios.get("/desired_pokemons.json")
    .then(response => {
        console.log('desired_pokemons',response.data)
        this.setState({
            
            pokemons: response.data,
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

    console.log('filterText',filterText);
    const value = this.state.value;
    console.log('value',value);

    if (this.state.value === 'desired'){
      if (filterText.trim() === '') {
        return this.state.desired_pokemons;
      }   
      return this.state.desired_pokemons.filter((pokemon) => pokemon.species.toLowerCase().search(
          filterText.toLowerCase()) !== -1);
    } else if (this.state.value === 'owned') {
      if (filterText.trim() === '') {
        return this.state.owned_pokemons;
      }     
      return this.state.owned_pokemons.filter((pokemon) => pokemon.species.toLowerCase().search(
          filterText.toLowerCase()) !== -1);
    } 
    return [];
  }

  handleChange (){

    const last = this.state.value;
    let updated = ''
    let pokemonsList = []
    
    if (last === 'desired') {
      updated = 'owned'
      pokemonsList = this.state.owned_pokemons

    } else if (last === 'owned') {
      updated = 'desired'
      pokemonsList = this.state.desired_pokemons
    }

    console.log('updated',updated)
    
    this.setState({ value: updated, search: '',  pokemons: pokemonsList });

  }

  handleChangeSearch(event) {
    const text = event.target.value;
    this.setState({ search: text });
    // const filteredPokemons = this.filterList(text);
    this.setState({ pokemons: this.filterList(text) });
  }

  handleCombatPower(pokemon) {
    console.log(this.state )
    if (pokemon.min_cp) {
      return pokemon.min_cp
    } else if (pokemon.combat_power) {
      return pokemon.combat_power
    } 
    
    return ""
  }

  render() {

    const value  = this.state.value;
    const search  = this.state.search;
    const pokemons  = this.state.pokemons;

    return (
      <div>
        <HomePage />
        <FormGroup row>
          <TextField style={{padding: 24}}
                            id="searchInput"
                            value={search}
                            placeholder="Search trade"   
                            margin="normal"
                            onChange={this.handleChangeSearch} />
         <FormControl component="fieldset" required >
            <FormLabel component="legend" />
              <RadioGroup
                aria-label="gender"
                name="trades"
                value={value}
                onChange={this.handleChange}
              >
                <FormControlLabel value="desired" control={<Radio />} label="Desired" />
                <FormControlLabel value="owned" control={<Radio />} label="Owned" />
              </RadioGroup>
          </FormControl>
        </FormGroup>
        <List component="nav" margin="center" style={ {} } value={pokemons} >
            { 
              pokemons.map((pokemon)=>
              <ListItem  button component='a' key={pokemon.id} style={ {'borderBottom':'1px solid #0000008a'} }>

                <ListItemText primary={`${pokemon.species} - ${this.handleCombatPower(pokemon)} `} /> 
                
              </ListItem>
            )}
        </List>
      </div>
    );
  }
}

export default Trade;