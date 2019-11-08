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
        console.log(this.props.user)
        this.setState({
            [event.target.name] : event.target.value
        })
        console.log(this.state.name)
        axios.post(`/favourite/${this.props.user._id}/${event.target.name}/${event.target.id}`)
    }

    render() { 
        if (this.state.dogList) {
            console.log(this.state.dogList.animals)
            console.log(this.props.user)
            var mappedDogs = this.state.dogList.animals.map((ele, id) => <form onClick={this.handleClick}>
                                                                    <p key={id}>
                                                                    <input type="hidden" name="name" value={ele.name}/>{ele.name}
                                                                    <input type="hidden" name="id" value={ele.id}/>
                                                                    <input type="submit" value="Favorite This Dog!"/>
                                                                    </p>
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