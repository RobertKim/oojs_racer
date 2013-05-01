function Player(name) {
  this.position = 0;
  this.name = name;
}

Player.prototype.advancePosition = function(){
  this.position ++; 
}

function Game(player1, player2, length) {
  this.player1 = player1;
  this.player2 = player2;
  this.length = length;
  this.winner = null;

  createBoard(player1, player2, length);
}

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

function createGame(server_data){
  var p1, p2, length 
  p1 = new Player(server_data.player1);
  p2 = new Player(server_data.player2);
  length = (server_data.length);
  game = new Game(p1, p2, length)
  $('.player-form').fadeOut(function(){
    $('#track').fadeIn();
  });
}

Game.prototype.render = function(player, obj) {
  $("#" + player + "_strip").find('.active').removeClass('active');
  $("#" + player + "_strip").find("#" + obj.position).addClass('active');
}

Game.prototype.finish = function(){
 // to refactor soon
}