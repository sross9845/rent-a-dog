import React, { Component } from 'react';
import axios from 'axios'

class SavedPics extends Component {

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
            console.log(response.data)
        })
    }

    render() { 
        if (this.props.user) {
            console.log(this.props.user)
            axios.get(`/favourite/${this.props.user._id}`)
            .then(response => {
                this.setState({
                    dogList: response.data
                })
            })
        return ( 
            <div>
                <p> Hit the saved pic route</p>
                {mappedDogs}
            </div>
        );
    }
}

export default SavedPics;