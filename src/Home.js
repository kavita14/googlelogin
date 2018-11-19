import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';

class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div><Header /><div style={{marginTop:'50px',marginLeft:'25%'}} className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                <a href="#/adminlogin"><button className="btn-primary btn home-btn">Admin Login</button></a><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6">
                <a href="#/UserLogin"><button className="btn-primary btn home-btn">User Login</button></a><br />
                </div>
              </div>
            </div></div></div></div>
    );
  }
}

export default Home;
