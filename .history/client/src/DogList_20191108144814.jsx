import React, { Component } from 'react';
import DogRow from './DogRow'

class DogList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        if (this.props.dogList) {
            var myObj = this.props.dogList.animals.map((ele, id) => {
                if(ele.photos.length >= 0){
                    return (
                    <DogRow ele={ele} handleDetailsClick={() => this.props.handleClick(ele)}/>
                    )
                }
            })
        } else {
            var myObj = 'loading'
        }
        return ( 
            <div className="sidebar">
            {myObj}
            </div>
        );
    }
}

export default DogList;