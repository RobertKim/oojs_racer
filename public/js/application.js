$(document).ready(function() {
  $('form').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      url: '/',
      method: "POST",
      data: $(this).serialize()
    }).done(function(server_data){ 

      game = createGame(server_data);
      gameStart();

    }).fail(function(jqXHR, textStatus, errorThrown){
      $('body').append(jqXHR.responseText);
    });
  });
});

