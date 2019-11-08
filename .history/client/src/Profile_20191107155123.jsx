import React, { Component } from 'react';

class Profile extends Component {
    state = {
        user: null
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
                <input type='submit' value='Update Profile!' />
                </form>
                {/* {this.props.user} */}
            </div>
        );
    }
}

export default Profile;