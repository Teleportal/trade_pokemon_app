import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

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
        auth: { email, password }
      };
      axios
        .post("/user_token", params)
        .then((response) => {
          axios.defaults.headers.common.Authorization =
            `Bearer ${  response.data.jwt}`;
          localStorage.setItem("jwt", response.data.jwt);
          console.log('login success');
          console.log('jwt',response.data.jwt);
          this.props.history.push('/trade');
        })
        .catch(
          (error) => {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
            console.log('error',error);
          }
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
            
             <Button variant="contained"  onClick={ this.login } >
              Login
            </Button>
         </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired 
  }).isRequired
  // ,
  // login: PropTypes.func.isRequerid
};

export default Login;