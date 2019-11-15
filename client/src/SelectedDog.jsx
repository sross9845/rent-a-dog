import React, { Component } from 'react';

class SelectedDog extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        //if there is a dog display info
        if (this.props.dog){
            var dogInfo = (
                    <div className='doginfoafter'>
                        <img className="largePic" src={this.props.dog.animal.photos[0].large}></img>
                        <p>Breed: {this.props.dog.animal.breeds.primary}</p>
                        <p>Gender: {this.props.dog.animal.gender}</p>
                        <p>Size:{this.props.dog.animal.size}</p>
                    </div>
            )
        } 
        const emptyInfo = (
            <div className='doginfobefore'>
                <p>
                Click a dog to find out more!
                </p>
            </div>
            )
        let details = this.props.dog ? dogInfo : emptyInfo
        return ( 
            <div className="selected">
                {details}
            </div>
            
        );
    }
}

export default SelectedDog;