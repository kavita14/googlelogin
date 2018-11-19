import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class UserProfile extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {profileData} = this.props;
    return (
      <div className="container"><div className="row">

      <h3> Hello {profileData.first_name} </h3>
      <h5> You have been logged In</h5> <br />
      <h6> Email : {profileData.email} </h6>
      </div></div>
    );
  }
}

export default UserProfile;
