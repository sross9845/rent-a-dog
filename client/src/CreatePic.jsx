import React, { Component } from 'react';
import axios from 'axios'

class CreatePic extends Component {

    state = { 
        tokenVar: null,
        dogList: null,
        userDetails: null,
        selectedDog: null
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
                console.log(this.props.user)
                axios.get(`/meet/${this.props.user._id}`)
                .then(response => {
                    console.log(response)
                    this.setState({
                        userDetails: response.data
                    })
                })
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

    handleSubmitClick = (event) => {
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
    handleDetailsClick = (ele) => {
        this.setState({
            selectedDog: ele
        })
    }

    render() { 
        if (this.state.userDetails) {
            if (this.state.userDetails.photo) {
            var myPhoto =(
                <>
                 <img className='userImage' src={this.state.userDetails.photo}></img>
                </>
            )
            } else{
                var myPhoto = <h1>Please Upload A Photo</h1>
            }
        } else {
            var myPhoto = 'loading'
        }
        let dogPhoto
        if (this.state.selectedDog){
            dogPhoto = <img className='dogImage' src={this.state.selectedDog.photos[0].large}></img>
        } 
        if (this.state.dogList) {
            var mappedDogs = this.state.dogList.animals.map((ele, id) => {
                if(ele.photos.length > 0) {
                    return (  
                        <div className='sideBarDiv' onClick={() => this.handleDetailsClick(ele)}>
                        <form onSubmit={this.handleSubmitClick} key={id}><p>{ele.name}</p>
                        <input type="hidden" name="name" value={ele.name} onChange={this.handleChange}/>
                        <input type="hidden" name="id" value={ele.id} onChange={this.handleChange}/>
                        <input type="hidden" name="photo" value={ele.photos[0].large} onChange={this.handleChange}/>
                        <input type="hidden" name="contactEmail" value={ele.contact.email} onChange={this.handleChange}/>
                        <input type="hidden" name="contactPhone" value={ele.contact.phone} onChange={this.handleChange}/>
                        <input type="hidden" name="status" value={ele.status} onChange={this.handleChange}/>
                        <input type="hidden" name="contactCity" value={ele.contact.address.city} onChange={this.handleChange}/>
                        <input type="hidden" name="contactState" value={ele.contact.address.state} onChange={this.handleChange}/>
                        <input type="submit" value="Favorite This Dog!"/>
                        </form>
                        </div>)}
                })

        } else {
            var mappedDogs = 'Loading'
        }
        return ( 
            <div className='layer'>
            <h1><u>Click a dog below to Create A Picture With the Dogs</u></h1>
            <br />
            <div className='contain' >
            <div className="createSidebar">
            {mappedDogs}
            </div>
            <div className='createdContainer'>
            {myPhoto}
            {dogPhoto}
            </div>
            </div>
            </div>
        );
    }
}

export default CreatePic;