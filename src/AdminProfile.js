import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import axios from 'axios';
import 'sweetalert/dist/sweetalert.css';
import SweetAlert from 'sweetalert-react';

class AdminProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      isActive:false,
    }
  }
  updateStatus(status,userid) {
    var self = this;
    var values= {};
    values["status"] = status;
    values["userid"] = userid;
    axios.post('/updateUserStatus',values)
      .then(res => {
          self.setState({loader:false,
            isActive: true,
            title:'Success!',
            text:"Status Updated SuccessFully",
          });
      })
      .catch(function (error) {

        self.setState({
          isActive: true,
          loader:false,
          title:'Error!',
          text:"Error While Updating Status"
        });

      });
  }
  render() {
    return (
      <div id="admin">
      <SweetAlert
        show={this.state.isActive}
        title={this.state.title}
        text={this.state.text}
        onConfirm={() => this.setState({ isActive: false })}
      />
      {(this.state.loader) && <div className="loading style-2"><div className="loading-wheel"></div></div>}
      {(this.props.users.length>0) && <div style={{paddingRight:"50px",paddingLeft:"50px",marginRight: "auto",marginLeft: "auto"}}>
           <table style={{marginTop:"50px"}} className="table table-striped table-bordered">
           <thead>
           <tr>
           <th>ID</th>
           <th>Name</th>
           <th>Email</th>
           <th>Update Status</th>
           </tr>
           </thead>
           <tbody>
           {this.props.users.map((user)=>(<tr>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.email}</td>
              <td>{(user.status === 'Active') ? <button type="button" onClick={()=>this.updateStatus('Block',user.id)} className="btn btn-primary">Block</button> : <button type="button" onClick={()=>this.updateStatus('Active',user.id)} className="btn btn-primary">UnBlock</button>}</td>
             </tr>
           ))
         }
           </tbody>
           </table>

      </div>}

      </div>
    );
  }
}

export default AdminProfile;
