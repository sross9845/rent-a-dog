import React, { Component } from 'react';
import axios from 'axios';
import DogList from './DogList'
import SelectedDog from './SelectedDog'
class AllDogs extends Component {
    state = {
        tokenVar: null,
        dogList: null,
        singleDogId: '124',
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

    handleClick = (event) => {
        event.preventDefault()
        console.log(this.state.tokenVar._id)
        axios.get(`/token/${this.state.tokenVar._id}/${this.state.singleDogId}`)
        .then(response => {
            console.log('in this route')
        })
        
    }
    

    render() { 
        console.log(this.state.tokenVar)
        console.log(this.state.dogList)
        if (this.state.dogList) {
            var myObj = this.state.dogList.animals.map((ele, id) => <p key={id}>{ele.name}</p>)
        } else {
            var myObj = 'loading'
        }
        return ( 
            <div>
                <p>Hit the dogs route</p>
                {myObj}
                <button onClick={this.handleClick}>find one dog</button>
            </div>
        

        // return ( 
        //     <div>
        //         <DogList handleClick={this.handleDetailsClick} dogList={this.state.dogList}/>
        //         <SelectedDog dog={this.state.currentDog} />
        //     </div>
        // );
    // }
}

export default AllDogs;