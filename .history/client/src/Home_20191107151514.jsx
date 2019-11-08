import React, { Component } from 'react';
import Login from './Login'
import SignUp from './SignUp'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class Home extends Component {
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
            <nav>
                <p>Hello, {this.state.user.name}</p>
                <button onClick={this.logOut}>Log Out</button>
            </nav>
            )
        } else if (this.state.login){
            contents = (
            <nav>
            <Login liftToken={this.liftToken} /> 
            <button onClick={this.handleLoginClick}> Sign Up Instead!</button>
            </nav>
            )
        } else{
            contents = (
                <nav>
                <SignUp liftToken={this.liftToken} />
                <button onClick={this.handleLoginClick}> Login Instead!</button>
                </nav>
                )
        }
        return ( 
            <div className='App'>
              <nav><Link to='/'>HOME</Link>{' | '}<Link to='/dogs'>DOGS</Link>{' | '}<Link to='/create'>CREATE</Link>{' | '}<Link to='/saved'>SAVED</Link>{' | '}<Link to='/profile'>PROFILE</Link>{' | '}</nav>
            <h1>Rent a Dog</h1>
            <h2>The RADdest app out there</h2>
            {contents}
            </div> 
        );
    }
}

export default Home;