import React, { Component } from 'react';
import axios from 'axios'

class CreatePic extends Component {

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
        axios.post(`/favourites/${this.props.user._id}/${event.target.name}/${event.target.id}`)
    }

    render() { 
        if (this.state.dogList) {
            var mappedDogs = this.state.dogList.map((ele, id) => <form onClick={this.handleClick}>
                                                                    <ul><li key={id}>{ele.name}</li></ul>
                                                                    <input type="hidden" name="name" value={ele.name}/>
                                                                    <input type="hidden" name="id" value={ele.id}/>
                                                                    </form>)
            console.log(this.state.dogList)
        } else {
            var mappedDogs = 'Loading'
        }
        return ( 
            <div>
                <h1> Hit the create pic route</h1>
                <h3>pick a favorite Dog!</h3>
                    {mappedDogs}
            </div>
        );
    }
}

export default CreatePic;