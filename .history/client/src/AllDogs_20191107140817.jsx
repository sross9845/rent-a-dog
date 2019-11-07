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
        let mappedtoken = this.state.tokenVar.map((ele, id) => {
            <p key={id}>{ele}</p>
        })
        return ( 
            <div>
                <p>Hit the dogs route</p>
                {mappedtoken}
            </div>
        );
    }
}

export default AllDogs;