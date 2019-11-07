import React, { Component } from 'react';
import axios from 'axios';

class AllDogs extends Component {
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
        }).then(response => {
            axios.get(`/${response.data.token}`)
            .then(response => {
                this.setState({
                    dogList: response.data
                })
            })
        })
    }

    render() { 
        console.log(this.state.tokenVar)
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