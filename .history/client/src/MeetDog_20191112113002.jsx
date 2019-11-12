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
            axios.get(`/favourite/getuser/random/${this.props.user._id}`)
            .then(response => {
                this.setState({
                    dogList: response.data.favoriteDogs
                })
            })
        }
    }


    render() { 
        console.log(this.state.dogList)
        console.log(this.props.user)
        return ( 
            <div>
                <p> Adopt Your Favorite Pet!</p>

            </div>
        );
    }
}

export default MeetDog;