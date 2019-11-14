import axios from 'axios';
import React from 'react';

class CompareProfile extends React.Component {

    state = {
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
            console.log(this.state.dogList)
            var mappedDogs = this.state.dogList.map((dog, id) => <p key={id}>{dog[0]}{dog[1]}</p>)
        } else {
            var mappedDogs = 'loading dog comparison'
        }
        return (
            <div>
                <h1>Compare Route</h1>
                {mappedDogs}
            </div>
        )
    }
}

export default CompareProfile