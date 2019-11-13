import React, { Component } from 'react';
import axios from 'axios'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            email: '',
            password: '',
            message: '',
            image: '',
            favoriteBreed: '',
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let myObj = {...this.state}
        axios.post('/auth/signup', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            photo: this.state.image,
            favoriteBreed: this.state.favoriteBreed
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
        data.append('file', files[0])
        data.append('upload_preset', 'PetApi')
        data.append("api_key",'679386711255381');
        axios.post('https://api.cloudinary.com/v1_1/sross9845/image/upload', data)
        .then(response => {
        this.setState({
            image: response.data.secure_url
        })
        })
    }

    render() { 

        {var content = this.state.loading ? (
            <h3>Loading...</h3>
                ) : (
            <img src={this.state.image} style={{ width: '300px' }} />
        )}

        return ( 
            <div>
                <h3>Create a new account</h3>
                <form onSubmit={this.handleSubmit}>
                Name: <input type='text' name='name' onChange={this.handleChange} value={this.state.name} /> <br />
                Email: <input type='text' name='email' onChange={this.handleChange} value={this.state.email} /> <br />
                Password: <input type='password' name='password' onChange={this.handleChange} value={this.state.password} /> <br />
                Password: <input type='text' name='favoriteBreed' onChange={this.handleChange} value={this.state.password} /> <br />
                <input type='submit' value='Sign Up!' />
                </form>

                <h1>Upload Image</h1>
                <input type="file" name="file" placeholder="Upload an image" onChange={this.uploadImage}/>
                {content}
            </div>
        );
    }
}

export default SignUp;