import React, { Component } from 'react';
import './App.css';
import AllDogs from './AllDogs'
import CreatePic from './CreatePic'
import Home from './Home'
import MeetDog from './MeetDog'
import Profile from './Profile'
import SavedPics from './SavedPics'

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

class App extends Component {
  
  render() { 
    return ( 
      <div>
        <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/dogs' component={AllDogs} />
        <Route exact path='/create' component={CreatePic} />
        <Route exact path='/meet/:id' component={MeetDog} />
        <Route exact path='/saved' component={SavedPics} />
        <Route exact path='/profile' component={Profile} />
        </Router>
        </div>
    );
  }
}
 
export default App;