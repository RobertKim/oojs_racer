function Player(name) {
  this.position = 0;
  this.name = name;
};

function createGame(server_data){
  var p1, p2, length 
  p1 = new Player(server_data.player1);
  p2 = new Player(server_data.player2);
  length = (server_data.length);
  game = new Game(p1, p2, length)
  $('.player-form').fadeOut(function(){
    $('#track').fadeIn();
  });
  return game;
}

Player.prototype.advancePosition = function(){
  this.position ++; 
};

Game.prototype.render = function(player, obj) {
  $("#" + player + "_strip").find('.active').removeClass('active');
  $("#" + player + "_strip").find("#" + obj.position).addClass('active');
}

function Game(player1, player2, length) {
  this.player1 = player1;
  this.player2 = player2;
  this.length = length;
  this.winner = null;

  createBoard(player1, player2, length);
};

Game.prototype.hasAWinner= function(){
  if (this.player1.position == this.length){
    this.winner = this.player1.name;
  } else if (this.player2.position == this.length) {
    this.winner = this.player2.name;
  }
};

var gameStart = function(){
  $('#start').on('click', function(){
    $("#start").fadeOut();
    game.startTime = new Date().getTime();
  });
  gameLogic();
};

var gameLogic = function() {
  $(document).on('keyup', function(e){
    if(game.winner === null){
      if (e.keyCode == '80'){
        game.player1.advancePosition();
        game.render("player1", game.player1);
        game.hasAWinner();
      }else if (e.keyCode == '81'){
        game.player2.advancePosition();
        game.render("player2", game.player2);
        game.hasAWinner();
      }
      if(game.winner != null){
        var endTime = new Date().getTime() - game.startTime / 1000;
        alert(game.winner + " won!");
        var results = {winner: game.winner.name, time: endTime};
        $.ajax({
          url: '/game',
          type: 'PUT',
          dataType: 'json',
          data: results
        });
        game.finish();
      }
    }
  });
};

Game.prototype.finish = function() {
  $("#new_game").fadeIn();
};

function createBoard(player1, player2, length) {
  this.length = length;
  for(var i=0; i<length; i++)
  {
    $('#player1_strip').append("<td id='" + (i + 1) +"'></td>");
    $('#player2_strip').append("<td id='" + (i + 1) +"'></td>");
  }

  $('#player1').html(player1.name);
  $('#player2').html(player2.name);
}
