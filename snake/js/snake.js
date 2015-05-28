(function () {
  if (window.Snakes === undefined) {
    window.Snakes = {};
  }

  var Snake = Snakes.Snake = function () {
    this.dir = 'N';
    this.segments = [[10,10]];
  };

  Snake.prototype.move = function () {
    var headX = this.segments[0][0];
    var headY = this.segments[0][1];
    var newHead = [headX, headY];

    if (this.dir === 'N') {
      newHead[1] -= 1;
    } else if (this.dir === 'E') {
      newHead[0] += 1;
    } else if (this.dir === 'S') {
      newHead[1] += 1;
    } else if (this.dir === 'W') {
      newHead[0] -= 1;
    }
    this.segments.unshift(newHead);
    this.segments.pop();
  };

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  };

  var Board = Snakes.Board = function () {
    this.snake = new Snake();
    this.grid = new Array(20);
    for (var i = 0; i < this.grid.length; i ++) {
      this.grid[i] = new Array(20);
    }
  };

  Board.prototype.render = function () {
    var snakeString = "";
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if (this.snake.segments.indexOf([i, j])) {
          snakeString += "S";
        } else {
          snakeString += ".";
        }
      }
      snakeString += "\n";
    }
    return snakeString;
  };

  var Game = Snakes.Game = function () {
    this.board = new Board();
  };

  // Game.prototype.start = function () {
  //   var game = this;
  //   setInterval(function () {
  //     game.board.snake.move;
  //     game.board.
  //   }, 1000)();
  // };

  Game.prototype.grow = function () {};

  module.exports = Snake;
  module.exports = Board;
  module.exports = Game;
})();
