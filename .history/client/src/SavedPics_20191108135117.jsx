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
            axios.get(`/favourites/${this.props.user._id}`)
            .then(response => {
                this.setState({
                    dogList: response.data
                })
                var mappedDogs = this.state.dogList.map((ele, id) => <p key={id}>{ele.name}</p>)
                console.log(response.data)
            })
        } else {
            var mappedDogs = 'loading'
        }
        return ( 
            <div>
                <p> Hit the saved pic route</p>
            </div>
        );
    }
}

export default SavedPics;