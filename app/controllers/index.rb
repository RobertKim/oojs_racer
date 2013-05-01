get '/' do
  
  erb :index
end

post '/' do
  content_type :json

  player1 = Player.new(:name => params[:player1])
  player2 = Player.new(:name => params[:player2])
  length = params[:length].to_i

  if player1.save && player2.save
    game = Game.create
    session[:current_game] = game.id
    result = { :player1 => player1.name, :player2 => player2.name, :length => length }
    result.to_json
  else 
    response.status = 422
    @errors = "Sorry, name is taken"
    erb :errors, layout: false
  end
end

put '/game' do
  current_game.winner = params[:winner]
  current_game.time = params[:time]
  current_game.save 
end
