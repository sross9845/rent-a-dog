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
            if (this.props.user) {
                axios.get(`/meet/${this.props.user._id}`)
            }
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
        let mypicture = event.target.photo.value.toString()
        axios.post(`/favourite/savephoto`, {
            photo: mypicture,
            userID: this.props.user._id,
            name: event.target.name.value,
            apiID: event.target.id.value, 
            status: event.target.status.value,
            contactEmail: event.target.contactEmail.value,
            contactPhone: event.target.contactPhone.value,
            contactCity: event.target.contactCity.value,
            contactState: event.target.contactState.value,
        })
    }

    render() { 
        if (this.props.user) {console.log(this.props.user)}
        if (this.state.dogList) {console.log(this.state.dogList)}
        if (this.props.user) {
            var myPhoto = <img src={this.props.user.photo}></img>
        } else {
            var myPhoto = 'loading'
        }
        if (this.state.dogList) {
            var mappedDogs = this.state.dogList.animals.map((ele, id) => {
                if(ele.photos.length > 0) {
                    return (  
                        <form onSubmit={this.handleClick} key={id}><p>{ele.name}</p>
                        <input type="hidden" name="name" value={ele.name} onChange={this.handleChange}/>
                        <input type="hidden" name="id" value={ele.id} onChange={this.handleChange}/>
                        <input type="hidden" name="photo" value={ele.photos[0].large} onChange={this.handleChange}/>
                        <input type="hidden" name="contactEmail" value={ele.contact.email} onChange={this.handleChange}/>
                        <input type="hidden" name="contactPhone" value={ele.contact.phone} onChange={this.handleChange}/>
                        <input type="hidden" name="status" value={ele.status} onChange={this.handleChange}/>
                        <input type="hidden" name="contactCity" value={ele.contact.address.city} onChange={this.handleChange}/>
                        <input type="hidden" name="contactState" value={ele.contact.address.state} onChange={this.handleChange}/>
                        <input type="submit" value="Favorite This Dog!"/>
                        </form>)}
                        console.log(ele.photos.length)
                })

        } else {
            var mappedDogs = 'Loading'
        }
        return ( 
            <div>
                <h1> Hit the create pic route</h1>
                <h3>pick a favorite Dog!</h3>
                {myPhoto}
                    {mappedDogs}
            </div>
        );
    }
}

export default CreatePic;