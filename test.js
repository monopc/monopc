var http = require('http');
var fs = require('fs');
var path = require('path');

var app = http.createServer(function (request, response) {
	var filePath = '.' + request.url;
	if (filePath == './') filePath = './test.html';

	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js': contentType = 'text/javascript'; break;
		case '.css': contentType = 'text/css'; break;
	}
	var files = ['./test.html', './monopgui.js', './monopc.js'];
	var in_files = false;
	for(var i=0; i<files.length; i++) {
		if(files[i]==filePath) in_files = true;
	}
	if (in_files) {
		fs.readFile(filePath, function(error, content) {
			if (error) {
				response.writeHead(500);
				response.end('Error loading file');
			}
			else {
				response.writeHead(200, { 'Content-Type': contentType });
				response.end(content, 'utf-8');
			}
		});
	} else {
		response.writeHead(404);
		response.end('Not found');
	};
});

var io = require('socket.io').listen(app);
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

app.listen(process.env.C9_PORT || process.env.PORT || 1337);

io.set('log level', 1);
//io.set('origins', '127.0.0.1:*');
io.sockets.on('connection', function (cc) {
	var net = require('net');
	//var cs = net.connect(1230, '127.0.0.1',  function() { //'connect' listener
	//var cs = net.connect(1234, 'play.psmonopoly.com',  function() { //'connect' listener
	var cs = net.connect(1230, 'monopd.gradator.net',  function() { //'connect' listener
		console.log('connected to monopd');
	});

	cs.on('data', function(data) {
		console.log('monopd:', data.toString());
		cc.send(data);
	});
	cs.on('end', function() {
		console.log('monopd disconnected');
		cc.disconnect();
	});

	cc.on('message', function(e){
		cs.write(e); // write to monopd
		console.log('send to monopd: ',e);
	});
	cc.on('disconnect',function(){
		console.log('Client has disconnected');
		//cs.write(".d\n");
		cs.end();
	});
});
