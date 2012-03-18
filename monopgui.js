var monopgui = new Monopgui();
function Monopgui(){
	if ( !(this instanceof arguments.callee) ) {
		return new Monopgui();
	}
	
	this.chatbox = document.getElementById("chatbox");
	this.errorbox = document.getElementById("errorbox");
	this.gamelist = document.getElementById("gamelist");
	this.gamelistlines = [];
	this.deletegame = function (id){
		this.gamelistlines[id].parentNode.removeChild(this.gamelistlines[id]);
		this.gamelistlines.splice(id, 1);
	};
	this.updategame = function (id){
		//Find out whether the <li> already exists
		if (this.gamelistlines[id] !== undefined){
			//the <li> exists
		}else{
			//the <li> doesn't exist and has to be created
			this.gamelistlines[id] = document.createElement("li");
			this.gamelist.appendChild(this.gamelistlines[id]);
		}
		this.gamelistlines[id].innerHTML = monopc.games[id].name +
		//" (" + monopc.gametypes[monopc.games[id].gametype]["name"] + " " +
		" (" +
		monopc.games[id].players + " Players) - " + monopc.games[id].description;
	};
	this.printmessage = function(type, playerid, author, value){
		//TODO: write something
		if (type == "chat"){
			this.chatbox.innerHTML = "<p>&lt;" + author +  "&gt; " + value + "</p>" + this.chatbox.innerHTML;
		}else{
			this.errorbox.innerHTML = "<p><b>" + type +  "</b> " + value + "</p>" + this.errorbox.innerHTML;
		}
	};
}
