// var Board = require("./snake.js");
// var Snake = require("./snake.js");
// var Coord = require("./snake.js");

(function () {
  if (window.Snakes === undefined) {
    window.Snakes = {};
  }

  var Snake = Snakes.Snake = function () {
    this.dir = 'N';
    this.segments = [[5,10]];
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
    this.grid = new Array(10);
    for (var i = 0; i < this.grid.length; i ++) {
      this.grid[i] = new Array(20);
    }
  };

  var includesArray = function (arrArray, arr) {
    for (var i = 0; i < arrArray.length; i++) {
      if (arrArray[0] === arr[0] && arrArray[1] === arr[1]) {
        return true;
      }
    }

    return false;
  }

  Board.prototype.render = function () {
    var snakeString = "";
    for (var i = 0; i < this.grid.length; i++) {
      snakeString += "\n";
      for (var j = 0; j < this.grid[i].length; j++) {
        var segments = this.snake.segments;
        if (includesArray(segments, [i, j])) {
          snakeString += "S";
        } else {
          snakeString += ".";
        }
      }
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

  if (typeof window.Snakes.View === "undefined") {
    window.Snakes.View = {};
  }

  var View = Snakes.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.board = new Board();
    this.start();
    var view = this;
    $('body').keydown("keydown", function (event) {
      view.handleKeyEvent(event);
    });
  };

  View.prototype.handleKeyEvent = function (event) {
    var key = event.keyCode;
    if (key === 119) { //w
      this.board.snake.turn('N');
    } else if (key === 97) { //a
      this.board.snake.turn('W');
    } else if (key === 115) { //s
      this.board.snake.turn('S');
    } else if (key === 100) { //d
      this.board.snake.turn('E');
    }
  };

  View.prototype.draw = function () {
    var asciiSnake = this.board.render();
    $('pre').text(asciiSnake);
    this.board.render();
  };

  View.prototype.start = function () {
    var view = this;
    setInterval(function () {
      view.board.snake.move();
      view.draw();
    }, 1000);
  };

})();
