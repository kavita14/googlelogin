import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Header from './Header';
import AdminProfile from './AdminProfile';
import 'sweetalert/dist/sweetalert.css';
import SweetAlert from 'sweetalert-react';

class AdminLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      users:[],
      loginSuccess:false,
      loader:false,
    }
  }
  adminLogin() {
    var self=this;
    self.setState({loader:true})
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username === 'test' && password === 'test') {
      axios.get('/getUsers')
        .then(res => {

            self.setState({users:res.data.users})
            self.setState({loader:false,loginSuccess:true});
            //console.log("companies===",self.state.companies);
        })
        .catch(function (error) {

          self.setState({
            isActive: true,
            loader:false,
            title:'Error!',
            text:"Unable to Fetch Candidate Details!"
          });

        });
    }
    else {
      self.setState({
        isActive: true,
        loader:false,
        title:'Error!',
        text:"Incorrect Credentials!"
      });
    }

  }
  render() {
    return (
      <div id="user"><Header />
      <SweetAlert
        show={this.state.isActive}
        title={this.state.title}
        text={this.state.text}
        onConfirm={() => this.setState({ isActive: false })}
      />
      {(this.state.loader) && <div className="loading style-2"><div className="loading-wheel"></div></div>}
    {(!this.state.loginSuccess) &&   <div className="wrapper">
    <form className="form-signin">
      <h2 className="form-signin-heading">Admin login</h2>
      <input type="text" className="form-control" id="username" name="username" placeholder="User Name" /><br />
      <input type="password" className="form-control" id="password" name="password" placeholder="Password" /><br />
      <button onClick={this.adminLogin.bind(this)} className="btn btn-lg btn-primary btn-block" type="button">Login</button>
    </form>
  </div>}

  {(this.state.loginSuccess) && <AdminProfile users={this.state.users} />}
  </div>
    );
  }
}

export default AdminLogin;
