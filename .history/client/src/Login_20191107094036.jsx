import React, { Component } from 'react';
import axios from 'axios'
class Login extends Component {
    state = { 
        email: '',
        password: '',
        message: ''
     }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then( response => {
            if (response.data.type === 'error') {
                console.log('ERROR:', response.data.message)
                // TODO: maybe put this message in state? 
            } else {
                localStorage.setItem('mernToken', response.data.token)
                this.props.liftToken(response.data)
            }
        }).catch( err => {
            //This block catches rate limiter errors
            console.log(err)
        })
    }
    render() { 
        return ( 
            <div className="Login">
                <h3>Log into your account!</h3>
                <form onSubmit={this.handleSubmit}>
                Email: <input type='text' name='email' onChange={this.handleChange} value={this.state.email} /> <br />
                Password: <input type='password' name='password' onChange={this.handleChange} value={this.state.password} /> <br />
                <input type='submit' value='Log In!' />
                </form>
            </div>
         );
    }
}
 
export default Login;