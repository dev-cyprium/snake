var Cell = function(val) {
	/*
		cell - empty cell
		snake - snake parts
		food - food part
		wall - wall(collision)
	*/
	this.val = val;
}

var Game = function(size) {
	this.size = size;
	this.grid = new Array(size);
	for(var i=0; i < size; i++) {
		grid[i] = new Array(size);
	}
}

Game.prototype.render = function() {
	for(var i=0; i < size; i++) {
		for(var j=0; j < size; j++) {

		}
	}
}


$(document).ready(function() {
	
});