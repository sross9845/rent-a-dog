import React, { Component } from 'react';
class CreatePic extends Component {
    state = { 

    }

    componentDidMount = () => {
        axios.get('/token')
        .then(response => {
            this.setState({
                tokenVar: response.data
            })
            console.log(response.data)
            axios.get(`/token/${response.data._id}`)
            .then(response => {
                console.log('in this route')
                this.setState({
                    dogList: response.data
                })
            })
        })
    }

    render() { 
        return ( 
            <div>
                <p> Hit the create pic route</p>
            </div>
          );
    }
}
 
export default CreatePic;