var $score = $("#score");

var Cell = function(val) {
	/*
		empty - empty cell
		snake - snake parts
		food - food part
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
	this.input = new Vector2(0,0);
	this.food = new Food(0,0);
	this.score = 0;
	this.game_over = false;
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

Game.prototype.generateFood = function() {
	do {
		rx = Math.floor(Math.random() * this.size);
		ry = Math.floor(Math.random() * this.size);
	} while(this.grid[rx][ry].state != 'empty')
	this.food = new Food(rx,ry);
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
	this.generateFood();

	// Game Input
	var game_referance = this;
	$("body").keypress(function(e) {
		var input_referance = new Vector2(0,0);
		if(e.which == 119 || e.which == 115 || e.which == 100 || e.which == 97) {
			e.preventDefault();
		} else {
			return;
		}

		// TODO: fix a bug in movement in reverse
		input_referance.y = ((e.which == 119) - (e.which == 115));
		input_referance.x = ((e.which == 100) - (e.which == 97));
	
		game_referance.snake.direction = new Vector2(-input_referance.y, input_referance.x);

	});
}

Game.prototype.update = function() {
	var snake_x = this.snake.position.x;
	var snake_y = this.snake.position.y;
	if(snake_x < 0 || snake_y < 0 || snake_x > this.size || snake_y > this.size) {
		this.game_over = true;
		return;
	}


	for(var i=0; i < this.size; i++) {
		for(var j=0; j < this.size; j++) {
			this.grid[i][j].state = "empty";
		}
	}

	this.snake.position.add(this.snake.direction);
	this.snake.cells.splice(-1);
	this.snake.cells.splice(0, 0, new Vector2(this.snake.position.x, this.snake.position.y));

	var snake_pos = this.snake.position;
	var food_pos = this.food.position;

	for(var i = 0; i < this.snake.cells.length; i++) {
		var x = this.snake.cells[i].x;
		var y = this.snake.cells[i].y;
		this.grid[x][y].state = "snake";
		if(i > 1) {
			if(this.snake.cells[i].x == snake_pos.x && this.snake.cells[i].y == snake_pos.y) {
				this.game_over = true;
				return;
			}
		}
	}


	if(snake_pos.x == food_pos.x && snake_pos.y == food_pos.y) {
		this.snake.cells.push(new Vector2(food_pos.x, food_pos.y));
		this.generateFood();
		this.score++;
		$score.html(this.score);
	} else {
		this.grid[this.food.position.x][this.food.position.y].state = 'food';
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
				case 'food':
					color = "green";
					break;
			}
			$("#cell-"+i+"-"+j).css("background-color",color);
		}
	}
}

var Snake = function(x,y) {
	this.position = new Vector2(x,y);
	this.cells = [];
	this.cells.push(new Vector2(this.position.x, this.position.y));
	this.cells.push(new Vector2(x+1,y));
	this.cells.push(new Vector2(x+2,y));
	this.direction = new Vector2(0,1);
}

var Food = function(x,y) {
	this.position = new Vector2(x,y);
}

function main() {

	// Game
	var game = new Game(20);
	game.create();
	
	var loop = setInterval(function() {
		game.update();
		game.render();
		if(game.game_over) {
			clearInterval(loop);
			$("#final").html(game.score);
			$("#game_over").slideDown(200);
		}
	}, 200);
}

$(document).ready(function() {
	// Restart
	$("#restart").click(function() {
		$("#game_over").hide();
		$("#game").html("");
		$("#score").html("0");
		main();
	});
	main();
});