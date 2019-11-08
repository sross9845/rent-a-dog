import React, { Component } from 'react';
import axios from 'axios'

class CreatePic extends Component {

    state = { 
        tokenVar: null,
        dogList: null
    }

    componentDidMount = () => {
        axios.get('/token')
        .then(response => {
            this.setState({
                tokenVar: response.data
            })
            axios.get(`/token/${response.data._id}`)
            .then(response => {
                this.setState({
                    dogList: response.data
                })
            })
        })
    }

    handleClick = (event) => {
        event.preventDefault(); 

    }

    render() { 
        console.log(this.state.dogList)
        return ( 
            <div>
                <p> Hit the create pic route</p>
                <form onClick={this.handleClick}>
                    <input type="hidden" name='name' value={this.state.name}/>
                </form>
            </div>
        );
    }
}

export default CreatePic;