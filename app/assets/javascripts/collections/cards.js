Solitaire.Collections.Cards =  Backbone.Collection.extend({
  
  url: '/api/cards',
  model: Solitaire.Models.Card,
  
  preloadImages: function() {
    this.each( function( card ) { $('<img/>')[0].src = "assets/cards/" + card.get("suit").substr(0,1) + "-" + card.get("value") + ".png" } , this )
  }

})