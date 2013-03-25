class AddIsRedBlackToCard < ActiveRecord::Migration
  
  def change
    
    add_column :cards, :is_red, :boolean
    add_column :cards, :is_black, :boolean
    
    Card.all.each do |card|
      case card.suit
      when "heart", "dimond"
        card.is_red = true
        card.is_black = false
      when "club", "spade"
        card.is_red = false
        card.is_black = true
      end
      card.save
    end
    
  end
  
end
