import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import UserProfile from './UserProfile';
import 'sweetalert/dist/sweetalert.css';
import SweetAlert from 'sweetalert-react';
import Header from './Header';


class UserLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      profileData:{},
      loginSuccess:false,
      blockError:false,
      loader:false,
    }
  }
  responseGoogle = (response) => {
    console.log("response",response);
    //alert(JSON.stringify(response.profileObj));
    if(response.profileObj) {
      this.setState({loader:true});
    var self = this;
    var values = {};
    values["first_name"] = response.profileObj.name;
    values["last_name"] = response.profileObj.familyName;
    values["email"] = response.profileObj.email;
    axios.post('/addUser',values)
   .then(function (response) {
     if(response.data.status==='success') {

       var profileData = response.data.userdata;
       if(profileData.status === 'Active') {
         self.setState({loader:false})
       self.setState({profileData:profileData,loginSuccess:true});
     }
     else {
       self.setState({
         isActive: true,
         loader:false,
         title:'Error!',
         text:"Your Account is Blocked from Accessing this Site!"
       });
     }

     }
     if(response.data.status==='error') {
       self.setState({
         isActive: true,
         loader:false,
         title:'Error!',
         text:"Something Went Wrong While Accessing your Details"
       });

     }

       })
   .catch(function (error) {


   });

  }
  else {
    this.setState({
      isActive: true,
      loader:false,
      title:'Error!',
      text:"Unable to Fetch Details from Google"
    });

  }
}
  render() {
    return (
      <div id="user"><Header />
      <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
              <SweetAlert
                show={this.state.isActive}
                title={this.state.title}
                text={this.state.text}
                onConfirm={() => this.setState({ isActive: false })}
              />
              {(this.state.loader) && <div className="loading style-2"><div className="loading-wheel"></div></div>}
      {(this.state.loginSuccess) && <div style={{marginTop:'50px',marginLeft:'35%'}}><GoogleLogin
        clientId="175202188663-j1r8casnbfb6vhgjq4uim0iknn2o5aub.apps.googleusercontent.com"
        buttonText="Login With Google+"
        onSuccess={this.responseGoogle.bind(this)}
        onFailure={this.responseGoogle.bind(this)}
      /></div>}
      {(this.state.loginSuccess) && <UserProfile profileData={this.state.profileData} />}
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default UserLogin;
