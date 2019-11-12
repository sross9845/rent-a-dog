import React, { Component } from 'react';

class DogRow extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div onClick={this.props.handleDetailsClick} className="sideBarDiv">
                <p>{this.props.ele.name}</p>
            </div>
        );
    }
}

export default DogRow;