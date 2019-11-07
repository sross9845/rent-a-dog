import React, { Component } from 'react';
import './App.css';
import Login from './Login'
import SignUp from './SignUp'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  state = { 
    token: '',
    user: null,
    errorMessage: '',
    lockedResult: ''
  }
  checkForLocalToken = () => {
    //look for token in local storage
    let token = localStorage.getItem('mernToken')
    if (!token || token === 'undefined'){
      //if no token remove all evidence of mernToken from localStorage and state
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      // if we find token verify it on the backend
      axios.post('/auth/me/from/token', {token})
      .then( response => {
        if (response.data.type === 'error'){
          // console.log('ERROR:', response.data.message)
          localStorage.removeItem('mernToken')
          this.setState({
            token: '',
            user: null,
            errorMessage: response.data.message
          })
        } else {
          //if verified store it back in local storage and state
          localStorage.setItem('mernToken', response.data.token)
          this.setState({
            token: response.data.token,
            user: response.data.user
          })
        }
      })
    }
  }

  componentDidMount = () => {
    this.checkForLocalToken()
  }
  liftToken = ({token, user}) => {
    this.setState({
      token,
      user
    })
  }

  logOut = () => {
    localStorage.removeItem('mernToken')
    this.setState({
      token: '',
      user: null,
    })
  }

  handleClick = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }
    axios.get('/locked/test', config)
    .then(response => {
      this.setState({
        lockedResult: response.data
      })
    })
  }
  render() { 
    let contents;
    if(this.state.user){
      contents =(
        <nav>
          <p>Hello, {this.state.user.name}</p>
          <button onClick={this.handleClick}>Test the protected route</button>
          <button onClick={this.logOut}>Log Out</button>
        </nav>
      )
    } else {
      contents = (
        <nav>
        <SignUp liftToken={this.liftToken} />
        <Login liftToken={this.liftToken} /> 
        </nav>
      )
    }
    return ( 
        <div className='App'>
          <h1>My Site</h1>
          {contents}
        </div>
    );
  }
}
 
export default App;