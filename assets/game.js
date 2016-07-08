var Cell = function(val) {
	/*
		empty - empty cell
		snake - snake parts
		food - food part
		wall - wall(collision)
	*/
	this.state = val;
}

var Vector2 = function(x,y) {
	this.x = x;
	this.y = y;
}

Vector2.prototype.add = function(vec2) {
	this.x += vec2.x;
	this.y += vec2.y;
}

var Game = function(size) {
	this.size = size;
	this.grid = new Array(size);
	this.snake = new Snake(size/2, size/2);
	for(var i=0; i < size; i++) {
		this.grid[i] = new Array(size);
	}

	for(var i=0; i < size; i++) {
		for(var j=0; j < size; j++) {
			if(i == this.snake.x && j == this.snake.y) {
				this.grid[i][j] = new Cell('snake');
			} else {
				this.grid[i][j] = new Cell('empty');
			}
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

Game.prototype.update = function() {
	this.snake.position.add(this.snake.direction);
	for(var i=0; i < this.size; i++) {
		for(var j=0; j < this.size; j++) {
			if(i == this.snake.position.x && j == this.snake.position.y) {
				this.grid[i][j].state = "snake";
			} else {
				this.grid[i][j].state = "empty";
			}
		}
	}
}

Game.prototype.render = function() {
	for(var i=0; i < this.size; i++) {
		for(var j=0; j < this.size; j++) {
			state = this.grid[i][j].state;
			var color = 'white';
			switch(state) {
				case 'snake':
					color = "black";
					break;
			}
			$("#cell-"+i+"-"+j).css("background-color",color);
		}
	}
}

var Snake = function(x,y) {
	this.position = new Vector2(x,y);
	this.cells = [];
	this.cells.push([x,y]);
	this.direction = new Vector2(0,1);
}

$(document).ready(function() {
	var game = new Game(20);
	game.create();
	
	var loop = setInterval(function() {
		game.update();
		game.render();
	}, 250);
});