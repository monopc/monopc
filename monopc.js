
var monopc = {
	server: function (a) {
		//monopd-0.9.3-Docu: Handshake, First-Way
		//for(e in a) console.log("monopc.server - ", e, ": ", a[e]);
		this.version = a['version'];
		//After that Point we sould login the user by sending the .n-command
	},
	client: function (a) {
		//monopd-0.9.3-Docu: any data has to be sent after this handshake
		this.playerid = a['playerid']; //The ID of this player
		this.cookie = a['cookie']; //THe Cookie for reconnects
	},
	players : [],
	playerupdate: function(a) {
		this.players[a['playerid']] = {
			name: a['name'],
			game: a['game']
		}; //We genrate a list players, keys are the IDs, game=-1 means not in a game
	},
	deleteplayer: function (a){
		this.players.splice(a['playerid'], 1);
	},
	updategamelist: function (a,c) {
		if(this.version!='0.9.3') {  // FIXME: somehow :D
			console.warn('DEPRECATED function updategamelist, using ', (a['type']=='del') ? 'deletegame' : 'gameupdate');
			console.log(c);
			for(var i=0;i<c.length;i++){
				c[i]['gameid'] = c[i]['id'];
				if(c[i]['type']=='del') this.deletegame(c[i]);
					else this.gameupdate(c[i]);
			}
		}
	},
	games: [],
	gametypes: [],
	deletegame: function (a){
		this.games.splice(a['gameid'], 1);
	},
	gameupdate: function (a){
		if(a['gameid']=='-1') {
			this.gametypes[this.gametypes.length] = {
				gametype: a['gametype'],
				name: a['name'],
				description: a['description']
			};
		} else {
			this.games[a['gameid']] = {
				gametype: a['gametype'],
				name: a['name'],
				description: a['description']
			};
		}
	},
	foo: 'bar'
}