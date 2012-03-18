var monopc = new Monopc();
function Monopc(){
	if ( !(this instanceof arguments.callee) ) {
		return new Monopc();
	}

	this.server = function (a) {
		//monopd-0.9.3-Docu: Handshake, First-Way
		this.serverversion = a['version'];
		//After that Point we sould login the user by sending the .n-command
	};
	this.client = function (a) { //monopd-0.9.3-Docu: any data has to be sent after this handshake
		this.playerid = a['playerid']; //The ID of this player
		this.cookie = a['cookie']; //The Cookie for reconnects
	};

	this.players = {};
	this.playerupdate = function (a) {
		this.setattr(this.players, 'playerid', a);
		if(a.playerid == this.playerid && a.can_roll == "1" && this.autoroll ) {
			//Secret auoroll-Cheat: When autoroll is set to true, the client rolls automatically (when possible)
			send(".r");
		}
	};
	this.deleteplayer = function (a) {
		delete this.players[a['playerid']];
	};
	this.updateplayerlist = function(a) {
		if( a['type']=='full') {
			for(var e in this.players) {
				this.deleteplayer({playerid: e});
			}
		} else {
			console.warn('DEPRECATED function updateplayerlist, implemet it better!');
		}
	};

	this.updategamelist = function (a,c) {
		if(this.serverversion!='0.9.3') {  // FIXME: somehow :D
			console.warn('DEPRECATED function updategamelist, using ', (a['type']=='del') ? 'deletegame' : 'gameupdate');
			console.log(c);
			for(var i=0;i<c.length;i++){
				c[i]['gameid'] = c[i]['id'];
				if(a['type']=='del') this.deletegame(c[i]);
					else this.gameupdate(c[i]);
			}
		}
	};
	this.games = {};
	this.gametypes = {};
	this.deletegame = function (a){
		delete this.games[a['gameid']];
		monopgui.deletegame(a['gameid']);
	};
	this.gameupdate = function (a){
		if(a['gameid']=='-1') {
			this.setattr(this.games, 'gametype', a);
		} else {
			this.setattr(this.games, 'gameid', a);
			monopgui.updategame(a['gameid']);
		}
	};

	this.estates = {};
	this.estateupdate = function(a) { this.setattr(this.estates, 'estateid', a) };

	this.msg = function (a){
		//let the gui object print the (chat(message
		monopgui.printmessage(a['type'],a['playerid'],a['author'],a['value']);
	};
	//var setattr = this.setattr;
	this.setattr = function(obj,key,data) {
		for(var e in data) {
			//console.log(obj,key,data,e,data[key],data[e]);
			if(!obj[data[key]]) obj[data[key]] = {};
			obj[data[key]][e] = data[e];
		}
		/* } else {
			return (function(data) {obj[data[key]] = data});  // <3
		}*/
	};
	this.autoroll = false;
}
