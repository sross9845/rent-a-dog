import React, { Component } from 'react';

class Home extends Component {
  render () {
    let contents;
    if(this.props.user){
      contents =(
          <div>
          <p>Hello, {this.props.user.name}</p>
          <button onClick={this.props.logOut}>Log Out</button>
          </div>
      )
  } else if (this.props.login){
      contents = (
      <div className="Login">
      <Login liftToken={this.props.liftToken} /> 
      <button onClick={this.props.handleLoginClick}> Sign Up Instead!</button>
      </div>
      )
  } else{
      contents = (
          <div className="Signup">
          <SignUp liftToken={this.liftToken} />
          <button onClick={this.handleLoginClick}> Login Instead!</button>
          </div>
          )
  }
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