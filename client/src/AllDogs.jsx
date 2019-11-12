import React, { Component } from 'react';
import axios from 'axios';
import DogList from './DogList'
import SelectedDog from './SelectedDog'

// YES THERE IS

class AllDogs extends Component {
    state = {
        tokenVar: null,
        dogList: null,
        currentDog: null
    }

    componentDidMount = () => {
        axios.get('/token')
        .then(response => {
            this.setState({
                tokenVar: response.data
            })
            axios.get(`/token/${response.data._id}`)
            .then(response => {
                console.log('in this route')
                this.setState({
                    dogList: response.data
                })
            })
        })
    }

    handleDetailsClick = (ele) => {
        axios.get(`/token/${this.state.tokenVar._id}/${ele.id}`)
        .then(response => {
            this.setState({
                currentDog: response.data
            })
        })
    }
    

    render() { 
        return ( 
            <div className="contain layer">
                <DogList handleClick={this.handleDetailsClick} dogList={this.state.dogList}/>
                <SelectedDog dog={this.state.currentDog} />
            </div>
        );
    }
}



    export default AllDogs;