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

      // DRY - need to refactor to game.finish 
      
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
      } 
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

