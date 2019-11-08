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
        return ( 
            <div>
                <p> Hit the saved pic route</p>
            </div>
        );
    }
}

export default SavedPics;