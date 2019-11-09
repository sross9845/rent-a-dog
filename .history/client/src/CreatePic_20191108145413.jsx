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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (event) => {
        event.preventDefault(); 
        this.setState({
            name : event.target.name.value
        })
        console.log(this.props.user)
        axios.post(`/favourite/${this.props.user._id}/${event.target.name.value}/${event.target.id.value}`)
    }

    render() { 
        if (this.state.dogList) {console.log(this.state.dogList)}
        if (this.state.dogList) {
            var mappedDogs = this.state.dogList.animals.map((ele, id) => <form onSubmit={this.handleClick} ><p key={id}>{ele.name}</p>
                                                                    <input type="hidden" name="name" value={ele.name} onChange={this.handleChange}/>
                                                                    <input type="hidden" name="id" value={ele.photos.} onChange={this.handleChange}/>
                                                                    {/* <input type="hidden" name="photo" value={ele.id} onChange={this.handleChange}/> */}
                                                                    <input type="submit" value="Favorite This Dog!"/>
                                                                    </form>)
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