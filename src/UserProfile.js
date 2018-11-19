import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  { Redirect } from 'react-router-dom'


class UserProfile extends Component {
  constructor(props){
    super(props);
  }
  Logout() {
    sessionStorage.removeItem('user');
    window.location.reload();
  }
  render() {
    const {profileData} = this.props;
    return (
      <div className="container"><div className="row">

      <div className="pull-right"><h5> Hi {profileData.first_name}! </h5><button type="button" onClick={()=>this.Logout()} className="btn btn-primary">Logout</button></div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6">
          <a href="#/tab1"><button className="btn-primary btn home-btn">Tab 1</button></a><br />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6">
          <a href="#/tab2"><button className="btn-primary btn home-btn">Tab 2</button></a><br />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6">
          <a href="#/tab3"><button className="btn-primary btn home-btn">Tab 3</button></a><br />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6">
          <a href="#/tab4"><button className="btn-primary btn home-btn">Tab 4</button></a><br />
          </div>
        </div>
      </div></div>
      </div></div>
    );
  }
}

export default UserProfile;
