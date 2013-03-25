
%w[dimond heart spade club].each do |suit|
  letter = suit[0,1].upcase
  (1..13).each do |value|

    case value
    when 1
      name = "A-#{letter}"
    when 2..10
      name = "#{value}-#{letter}"
    when 11
      name = "J-#{letter}"
    when 12
      name = "Q-#{letter}"
    when 13
      name = "K-#{letter}"
    end
    Card.create!(name: name, value: value, suit: suit )
  end
end