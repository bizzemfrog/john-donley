class Card < ActiveRecord::Base
  attr_accessible :name, :value, :suit
end
