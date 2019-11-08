import React, { Component } from 'react';

class Profile extends Component {
    state = {
        user: null
    }

    render() { 
        return ( 
            <div>
                <p> Hit the profile route</p>
                {this.props.user}
            </div>
        );
    }
}

export default Profile;