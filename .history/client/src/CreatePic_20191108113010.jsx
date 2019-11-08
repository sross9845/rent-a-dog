import React, { Component } from 'react';
import axios from 'axios'

class CreatePic extends Component {

    state = { 
        tokenVar: null,
        dogList: null,
        name: '',
        id: '',
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
        let mappedDogs = this.state.dogList.map((ele, id) => <ul><li key={id}>{ele.name}</li></ul>)
        console.log(this.state.dogList)
        return ( 
            <div>
                <h1> Hit the create pic route</h1>
                pick a favorite Dog!
                <form onClick={this.handleClick}>
                    <input type="hidden" name='name' value={this.state.name}/>
                </form>
            </div>
        );
    }
}

export default CreatePic;