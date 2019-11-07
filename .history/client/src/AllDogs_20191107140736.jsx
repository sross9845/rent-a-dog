import React, { Component } from 'react';
import axios from 'axios';

class AllDogs extends Component {
    state = {
        tokenVar: null,
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
                <p>Hit the dogs route</p>
                {this.state.tokenVar}
            </div>
        );
    }
}

export default AllDogs;