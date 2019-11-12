import React, { Component } from 'react';
import axios from 'axios';

class MeetDog extends Component {

    state = { 
        tokenVar: null,
        dogList: null,
    }

    componentDidMount = () => {
        axios.get('/token')
        .then(response => {
            this.setState({
                tokenVar: response.data
            })
        })
        if (this.props.user) {
            this.setState({
                dogListFavorited
            })
        }
    }


    render() { 
        return ( 
            <div>
                <p> Adopt Your Favorite Pet!</p>

            </div>
        );
    }
}

export default MeetDog;