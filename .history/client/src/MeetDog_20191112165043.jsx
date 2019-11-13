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
            var mappedDogs = this.state.dogList.map((ele, id) => <div><div className='ulStyle'><ul ><li key={id}>{ele.name}</li><li>{ele.status}</li><li>{ele.email}</li><li>{ele.phone}</li><li>{ele.state}</li><li>{ele.city}</li></ul></div></div>)
        } else {
            var mappedDogs = 'Loading Adopt Data'
        }
        return ( 
            <div>
                <p> Adopt Your Favorite Pet!</p>
                    {mappedDogs}
            </div>
        );
    }
}

export default MeetDog;