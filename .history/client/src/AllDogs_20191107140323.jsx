import React, { Component } from 'react';
import axios from 'axios';

class AllDogs extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount = () => {
        axios.get('/token' => {
            
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