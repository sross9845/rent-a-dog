import React, { Component } from 'react';
import axios from 'axios';

class AllDogs extends Component {
    state = {
        
    }

    componentDidMount = () => {
        axios.get('/token')
        .then(response => {

        })
    }

    render() { 
        return ( 
            <div>
                <p>Hit the dogs route</p>
            </div>
        );
    }
}

export default AllDogs;