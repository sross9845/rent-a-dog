import React, { Component } from 'react';

class SelectedDog extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        if (this.props.dog){
            var dogInfo = (
                    <div>
                        <p>{this.props.dog.animal.description}</p>
                    </div>
            )
        } 
        const emptyInfo = (
            <div>
                <p>
                Click a dog to find out more!
                </p>
            </div>
            )
        let details = this.props.dog ? dogInfo : emptyInfo
        return ( 
            <div>
                {details}
            </div>
            
         );
    }
}
 
export default SelectedDog;