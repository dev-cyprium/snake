var Cell = function(val) {
	/*
		empty - empty cell
		snake - snake parts
		food - food part
		wall - wall(collision)
	*/
	this.state = val;
}

var Game = function(size) {
	this.size = size;
	this.grid = new Array(size);
	for(var i=0; i < size; i++) {
		this.grid[i] = new Array(size);
	}

	for(var i=0; i < size; i++) {
		for(var j=0; j < size; j++) {
			this.grid[i][j] = new Cell('empty');
		}
	}
}

Game.prototype.create = function() {
	var size = this.size;
	for(var i=0; i < size; i++) {
		for(var j=0; j < size; j++) {
			$div = $("<div>", { id: "cell-"+i+"-"+j, class: "cell" });
			$div.css("border-right","1px solid black");
			$div.css("border-bottom","1px solid black");
			if(j == 0) $div.css("border-left","1px solid black");
			if(i == 0) $div.css("border-top","1px solid black");
			$("#game").append($div);
		}
	}
}

Game.prototype.render = function() {
	for(var i=0; i < this.size; i++) {
		for(var j=0; j < this.size; j++) {
			state = this.grid[i][j].state;
			console.log("cell-"+i+"-"+j+" has state: " + state);
		}
	}
}

$(document).ready(function() {
	var game = new Game(20);
	game.create();
	game.render();
});