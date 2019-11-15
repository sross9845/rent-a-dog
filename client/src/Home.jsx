import React, { Component } from 'react';
import SignUp from './SignUp';
import Login from './Login'

class Home extends Component {
  render () {
    let contents;
    if(this.props.user){
      contents =(
          <div className='homeInfo'>
          <p>
            Here at Rent a Dog we strive to make the adoption process as RAD as it can be. Click the dogs link if you want to see all the great dogs we have to offer. The create link is where you will be seeing what these dogs look like next to your own photo! The saved link has your favorited dogs while the adopt link shows adoption and rental info for these dogs! If you want to rent a dog contact the dogs specific adoption agency and mention our app! Hope you have a RAD time out there finding your new best friend.
          </p>
          </div>
      )
  //Conditional displaying login or signup
  } else if (this.props.login){
      contents = (
      <div className="Login">
      <Login liftToken={this.props.liftToken} /> 
      <button onClick={this.props.handleLoginClick}> Sign Up Instead!</button>
      </div>
      )
  } else {
      contents = (
          <div className="Signup">
          <SignUp liftToken={this.props.liftToken} />
          <button onClick={this.props.handleLoginClick}> Login Instead!</button>
          </div>
          )
  }
    return (
      <div className='App'>
        <h1 className="title"><u>Rent a Dog</u></h1>
        <h3>The RADdest app out there</h3>
        <br />
        <div className='homeContents'>
        {contents}
        </div>
      </div> 
    )
  }
}

export default Home;