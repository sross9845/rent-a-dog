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
        if (this.props.user) {
            console.log(this.props.user)
            axios.get(`/favourite/${this.props.user._id}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    dogList: response.data
                })
                console.log(`This State Dog List ${this.state.dogList}`)
            })
            console.log(`This State Dog List ${this.state.dogList}`)
        }
    }

    render() { 
        return ( 
            <div>
                <p> Hit the saved pic route</p>
            </div>
        );
    }
}

export default SavedPics;