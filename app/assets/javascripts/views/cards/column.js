Solitaire.Views.Column = Backbone.View.extend( {

  template: JST['cards/column'],
  className: "column",
  
  events: {
    "drop" : "addDropped"
  },
  
  initialize: function() {
    this.makeDroppable();
    this.collection.on( 'add', this.render, this);
    this.collection.on( 'remove', this.render, this);
    this.collection.on( 'reset', this.render, this);
  },

  makeDroppable:function() {
    var dropTest = this.collection.canDropDiv.bind( this.collection )
    this.$el.droppable({
      accept: dropTest,
      tolerance: "pointer",
    });  
  },
  
  render: function() {
    $( this.el ).html( this.template() );
    if ( this.collection.length > 0 ) {
      this.$el.removeClass("empty-column")
      this.cardViews = []
      if ( this.collection.last().get("faceDown") ) {
        this.collection.last().turnFaceUp()
      }
      this.collection.each( this.appendCard , this );
    } else {
      this.$el.addClass("empty-column")
    }
    return this
  },
  
  appendCard: function( card , index, list ) {
    var view = new Solitaire.Views.Card( { model : card } );
    if ( !card.get("faceDown") ) {
      view.$el.draggable({
        revert:"invalid",
        containment: $("#container"),
        zIndex: 400,
        handle: ".card",
      })
    }
    if ( this.cardViews.length > 0 ) {
      this.cardViews[index - 1].$el.append( view.render().el )
    } else {
      this.$el.append( view.render().el );
    }
    this.cardViews.push( view )
    return this
  },
  
  addDropped: function(event, ui) {
    event.preventDefault
    var card_div = ui.draggable
    var faceUpCard = controller.faceUpPile.get( card_div.data("cid") )
    var row = controller.getColumnByCardCid( card_div.data("cid") )
    if ( faceUpCard ) {
      this.collection.add( controller.faceUpPile.pop() )
    }
    if ( row ) {
      var dCollection = row.collection
      var tCollection = this.collection
      var dCard = dCollection.get( card_div.data("cid") )
      var numCardsToMove = dCollection.length - dCollection.indexOf( dCard )
      var cardsToMove = dCollection.last(numCardsToMove)
      _.each( cardsToMove, function(card) {
        dCollection.remove( card )
        tCollection.add( card )
      })
    }
  }
  
})