import React, { Component } from 'react';
import './App.css';
import AllDogs from './AllDogs';
import CreatePic from './CreatePic';
import Home from './Home';
import MeetDog from './MeetDog';
import Profile from './Profile';
import SavedPics from './SavedPics';
import axios from 'axios';
import Login from './Login'
import SignUp from './SignUp'

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";

class App extends Component {
  state = { 
    token: '',
    user: null,
    errorMessage: '',
    lockedResult: '',
    login: false,
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
    console.log('we found the home page')
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
  handleLoginClick = () => {
      if (this.state.login){
          this.setState({
              login: false
          })
      } else {
          this.setState({
              login: true
          })
      }
  }

  render() { 
    let contents;
    if(this.state.user){
      contents =(
          <div>
          <p>Hello, {this.state.user.name}</p>
          <button onClick={this.logOut}>Log Out</button>
          </div>
      )
  } else if (this.state.login){
      contents = (
      <div className="Login">
      <Login liftToken={this.liftToken} /> 
      <button onClick={this.handleLoginClick}> Sign Up Instead!</button>
      </div>
      )
  } else{
      contents = (
          <div className="Signup">
          <SignUp liftToken={this.liftToken} />
          <button onClick={this.handleLoginClick}> Login Instead!</button>
          </div>
          )
  }
    return ( 
      <div>
        <Router>
        <nav><img className='logo' src='https://i.imgur.com/cvN4hi9.png' ></img><NavLink className='navlink' to='/'>HOME</NavLink>{' | '}<NavLink className='navlink' to='/dogs'>DOGS</NavLink>{' | '}<NavLink className='navlink' to='/create'>CREATE</NavLink>{' | '}<NavLink  className='navlink' to='/saved'>SAVED</NavLink>{' | '}<NavLink  className='navlink' to='/profile'>PROFILE</NavLink>{' | '}<NavLink  className='navlink' to='/meet'>ADOPT</NavLink></nav>
          <Route exact path='/' component={Home} />
          <Route exact path='/dogs' component={AllDogs} />
          <Route exact path='/create' render={() => <CreatePic user={this.state.user}/> } />
          <Route exact path='/meet' render={() => <MeetDog user={this.state.user}/> } />
          <Route exact path='/saved' render={() => <SavedPics user={this.state.user}/> } />
          <Route exact path='/profile' render={() => <Profile user={this.state.user} liftToken={this.liftToken}/> } />
        </Router>
        </div>
    );
  }
}

export default App;