Solitaire.Collections.Column = Backbone.Collection.extend({

  model: Solitaire.Models.Card,
  
  canDropDiv: function( card_div ) {
    console.log( "testing column" )
    var faceUpCard = controller.faceUpPile.get( card_div.data("cid") )
    var row = controller.getColumnByCardCid( card_div.data("cid") )
    if ( faceUpCard ) {
      return this.canDropCard( faceUpCard )
    }
    if ( row ) {
      var draggedCard = row.collection.get( card_div.data("cid") )
      return this.canDropCard( draggedCard )
    }
    return false;
  },
  
  canDropCard: function( card ) {
    var lastCard = this.last()
    if ( lastCard ) {
      if ( lastCard.get("is_red") != card.get("is_red") ) {
        if ( (lastCard.get("value") - 1) == card.get("value") ) {
          return true;
        }
      }
    } else {
      if ( card.get("value") == 13 ) {
        return true;
      }
    }
    return false
  },
  
})
