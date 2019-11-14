import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {

    state = {
        email: '',
        password: '',
        favoriteBreed: '',
        image: '',
        loading: false,
        name: '',
        valueForSubmit: 'Update Info',
        id: ''
    }

    componentDidMount = () => {
        if (this.props.user) {
            axios.get(`/meet/${this.props.user._id}`)
            .then(response => {
                this.setState({
                    email: response.data.email,
                    password: this.props.user.password,
                    name: response.data.name,
                    id: this.props.user._id,
                    favoriteBreed: response.data.favoriteBreed,
                    image: response.data.photo
                })
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var myObj = {
            email: this.state.email,
            favoriteBreed: this.state.favoriteBreed,
            image: this.state.image,
            loading: false,
            name: this.state.name,
            valueForSubmit: 'Update Info',
            id: this.state.id
        } 
        if (this.state.password) {
            myObj.password = this.state.password
        }
        axios.post('/auth/edit', myObj).then( response => {
            this.setState({
                valueForSubmit: 'Profile Updated!',
                email: response.data.email,
                name: response.data.name,
                favoriteBreed: response.data.favoriteBreed
            })
            if (response.data.type === 'error') {
            }
        }).catch( err => {
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
        if (this.props.user) {
            console.log(this.props.user)
            var picture = this.props.user
        } else {
            var picture = 'Your Picture Here!'
        }
        return (
            <div className="App">
                <h1 className='title'>Hello {this.state.name}, welcome to your page</h1>
                <div className='profileForm'>
                    <h3>Here are your details to change:</h3>
                    <p>Name: {this.state.name}</p>
                    <p>Email: {this.state.email}</p>
                    <p>Favorite Breed: {this.state.favoriteBreed}</p>
                    <form onSubmit={this.handleSubmit}>
                    <hr />
                    Name: <input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder={this.props.user.name}/><br />
                    Password: <input type='password' name='password' onChange={this.handleChange} value={this.state.password} placeholder={this.props.user.password}/> <br />
                    Email: <input type='text' name='email' onChange={this.handleChange} value={this.state.email} placeholder={this.props.user.email}/> <br />
                    Favorite Breed: <input type='text' name='favoriteBreed' onChange={this.handleChange} value={this.state.favoriteBreed} placeholder={this.props.user.favoriteBreed}/> <br />
                    <hr />
                    <h3>Upload Image</h3>
                    <input type="file" name="file" placeholder="Upload an image" onChange={this.uploadImage}/>
                    <hr />
                    {/* {content} */}
                    <input type='submit' value={this.state.valueForSubmit} />
                    </form>
                </div>
            </div>
        );
    }
}

export default Profile;