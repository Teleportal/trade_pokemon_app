import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
// import Checkbox from '@material-ui/core/Checkbox';

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import Divider from "@material-ui/core/Divider";

// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions.js';
import ProTypes from 'prop-types'

// const styles = theme => ({
//   root: {
//     display: 'flex',
//   },
//   formControl: {
//     margin: theme.spacing.unit * 3,
//   },
//   group: {
//     margin: `${theme.spacing.unit}px 0`,
//   },
// });

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
      this.getPokemons();

  }

  UNSAFE_componentWillMount() {
    this.props.fetchPosts();
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
    let value = this.state.value;
    console.log('value',value);

    if (this.state.value === 'desired'){
      if (filterText.trim() === '') {
        return this.state.desired_pokemons;
      }   
      return this.state.desired_pokemons.filter(function(pokemon){
        return pokemon.species.toLowerCase().search(
          filterText.toLowerCase()) !== -1;
      });
    } else if (this.state.value === 'owned') {
      if (filterText.trim() === '') {
        return this.state.owned_pokemons;
      }     
      return this.state.owned_pokemons.filter(function(pokemon){
        return pokemon.species.toLowerCase().search(
          filterText.toLowerCase()) !== -1;
      });
    } 
  }

  handleChange (event){

    let last = this.state.value;
    let updated = ''
    let pokemons_list = []
    
    if (last === 'desired') {
      updated = 'owned'
      pokemons_list = this.state.owned_pokemons

    } else if (last === 'owned') {
      updated = 'desired'
      pokemons_list = this.state.desired_pokemons
    }

    console.log('updated',updated)
    
    this.setState({ value: updated, search: '',  pokemons: pokemons_list });
   
    


  }

  handleChangeSearch(event) {
    const text = event.target.value;
    this.setState({ search: text });
    // const filteredPokemons = this.filterList(text);
    this.setState({ pokemons: this.filterList(text) });
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

  // login () {
  //   let email = 'my_email@gmail.com';
  //   let password = 'password';
  //   let params = {
  //       auth: { email: email, password: password }
  //     };
  //     axios
  //       .post("/user_token", params)
  //       .then(function(response) {
  //         axios.defaults.headers.common["Authorization"] =
  //           "Bearer " + response.data.jwt;
  //         localStorage.setItem("jwt", response.data.jwt);
  //         console.log('login success');
  //         console.log('jwt',response.data.jwt);
  //       })
  //       .catch(
  //         function(error) {
  //           this.errors = ["Invalid email or password."];
  //           this.email = "";
  //           this.password = "";
  //         }.bind(this)
  //       );
  // }

  // getDesiredPokemons() {
  //   let token = "Bearer " + localStorage.getItem("jwt")
  //   console.log(token)

  //   $.ajax({
  //     url: "http://localhost:3000/api/bananas",
  //     type: "GET",
  //     beforeSend: function(xhr){xhr.setRequestHeader('Authorization', token)},
  //     context: this, // Allows us to use this.setState inside success
  //     success: function (result) {
  //       console.log(result)
  //       this.setState({bananasReceived: JSON.stringify(result)})
  //     }
  //   })

  //  axios.get("/desired_pokemons.json")
  //   .then(response => {
  //       console.log('desired_pokemons',response.data)
  //       this.setState({
  //           pokemons: response.data,
  //           desired_pokemons: response.data
  //       })
  //       console.log(this.state);
  //   })
  //   .catch(error => console.log(error,"error"))
  // }

  render() {

    let value  = this.state.value;
    let search  = this.state.search;
    let pokemons  = this.state.pokemons;

    return (
      <div>
        <button onClick={()=>{this.getPokemons();}}>
          Load pokemons of the User.
        </button>
        <FormGroup row>
          <TextField style={{padding: 24}}
                            id="searchInput"
                            value={search}
                            placeholder="Search trade"   
                            margin="normal"
                            onChange={this.handleChangeSearch.bind(this)}>
          </TextField>
         <FormControl component="fieldset" required >
            <FormLabel component="legend"></FormLabel>
              <RadioGroup
                aria-label="gender"
                name="trades"
                value={value}
                onChange={this.handleChange.bind(this)}
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

                <ListItemText primary={`${pokemon.species} - ${this.hadleCombatPower(pokemon)} `} /> 
                
              </ListItem>
            )}
        </List>
      </div>
    );
  }
}

// export default Trade;

Trade.proTypes = {
  fetchPosts: ProTypes.func.isRequired,
  post: ProTypes.array.isRequired
}
const mapStateToProps = state => ({
  post: state.posts.items
});
export default connect(mapStateToProps,{ fetchPosts })(Trade);