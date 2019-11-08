import React, { Component } from 'react';
import axios from 'axios';
import DogList from './DogList'
import SelectedDog from './SelectedDog'
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

    handleDetailsClick = (ele) => {
        console.log (ele.name)
        // const url = `https://api.petfinder.com/v2/animals/${ele.id}`
        // axios.get(url).then(response => {
        //   this.setState({
        //     currentDog: response.data
        //   })
        // })
      }
    

    render() { 
        console.log(this.state.tokenVar)
        console.log(this.state.dogList)
        
        return ( 
            <div>
           <DogList handleClick={this.handleDetailsClick} dogList={this.state.dogList}/>
           <SelectedDog dog={this.state.currentDog} />
           </div>
        );
    }
}

export default AllDogs;