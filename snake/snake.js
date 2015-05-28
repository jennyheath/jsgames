( function () {
  if (window.Snake === undefined) {
    window.Snake = {};
  }

  function Snake () {
    this.dir = 'N';
    this.segments = [[50,50]];
  }

  Snake.prototype.move = function () {
    var headX = this.segments[0][0]
    var headY = this.segments[0][1]
    var newHead = [headX, headY];

    if (this.dir === 'N') {
      newHead[1] -= 1
    } else if (this.dir === 'E') {
      newHead[0] += 1
    } else if (this.dir === 'S') {
      newHead[1] += 1
    } else if (this.dir === 'W') {
      newHead[0] -= 1
    }
    this.segments.unshift(newHead);
    this.segments.pop();
  }

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  }

  function Coord () {
  }

  Coord.prototype.plus = function () {
  }

  Coord.prototype.equals = function () {
  }

  Coord.prototype.isOpposite = function () {
  }

  function Board () {
    this.snake = new Snake();
    this.grid = new Array(20);
    for (var i = 0; i < this.grid.length; i ++) {
      this.grid[i] = new Array(20);
    }
  }

  Board.prototype.render = function () {
    var snakeString = "";
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if (typeof this.grid[i][j] === 'undefined') 
      }
      snakeString += "\n";
    }
  }


})();
