const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
//var mysql = require('mysql');
const pg = require('pg');

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Technical",
//   database : 'login'
// });
//
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

const config = {
    host: 'ec2-174-129-236-147.compute-1.amazonaws.com',
    user: 'hboqxxybclwxds',
    password: 'cc8c194ef44da7690155bb24bb809c91fa756fc71bc351156397b77a8c71af27',
    database: 'dadcg8tiaucmg8',
    port: 5432,
    ssl:true,
};
const client = new pg.Client(config);
client.connect(err => {
    if (err) throw err;
});

const port = process.env.PORT || 8000;
app.use(express.static(path.resolve(__dirname, './build')));
app.use(bodyParser.json());


app.get('/getUsers',function(request,response) {
  client.query("select * from users", function (error, results) {
    if (error) throw error;
    if(results) {
       response.json({"status":"success","users":results.rows});
    }
  });
});

app.post('/updateUserStatus', function(request,response) {
  const status = request.body.status;
  const userid = Number(request.body.userid);
  client.query("update users set status='"+status+"' where id="+userid+"", function (error, results) {
    if (error) throw error;
    if(results) {
       response.json({"status":"success","message":results.rows});
    }
  });
});
app.post('/addUser', function(request, response) {
  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const email = request.body.email;
  const result = {"first_name":first_name,"last_name":last_name,"email":email,"status":"Active"};

  connection.query("select * from users where email='"+email+"'", function (error, results, fields) {
    if (error) throw error;
    if(results) {
      if(results.length>0){
      response.json({"status":"success","userdata":results.rows[0]});
    }
    else {
      connection.query("insert into users(first_name,last_name,email,status) VALUES('"+first_name+"','"+last_name+"','"+email+"','Active')", function (error, results, fields) {
        if (error) throw error;
        if(results) {
           response.json({"status":"success","userdata":result});
        }
      });
    }
    }
  });
});

app.listen(port, () => console.log('Example app listening on port 5000!'));
