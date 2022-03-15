var http = require('http');
const { load, getData } = require('./utils');

load();
//create a server object:
http.createServer(function (req, res) {
  getData().then((data)=>{
    res.write(data); //write a response to the client
    res.end(); //end the response
  })
}).listen(8080); 
