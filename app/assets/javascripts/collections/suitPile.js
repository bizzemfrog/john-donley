Solitaire.Collections.SuitPile = Backbone.Collection.extend( {

  model: Solitaire.Models.Card,
  
  canDropDiv: function( card_div ) {
    var faceUpCard = controller.faceUpPile.get( card_div.data("cid") )
    var row = controller.getColumnByCardCid( card_div.data("cid") )
    if ( faceUpCard ) {
      return this.canDropCard( faceUpCard )
    }
    if ( row ) {
      var draggedCard = row.collection.get( card_div.data("cid") )
      if ( draggedCard == row.collection.last() ) {
        return this.canDropCard( draggedCard )
      }
    }
    return false;
  },
  
  canDropCard: function( card ) {
    var lastCard = this.last()
    if ( lastCard ) {
      if ( lastCard.get("suit") == card.get("suit") ) {
        if ( lastCard.get("value")  + 1 == ( card.get("value") ) ) {
          return true;
        }
      }
    } else {
      if ( card.get("value") == 1 ) {
        return true;
      }
    }
    return false
  },

})