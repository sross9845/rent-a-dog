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
    //Grabbing token and then grabbing full list of dogs
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
    //Takes the clicked element and displays the results of just the current clicked dog
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
            <div>
            <div className="contain">
                <DogList handleClick={this.handleDetailsClick} dogList={this.state.dogList}/>
                <SelectedDog dog={this.state.currentDog} />
            </div>
            </div>
        );
    }
}



    export default AllDogs;