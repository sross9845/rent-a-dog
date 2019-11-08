import React, { Component } from 'react';

class Profile extends Component {
    state = {
        user: null,
        email: '',
        password: '',
        favoriteBreed: '',
        photo: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    render() { 
        console.log(this.props.user)
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