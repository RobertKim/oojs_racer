class GamesPlayer < ActiveRecord::Base
 validate :two_players

  def two_players
    if (player1_id == nil) || (player2_id == nil) 
      errors.add(:player, "cannot be nil. Must have two valid players")
    end
  end
end
