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
            var mappedDogs = this.state.dogList.map((dog, id) => <h2 key={id} className='compareNames'>{dog[0]}{' : '}{dog[1]}</h2>)
        } else {
            var mappedDogs = 'loading dog comparison'
        }
        return (
            <div className='App'>
                <h1 className='title'>Here's the all time best dogs!</h1>
                {mappedDogs}
            </div>
        )
    }
}

export default CompareProfile