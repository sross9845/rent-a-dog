import React, { Component } from 'react';

class SelectedDog extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        if (this.props.dog){
            var dogInfo = (
                    <div className='doginfoafter'>
                        <img className="largePic" src={this.props.dog.animal.photos[0].large}></img>
                        <p>{this.props.dog.animal.description}</p>
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