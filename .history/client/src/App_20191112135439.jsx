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
  NavLink
} from "react-router-dom";

class App extends Component {
  
  render() { 
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