import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import DeleteIcon from '@material-ui/icons/Delete';
// import ImportExportIcon from '@material-ui/icons/ImportExport'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },

});

class Trade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      allPokemons: [],
      pokemons: [],
      value: 'desired',
      desired_pokemons: [],
      owned_pokemons: [],
      target_pokemon: '',
      target_pokemons:[],
      offered_pokemon_id: '',

      nickname: '', 
      power: '', 
      pokemon_id: '',
      selected_pokemon: '',
    };

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCombatPower = this.handleCombatPower.bind(this);
    this.getTargetPokemons = this.getTargetPokemons.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleOfferedPokemon = this.handleOfferedPokemon.bind(this);

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

    axios.get("/pokemons.json")
    .then(response => {
        console.log('pokemons',response.data)
        this.setState({
            allPokemons: response.data
        })
        console.log(this.state);
    })
    .catch(error => console.log(error,"error"))
  }

  getTargetPokemons(pokemon) {
    // const urlRequest = "/pokemons/" + (pokemon.pokemon_id) + ".json?min_cp=" + (pokemon.min_cp);
    const urlRequest = `/pokemons/${pokemon.pokemon_id}.json?min_cp=${pokemon.min_cp}`;
    axios.get(urlRequest)
    .then(response => {
        console.log('target_pokemons',response.data.target_pokemons)
        this.setState({
            target_pokemons: response.data.target_pokemons,
            selected_pokemon: pokemon,
        })
    })
    .catch(error => console.log(error,"error"))
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

  handleAddButton() {
    console.log(this.state);
    console.log(localStorage);

    if (this.state.value === 'desired') {
      const params = { 
        'nickname': this.nickname, 
        'min_cp': this.state.power, 
        'pokemon_id': this.state.pokemon_id 
      };

      axios.post('/desired_pokemons.json', params)
      .then( response => {
        console.log(response.data);
      })
      .catch(error => console.log(error,"error"))
      .then(() => {
          axios.get('/desired_pokemons.json')
          .then(response => {
            console.log('myDesired',response.data)
            this.setState({pokemons:response.data});
          })
          .catch(error => console.log(error,"error"));
        }
      );
    } else if (this.state.value === 'owned') {
      const params = { 
        'nickname': this.nickname, 
        'combat_power': this.state.power, 
        'pokemon_id': this.state.pokemon_id 
      };

      axios.post('/owned_pokemons.json', params)
      .then( response => {
        console.log(response.data);
      })
      .catch(error => console.log(error,"error"))
      .then(() => {
          axios.get('/owned_pokemons.json')
          .then(response => {
            console.log('myOwned',response.data)
            this.setState({pokemons:response.data});
          })
          .catch(error => console.log(error,"error"));
        }
      );
    }

    this.setState({nickname:'',power:'',pokemon_id:''});
  }

  handleRemoveButton(event) {
    console.log(this.state);
    console.log(localStorage);
    console.log('handleRemoveButton',event)
    // console.log('pokemon_id',this.state.pokemon_id);

    const pokemonId = event;

    if (this.state.value === 'desired') {

      axios.delete(`/desired_pokemons/${pokemonId}.json`)
      .then( response => {
        console.log(response.data);
      })
      .catch(error => console.log(error,"error"))
      .then(() => {
          axios.get('/desired_pokemons.json')
          .then(response => {
            console.log('deleteDesired',response.data)
            this.setState({pokemons:response.data});
            
          })
          .catch(error => console.log(error,"error"));
        }
      );
    } else if (this.state.value === 'owned') {

      axios.delete(`/owned_pokemons/${pokemonId}.json`)
      .then( response => {
        console.log(response.data);
      })
      .catch(error => console.log(error,"error"))
      .then(() => {
          axios.get('/owned_pokemons.json')
          .then(response => {
            console.log('deleteOwned',response.data)
            this.setState({pokemons:response.data});
          })
          .catch(error => console.log(error,"error"));
        }
      );
    }

    // this.setState({nickname:'',power:'',pokemon_id:''});
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

  handleChangeInput(e) {
    console.log({[e.target.name]:e.target.value});
    this.setState({[e.target.name]:e.target.value})
  };

  handleChangeSelect(event) {
    console.log({ [event.target.name]: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOfferedPokemon() {
    console.log(this.state.offered_pokemon_id);
    console.log(this.state.selected_pokemon);

    const params = {
      'owned_pokemon_id_1': this.state.offered_pokemon_id,
      'owned_pokemon_id_2': this.state.selected_pokemon.pokemon_id,
      'status': 0,
    };

    axios.post('/offers.json', params)
    .then( response => {
      console.log(response.data);
    })
    .catch(error => console.log(error,"error"));
  }



  render() {
    // this.getPokemons();

    const { classes } = this.props;

    const value  = this.state.value;
    const search  = this.state.search;
    const pokemons  = this.state.pokemons;
    const targetPokemons  = this.state.target_pokemons;
    const allPokemons = this.state.allPokemons;
    const ownedPokemons = this.state.owned_pokemons;

    return (
      <div>
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

        <div>

          <Button variant="fab" 
                color="secondary" 
                aria-label="add" 
                className={classes.button}
                onClick={this.handleAddButton}
                >
            <AddIcon />
          </Button>
          
          <FormControl className={classes.formControl} aria-describedby="name-helper-text">
            <InputLabel htmlFor="name-helper">Nickname</InputLabel>
            <Input id="name-helper"  name='nickname' value={this.state.nickname} onChange={this.handleChangeInput}/>
            <FormHelperText id="name-helper-text">Add a cool A.K.A for your companion</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl} aria-describedby="name-helper-text">
            <InputLabel htmlFor="name-helper">Power</InputLabel>
            <Input id="name-helper"  name="power" value={this.state.power} onChange={this.handleChangeInput}/>
            <FormHelperText id="name-helper-text">Owned: Combat power, Desired: Minimun combat power</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <Select
              value={this.state.pokemon_id}
              onChange={this.handleChangeSelect}
              name="pokemon_id"
              displayEmpty
              className={classes.selectEmpty}
            >
             
              {
                allPokemons.map((pokemon)=>
                  <MenuItem key={pokemon.id} value={ pokemon.id}> 
                    {pokemon.species}  
                  </MenuItem>
                )
              }

            </Select>
            <FormHelperText>Name</FormHelperText>
          </FormControl>

        </div>     

        <List component="nav" margin="center" style={ {} } value={pokemons} >
            { 
              pokemons.map((pokemon)=>
                <div key={ pokemon.id}> 
                  <ListItem  button component='a' key={pokemon.id} style={ {'borderBottom':'1px solid #0000008a'} } onClick = {()=> this.getTargetPokemons(pokemon)}>

                  <ListItemText primary={`${pokemon.species} - ${this.handleCombatPower(pokemon)} `}  /> 

                  <Button variant="fab" 
                        color="primary" 
                        aria-label="delete" 
                        className={classes.button}
                        onClick={()=>this.handleRemoveButton(pokemon.id)}
                        >
                    <DeleteIcon className={classes.icon}  />
                  </Button>
                  
                </ListItem>
                </div>
              
            )}
        </List>

        <List component="nav" margin="center" style={ {} } value={targetPokemons} >
            { 
              targetPokemons.map((targetPokemon)=>
              <ListItem  button component='a' key={targetPokemon.id} style={ {'borderBottom':'1px solid #0000008a'} } >

                <ListItemText primary={`Trainer: ${targetPokemon.nickname} - ${this.handleCombatPower(targetPokemon)} `}  />
                { 
                  value ===  'desired' ? 
                  ( 
                    <FormControl className={classes.formControl}>
                      { 
                        this.state.offered_pokemon_id !== '' ?
                        (
                          <Button variant="outlined" color="primary" className={classes.button} onClick={()=>this.handleOfferedPokemon()}>Offer
                          </Button>
                        ) : ''
                      }
                      <Select
                        value={this.state.offered_pokemon_id}
                        onChange={this.handleChangeSelect}
                        name="offered_pokemon_id"
                        displayEmpty
                        className={classes.selectEmpty}
                      >
                        {
                          ownedPokemons.map((ownedPokemon)=>
                            <MenuItem key={ownedPokemon.id} value={ ownedPokemon.id}> 
                              {`${ownedPokemon.species} - ${this.handleCombatPower(ownedPokemon)} `}
                            </MenuItem>
                          )
                        }
                      </Select>
                      {
                        this.state.offered_pokemon_id !== '' ?
                        (
                          <h4>for {this.state.selected_pokemon.species}</h4>
                        ) : ''
                      }
                    </FormControl>
                  ) : ''
                }
                
              </ListItem>


            )}
        </List>
      </div>
    );
  }
}

Trade.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Trade);