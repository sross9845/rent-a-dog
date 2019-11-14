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
        valueForSubmit: 'Update Info'
    }

    componentDidMount = () => {
        if (this.props.user) {
            this.setState({
                email: this.props.user.email,
                password: this.props.user.password,
                name: this.props.user.name
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
        axios.post('/auth/edit', {
            email: this.state.email,
            password: this.state.password,
            photo: this.state.image,
            id: this.props.user._id,
            name: this.state.name
        }).then( response => {
            console.log('IN the Response after updating', response.data)
            this.setState({
                valueForSubmit: 'Profile Updated!',
                email: response.data.email,
                name: response.data.name
            })
            if (response.data.type === 'error') {
                console.log('ERROR:', response.data.message)
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
                    <h1>Hello: {this.state.name}</h1>
                    <h3>Here are your details to change:</h3>
                    <p>Name: {this.state.name}</p>
                    <p>Email: {this.state.email}</p>
                    <p>Favorite Breed: {this.state.favoriteBreed}</p>
                    <form onSubmit={this.handleSubmit}>
                    Name: <input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder={this.props.user.name}/><br />
                    Password: <input type='password' name='password' onChange={this.handleChange} value={this.state.password} placeholder={this.props.user.password}/> <br />
                    Email: <input type='text' name='email' onChange={this.handleChange} value={this.state.email} placeholder={this.props.user.email}/> <br />
                    Favorite Breed: <input type='text' name='email' onChange={this.handleChange} value={this.state.email} placeholder={this.props.user.email}/> <br />
                    <input type='submit' value={this.state.valueForSubmit} />
                    </form>
                </div>

                <h1>Upload Image</h1>
                <input type="file" name="file" placeholder="Upload an image" onChange={this.uploadImage}/>
                {content}
            </div>
        );
    }
}

export default Profile;