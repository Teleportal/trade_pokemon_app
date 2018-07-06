import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {

  
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
 }
render() {
    return (
      <div>
     
          <div>
          
           <TextField
             placeholder="Enter your Username"
             id="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               placeholder="Enter your Password"
               id="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
            
             <Button variant="contained" className={style} onClick={(event) => this.handleClick(event)}>
              Login
            </Button>
         </div>
 
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;