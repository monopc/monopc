var monopgui = {
	chatbox: document.getElementById("chatbox"),
	gamelist: document.getElementById("gamelist"),
	gamelistlines: [],
	deletegame: function (id){
		this.gamelistlines[id].parentNode.removeChild(this.gamelistlines[id]);
		this.gamelistlines.splice(id, 1);
	},
	updategame: function (id){
		//Find out whether the <li> already exists
		if (this.gamelistlines[id] != null){
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
	},
	printmessage: function(type, playerid, author, value){
		//TODO: write something
		if (type == "chat"){
			chatbox.innerHTML = "<p>&lt;" + author +  "&gt;" + value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") + "</p>" + chatbox.innerHTML;
		}else{
			chatbox.innerHTML = "<p><b>" + type +  "</b>" + value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") + "</p>" + chatbox.innerHTML;
		}
	}
};