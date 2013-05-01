helpers do

  def current_game
    @current_game ||= Game.find(session[:current_game])
  end
end
