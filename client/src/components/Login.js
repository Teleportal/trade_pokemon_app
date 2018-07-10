import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const style = {
 margin: 15,
};

class Login extends Component {

  
  constructor(props){
    super(props);
    this.state = {
      // my_email@gmail.com
      email:'',
      password:''
    };
    this.login = this.login.bind(this);
   }

 login () {
    const email = this.state.email;
    const password = this.state.password;
    console.log('email',email,'password', password)
    const params = {
        auth: { email: email, password: password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          console.log('login success');
          console.log('jwt',response.data.jwt);
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
  }



render() {
    return (
      <div>
     
          <div>
          
           <TextField
             placeholder="Enter your email"
             id="email"
             onChange = {(event) => this.setState({email: event.target.value})}
             />
           <br/>
             <TextField
               type="password"
               placeholder="Enter your password"
               id="password"
               onChange = {(event) => this.setState({password: event.target.value})}
               />
             <br/>
            
             <Button variant="contained" className = { this.style } onClick={ this.login } >
              Login
            </Button>
         </div>
 
      </div>
    );
  }
}

export default Login;