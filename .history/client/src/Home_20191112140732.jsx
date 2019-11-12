import React, { Component } from 'react';

class Home extends Component {
  render () {
    return (
      <div className='App layer full '>
        <div className='homeContents'>
        <h1 className="title"><u>Rent a Dog</u></h1>
        <h3>The RADdest app out there</h3>
        {contents}
        </div>
      </div> 
    )
  }
}

export default Home;