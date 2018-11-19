const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Technical",
  database : 'login'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const port = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, './build')));
app.use(bodyParser.json());


app.get('/getUsers',function(request,response) {
  connection.query("select * from users", function (error, results, fields) {
    if (error) throw error;
    if(results) {
       response.json({"status":"success","users":results});
    }
  });
});

app.post('/updateUserStatus', function(request,response) {
  const status = request.body.status;
  const userid = Number(request.body.userid);
  connection.query("update users set status='"+status+"' where id="+userid+"", function (error, results, fields) {
    if (error) throw error;
    if(results) {
       response.json({"status":"success","message":results});
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
      response.json({"status":"success","userdata":results[0]});
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
