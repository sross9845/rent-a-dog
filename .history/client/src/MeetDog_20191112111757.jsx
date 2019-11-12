import React, { Component } from 'react';
import axios from 'axios';

class MeetDog extends Component {

    state = { 
        tokenVar: null,
        dogList: null
    }

    componentDidMount = () => {
        axios.get('/token')
        .then(response => {
            this.setState({
                tokenVar: response.data
            })
        })
    }


    render() { 
        return ( 
            <div>
                <p> Hit the meet dog route</p>
            </div>
        );
    }
}

export default MeetDog;