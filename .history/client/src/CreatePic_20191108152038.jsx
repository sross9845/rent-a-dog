import React, { Component } from 'react';
import axios from 'axios'

class CreatePic extends Component {

    state = { 
        tokenVar: null,
        dogList: null,
        photo: [],
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
        let myPhotoArray = [...e.target.photo.value]
        this.setState({
            photo : myPhotoArray
        })
        console.log(this.state.photo)
    }

    handleClick = (event) => {
        event.preventDefault(); 
        let mypicture = event.target.photo.value
        mypicture.split()
        console.log(mypicture)
        axios.post(`/favourite/${this.props.user._id}/${event.target.name.value}/${event.target.id.value}`)
    }

    render() { 
        if (this.state.dogList) {console.log(this.state.dogList)}
        if (this.state.dogList && this.state.dogList.animals.photos > 0) {
            var mappedDogs = this.state.dogList.animals.map((ele, id) => <form onSubmit={this.handleClick} key={id}><p>{ele.name}</p>
                                                                    <input type="hidden" name="name" value={ele.name} onChange={this.handleChange}/>
                                                                    <input type="hidden" name="id" value={ele.id} onChange={this.handleChange}/>
                                                                    <input type="hidden" name="photo" value={ele.photos.map((ele) => ele.large)} onChange={this.handleChange}/>
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