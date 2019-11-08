import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    state = {
        email: '',
        password: '',
        favoriteBreed: '',
        photo: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/auth/edit', {
            email: this.state.email,
            password: this.state.password,
            favoriteBreed: this.state.favoriteBreed,
            photo: this.state.photo,
            id: this.props.user._id
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
        if (this.props.user) {
            var user = this.props.user
            console.log(user)
        }
        return ( 
            <div>
                <p> Hit the profile route</p>
                <form onSubmit={this.handleSubmit}>
                Email: <input type='text' name='email' onChange={this.handleChange} value={this.state.email} /> <br />
                Password: <input type='password' name='password' onChange={this.handleChange} value={this.state.password} /> <br />
                Favorite Breed <input type='text' name='favoriteBreed' onChange={this.handleChange} value={this.state.favoriteBreed} /> <br />
                Photo: <input type="file" name="photo" onChange={this.handleChange} value={this.state.photo}/>
                <input type='submit' value='Update Profile!' />
                </form>
            </div>
        );
    }
}

export default Profile;