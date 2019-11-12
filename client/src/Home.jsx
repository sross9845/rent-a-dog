import React, { Component } from 'react';
import Login from './Login'
import SignUp from './SignUp'
import axios from 'axios'

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
                <hr />
                <h2>About Us:</h2>
                <hr />
                <div className="homeInfo">
                <p>Here at Rent a Dog, we strive to make the adoption proccess as RAD as it can be. Click on the links above to get started. With you by our side we will give these dogs the care and love they want no matter if you rent or adopt. The Dogs page will have all the available dogs while the Create page will allow you to create a picture with the dog. Who knows, maybe you will find your best dog friend today here at Rent a Dog!</p>
                </div>
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
            <div className='App layer full '>
            <div className='homeContents'>
            <h1 className="title"><u>Rent a Dog</u></h1>
            <h3>The RADdest App Around</h3>
            {contents}
            </div>
            </div> 
        );
    }
}

export default Home;