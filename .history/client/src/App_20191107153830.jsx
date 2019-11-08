import React, { Component } from 'react';
import './App.css';
import AllDogs from './AllDogs';
import CreatePic from './CreatePic';
import Home from './Home';
import MeetDog from './MeetDog';
import Profile from './Profile';
import SavedPics from './SavedPics';
import axios from 'axios';

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
    lockedResult: '',
    
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
    return ( 
      <div>
        <Router>
        <nav><Link to='/'>HOME</Link>{' | '}<Link to='/dogs'>DOGS</Link>{' | '}<Link to='/create'>CREATE</Link>{' | '}<Link to='/saved'>SAVED</Link>{' | '}<Link to='/profile'>PROFILE</Link>{' | '}</nav>
          <Route exact path='/' component={Home} />
          <Route exact path='/dogs' component={AllDogs} />
          <Route exact path='/create' component={CreatePic} />
          <Route exact path='/meet/:id' component={MeetDog} />
          <Route exact path='/saved' component={SavedPics} />
          <Route exact path='/profile' render={(props) => <Profile {...props}/> } />
        </Router>
        </div>
    );
  }
}

export default App;