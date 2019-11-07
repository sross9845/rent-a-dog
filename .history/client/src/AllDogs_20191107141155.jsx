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
        // console.log(this.state.tokenVar)
        // if (this.state.tokenVar) {
        //     var mappedtoken = this.state.tokenVar.map((ele, id) => (
        //         <p key={id}>{ele}</p>
        //     ))
        // } else {
        //     var mappedtoken = 'loading'
        // }
        if (this.state.tokenVar) {
            var myObj = this.state.tokenVar
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