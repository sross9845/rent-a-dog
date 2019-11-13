import React, { Component } from 'react';

class DogRow extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div onClick={this.props.handleDetailsClick} className="sideBarDiv">
                <p>{this.props.ele.name.toUpperCase()}</p>
                <img className='sidebarLogo' src={this.props.ele.photos[0].small} />
            </div>
        );
    }
}

export default DogRow;