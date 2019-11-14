import React, { Component } from 'react';
import axios from 'axios';

class MeetDog extends Component {

    state = { 
        tokenVar: null,
        dogList: null,
    }

    componentDidMount = () => {
        axios.get('/token')
        .then(response => {
            this.setState({
                tokenVar: response.data
            })
        })
        if (this.props.user) {
            axios.get(`/favourite/getuser/random/${this.props.user._id}`)
            .then(response => {
                this.setState({
                    dogList: response.data.favoriteDogs
                })
            })
        }
    }


    render() { 
        if (this.state.dogList) {
            console.log(this.state.dogList)
            var mappedDogs = this.state.dogList.map((ele, id) => <div className='ulStyle'><h3>{ele.name}</h3><ul ><li> Status: {ele.status}</li><li>Email: {ele.email}</li><li>Phone:{ele.phone}</li><li>City: {ele.city}</li><li>State: {ele.state}</li></ul></div>)
        } else {
            var mappedDogs = 'Loading Adopt Data'
        }
        return ( 
            <div>
            <br />
            <div className='adoptTitle'>
                <h2> Rent or Adopt your favorite pets today!! These dogs would absolutely love to try out a place in your home. Contact the info below and mention you are looking into the RAD adoption process. </h2>
            </div>
            <div className='adoptContainer'>
                    {mappedDogs}
            </div>
            </div>
        );
    }
}

export default MeetDog;