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
  return game
}

Game.prototype.render = function(player, obj) {
  $("#" + player + "_strip").find('.active').removeClass('active');
  $("#" + player + "_strip").find("#" + obj.position).addClass('active');
}

Game.prototype.finish = function(){
 // to refactor soon
}

$(document).ready(function() {
  var p = '80';
  var q = '81';

  $('form').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      url: '/',
      method: "POST",
      data: $(this).serialize()
    }).done(function(server_data){ 
      createGame(server_data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      $('body').append(jqXHR.responseText);
    });
  });

  $('#start').on('click', function() {
    $("#start").fadeOut();
    game.startTime = new Date().getTime();

    $(document).on('keyup', function(e){
      var code = (e.keyCode);

      if (code == p){
        game.player1.advancePosition();
        game.render("player1", game.player1);
        if (game.player1.position == game.length){
          alert(game.player1.name + " won!");
          var d = new Date();
          var endTime = (d.getTime() - game.startTime) / 1000
          $.ajax({
            url: '/game',
            type: 'POST',
            dataType: 'json',
            data: {winner: game.player1.name, time: endTime}
          }).always(function(){
            $("#new_game").fadeIn();
          })
        }
      } // DRY - need to refactor to game.finish 
      else if (code == q){
        game.player2.advancePosition();
        game.render("player2", game.player2);
        if (game.player2.position == game.length){
          alert(game.player2.name + " won!");
          var d = new Date();
          var endTime = (d.getTime() - game.startTime) / 1000
          $.ajax({
            url: '/game',
            type: 'PUT',
            dataType: 'json',
            data: {winner: game.player2.name, time: endTime}
          }).always(function(){
            $("#new_game").fadeIn();
          })
        }
      }
    });
  });
});

