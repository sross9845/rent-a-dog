import axios from 'axios';
import React from 'react';

class CompareProfile extends React.Component {

    componentDidMount = () => {
        axios.get('/counter')
        .then(response => {
            console.log(response.data)
        })
    }

    render () {
        return (
            <h1>Compare Route</h1>
        )
    }
}

export default CompareProfile