if(!process.env.C9_PORT) process.env.C9_PORT = 1337;
var io = require('socket.io').listen(process.env.C9_PORT);
io.set('log level', 1);
//io.set('origins', '127.0.0.1:*');
io.sockets.on('connection', function (cc) {
	var net = require('net');
	//var cs = net.connect(1230, 'monopd.gradator.net',  function() { //'connect' listener
	var cs = net.connect(1234, 'play.psmonopoly.com',  function() { //'connect' listener
	//var cs = net.connect(1230, '127.0.0.1',  function() { //'connect' listener
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
		//FIXME: hier sollte man irgendwie anders die verbindung zum monopd zu machen...
		cs.write(".d\n");
	});
	// oh wow git pull!
});





