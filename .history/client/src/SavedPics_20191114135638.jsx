import React, { Component } from 'react';
import axios from 'axios'

class SavedPics extends Component {

    state = { 
        tokenVar: null,
        dogList: null
    }

    componentDidMount = () => {
        axios.get('/token')
        .then(response => {
            this.setState({
                tokenVar: response.data
            })
        })
        if (this.props.user) {
            axios.get(`/favourite/getuser/random/${this.props.user._id}`)
            .then(response => {
                this.setState({
                    dogList: response.data.favoriteDogs
                })
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.id.value)
        axios.get(`/favourite/${this.props.user._id}/${event.target.id.value}`)
        .then( response => {
            this.setState({
                dogList: response.data
            })
        })
    }

    render() { 
        if (this.state.dogList) {
            var mappedDogs = this.state.dogList.map((ele, id) => <div className='container'><form onSubmit={this.handleSubmit} className='formStyle'><div><p key={id} className='dogName'>{ele.name}<br /></p></div><div><img src={ele.photo} className='imageClass'></img></div>
                                                                    <input type="hidden" name="id" value={ele._id}/>
                                                                        <div>
                                                                            <input type="submit" value="Delete" className='deleteButton'/>
                                                                        </div>
                                                                    </form></div>)
        } else {
            var mappedDogs = 'loading favourites'
        }
        return ( 
            <div>
            <h1 className='title'> View Your Favourites!</h1>
            <div className='mainContainer '>
                {mappedDogs}
            </div>
            </div>
        );
    }
}

export default SavedPics;