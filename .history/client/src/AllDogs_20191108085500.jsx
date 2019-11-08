import React, { Component } from 'react';
import axios from 'axios';

class AllDogs extends Component {
    state = {
        tokenVar: null,
        dogList: null,
        singleDogId: '',
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
        https://api.petfinder.com/v2/animals/{id}
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
            </div>
        );
    }
}

export default AllDogs;