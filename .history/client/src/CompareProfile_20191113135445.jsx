import axios from 'axios';
import React from 'react';

class CompareProfile extends React.Component {

    stat = {
        dogList: []
    }

    componentDidMount = () => {
        axios.get('/counter')
        .then(response => {
            this.setState({
                dogList: response.data
            })
        })
    }

    render () {
        if (this.state.dogList) {
            var mappedDogs = this.state.dogList.map((dog, id) => <p key={id}>{ele}</p>)
        }
        return (
            <h1>Compare Route</h1>
        )
    }
}

export default CompareProfile