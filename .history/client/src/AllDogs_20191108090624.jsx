import React, { Component } from 'react';
import axios from 'axios';

class AllDogs extends Component {
    state = {
        tokenVar: null,
        dogList: null,
        singleDogId: '5',
    }

    componentDidMount = () => {
        axios.get('/token')
        .then(response => {
            this.setState({
                tokenVar: response.data
            })
            console.log(response.data)
            axios.get(`/token/${response.data._id}`)
            .then(response => {
                console.log('in this route')
                this.setState({
                    dogList: response.data
                })
            })
        })
    }

    handleClick = (event) => {
        event.preventDefault()
        axios.get(`/token/${this.state.tokenVar._id}/${this.state.singleDogId}`)
        .then(response => {
            console.log('in this route')
        })
        
    }

    render() { 
        console.log(this.state.tokenVar)
        console.log(this.state.dogList)
        if (this.state.dogList) {
            var myObj = this.state.dogList.animals.map((ele, id) => <p>{ele.name}</p>)
        } else {
            var myObj = 'loading'
        }
        return ( 
            <div>
                <p>Hit the dogs route</p>
                {myObj}
                <button onClick={this.handleClick}>find one dog</button>
            </div>
        );
    }
}

export default AllDogs;