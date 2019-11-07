import React, { Component } from 'react';
import axios from 'axios';
import Token from '../../models/token';

class AllDogs extends Component {
    state = {
        tokenVar: null,
    }

    componentDidMount = () => {
        // Token.find({}, (err, token) => {
        //     if (token.)
        // })
        axios.get('/token')
        .then(response => {
            this.setState({
                tokenVar: response.data
            })
        })
    }

    render() { 
        console.log(tokenVar)
        if (this.state.tokenVar) {
            var myObj = this.state.tokenVar.token
        } else {
            var myObj = 'loading'
        }
        return ( 
            <div>
                <p>Hit the dogs route</p>
                {myObj}
            </div>
        );
    }
}

export default AllDogs;