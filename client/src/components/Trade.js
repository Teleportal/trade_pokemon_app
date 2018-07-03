import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class Trade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pokemons: [],
      // all_pokemons: [],
      // desired: true,
      // owned: false,
      value: 'desired',
      desired_pokemons: [],
      owned_pokemons: []
    };
  }

  componentDidMount() {
      // axios.get("/pokemons.json")
      // .then(response => {
      //     console.log('pokemons',response.data)
      //     this.setState({
      //         pokemons: response.data,
      //         all_pokemons: response.data
      //     })
      //     console.log(this.state);
      // })
      // .catch(error => console.log(error,"error"))


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
    console.log('desired',this.state.value);
    console.log('owned',this.state.value);

    if(this.state.value === 'desired'){
      console.log('filter','desired_pokemons');
      if (filterText.trim() === '') {
        return this.state.desired_pokemons;
      }   
      return this.state.desired_pokemons.filter(function(pokemon){
        return pokemon.species.toLowerCase().search(
          filterText.toLowerCase()) !== -1;
      });
    } else if(this.state.value === 'owned') {
      console.log('filter','owned_pokemons');
      if (filterText.trim() === '') {
        return this.state.owned_pokemons;
      }     
      return this.state.owned_pokemons.filter(function(pokemon){
        return pokemon.species.toLowerCase().search(
          filterText.toLowerCase()) !== -1;
      });
    } 
  }

  // toggleCheck() {
  //   this.setState({search: '', desired: this.state.owned, owned: this.state.desired});
  //   this.filterList('');
  //   this.handleChange(null); 
  // }

  handleChange (event){
    this.setState({ value: event.target.value });
  };

  handleOnChange(event) {
    if (event) {
      this.setState({search: event.target.value})
    }
    const filteredPokemons = this.filterList(this.state.search);
    this.setState({ pokemons: filteredPokemons });
  }

  hadleCombatPower(pokemon){
    if (pokemon.min_cp) {
      return pokemon.min_cp
    } else if (pokemon.combat_power) {
      return pokemon.combat_power
    } else {
      return ""
    }
  }

  render() {
    const pokemons = this.state.pokemons;
    const desired = this.state.desired;
    const owned = this.state.owned;
    const search = this.state.search;

    const { classes } = this.props;

    return (
      <div>
        <FormGroup row>
          <TextField style={{padding: 24}}
                            id="searchInput"
                            value={search}
                            placeholder="Search trade"   
                            margin="normal"
                            onChange={this.handleOnChange.bind(this)}>
          </TextField>
         <FormControl component="fieldset" required >
            <FormLabel component="legend"></FormLabel>
              <RadioGroup
                aria-label="gender"
                name="trades"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
              >
                <FormControlLabel value="desired" control={<Radio />} label="Desired" />
                <FormControlLabel value="owned" control={<Radio />} label="Owned" />
              </RadioGroup>
          </FormControl>
        </FormGroup>
        <List component="nav" margin="center" style={ {} }>
            { 
              pokemons.map((pokemon)=>
              <ListItem  button component='a' key={pokemon.id} style={ {'borderBottom':'1px solid #0000008a'} }>

                <ListItemText primary={`${pokemon.species} - ${this.hadleCombatPower(pokemon)} `} /> 
                
              </ListItem>
            )}
        </List>
      </div>
    );
  }
}

export default Trade;