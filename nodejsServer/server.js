var express = require('express');
var app = express.createServer();
var socket = require('socket.io');

app.configure(function(){
  app.use(express.static(__dirname + '/'));
});
//nodejs server listens to msgs on port 8080
var server = app.listen(8080);
//io sockets would address to all the web-clients talking to this nodejs server
var io = socket.listen(server);

//using node-osc library: 'npm install node-osc'
//this will also install 'osc-min'
var osc = require('node-osc');
//listening to OSC msgs to pass on to the web via nodejs
var oscServer = new osc.Server(3334, '0.0.0.0');
//sending OSC msgs to a client
var oscClient = new osc.Client('127.0.0.1', 3333);

//some web-client connects
io.sockets.on('connection', function (socket) {
	console.log("connnect");
	//msg sent whenever someone connects
	socket.emit("serverMsg",{txt:"Connected to server"});
	
	//some web-client disconnects
	socket.on('disconnect', function (socket) {
		console.log("disconnect");
	});
	
	//some web-client sents in a msg
	socket.on('clientMsg', function (data) {
		console.log(data.txt);
		//pass the msg on to the oscClient
 		var msg =  new osc.Message('/clientMsg')
 		msg.append(data.txt)
 		oscClient.send(msg)
	});
	
	//received an osc msg
	oscServer.on("message", function (msg, rinfo) {
		console.log("Message:");
		console.log(msg);
		//pass the msg on to all of the web-clients
		//msg[1] stands for the first argument received which in this case should be a string
		socket.emit("serverMsg",{txt: msg[1]});
	});
});

