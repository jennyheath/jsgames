(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.towers = $el;
    this.clicks = 0;
    this.fromTower = null;

    this.setupTowers();
    this.render();
    this.clickTower();
  };

  View.prototype.clickTower = function () {
    var view = this;
    $(".tower").on('click', function (event) {
      var $tower = $(event.currentTarget);
      if (view.clicks === 0) {
        view.fromTower = $tower;
        view.clicks += 1;
      } else {
        view.game.move(view.fromTower.data('id'), $tower.data('id'));
        view.clicks = 0;
        if (view.game.isWon()) {
          var $msg = $('<div>').addClass('msg').text('you won!');
          $('body').append($msg);
        }
        view.render();
      }
    })
  }

  View.prototype.setupTowers = function () {
    for (var i = 0; i < 3; i++) {
      var $tower = $('<div>');
      $tower.addClass('group');
      $tower.addClass('tower');
      $tower.data('id', i);
      this.towers.append($tower);
      for (var j = 0; j < 3; j++) {
        var $disk = $('<div>').addClass('disk');
        $tower.append($disk);
      }
    }
  };

  View.prototype.render = function () {
    var currentTowers = this.game.towers;

    $.each(this.towers.children(), function (towerIdx, tower) {
      $.each($(tower).children(), function (diskIdx, disk) {
        var diskNum = 2 - diskIdx;
        var currentTower = currentTowers[towerIdx][diskNum];
        if (currentTower === undefined) {
          $(disk).removeClass('three');
          $(disk).removeClass('two');
          $(disk).removeClass('one');
        } else if (currentTower === 1) {
          $(disk).addClass('one');
        } else if (currentTower === 2) {
          $(disk).addClass('two');
        } else if (currentTower === 3) {
          $(disk).addClass('three');
        }
      });
    });
  };

})();
