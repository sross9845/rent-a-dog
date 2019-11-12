import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {

    state = {
        email: '',
        password: '',
        favoriteBreed: '',
        image: '',
        loading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.image)
        axios.post('/auth/edit', {
            email: this.state.email,
            password: this.state.password,
            photo: this.state.image,
            id: this.props.user._id,
            name: this.state.name
        }).then( response => {
            if (response.data.type === 'error') {
                console.log('ERROR:', response.data.message)
                // TODO: maybe put this message in state? 
            } else {
                localStorage.setItem('mernToken', response.data.token)
                this.props.liftToken(response.data)
            }
        }).catch( err => {
            //This block catches rate limiter errors
            console.log(err)
        })
    }

    uploadImage = e => {
        const files = e.target.files
        const data = new FormData()
        console.log(files)
        data.append('file', files[0])
        data.append('upload_preset', 'PetApi')
        data.append("api_key",'679386711255381');
        axios.post('https://api.cloudinary.com/v1_1/sross9845/image/upload', data)
        .then(response => {
        console.log(response.data)
        this.setState({
            image: response.data.secure_url
        })
        })
    }



    render() { 
        console.log(`This PropsFor User: ${this.props.user.photo}`)
        {var content = this.state.loading ? (
            <h3>Loading...</h3>
                ) : (
            <img src={this.state.image} style={{ width: '300px' }} />
        )}
        if (this.props.user) {
            var picture = this.props.user
        } else {
            var picture = 'Your Picture Here!'
        }
        return (
            <div className="App">
                <div>
                    <p> Hit the profile route</p>
                    <form onSubmit={this.handleSubmit}>
                    Name: <input type="text" name="name" onChange={this.handleChange} value={this.state.name}/><br />
                    Password: <input type='password' name='password' onChange={this.handleChange} value={this.state.password} /> <br />
                    Email: <input type='text' name='email' onChange={this.handleChange} value={this.state.email} /> <br />
                    <input type='submit' value='Update Profile!' />
                    </form>
                </div>


                // Adding a profile picture

                    <h1>Upload Image</h1>
                    <input type="file" name="file" placeholder="Upload an image" onChange={this.uploadImage}/>
                    {content}
                    {/* <br /><br /><br /><br /><br />
                    {picture} */}
            </div>
        );
    }
}

export default Profile;