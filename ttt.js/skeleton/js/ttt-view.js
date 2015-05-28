(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.$board = $el;
    this.game = game;
  };

  View.prototype.bindEvents = function () {
    var view = this;
    this.$board.on('click', function (event) {
      var $cell = $(event.target);
      view.makeMove($cell);
    })
  };

  View.prototype.makeMove = function ($square) {
    var currentPlayer = this.game.currentPlayer;
    try {
      var result = this.game.playMove($square.data('pos'));
    }
    catch (MoveError) {
      alert('Invalid Move');
      return;
    }

    $square.addClass(currentPlayer).text(currentPlayer);

    if (this.game.isOver()) {
      var $msg = $('<div>').
        text("You win, " + currentPlayer + "!").addClass('msg');
      $('body').append($msg);
    }
  };

  View.prototype.setupBoard = function () {
    var $grid = this.$board.append('<ul>').append('<ul>').append('<ul>');

    $.each($grid.children(), function (index, list) {
      $(list).addClass('group');
      $(list).append('<li>').append('<li>').append('<li>') });

    $.each($grid.children(), function (y, child) {
      $.each($(child).children(), function (x, cell) {
        $(cell).attr('class', 'cell');
        $(cell).data('pos', [x, y]);
      })
    });

    return $grid;
  };
})();
