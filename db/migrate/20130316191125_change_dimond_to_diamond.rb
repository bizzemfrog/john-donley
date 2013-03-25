class ChangeDimondToDiamond < ActiveRecord::Migration
  def up
    Card.where(:suit => "dimond").each do |card|
      card.suit = "diamond"
      card.save
    end
  end

  def down
  end
end
