Solitaire.Views.FaceUpPile = Backbone.View.extend( {

  template: JST['cards/faceUpPile'],
  className: "face-up-pile",
  
  render: function() {
    $(this.el).html(this.template( { faceUpPile: this.collection } ) ) ;
    this.showThree();
    return this;
  },
  
  initialize: function() {
    this.collection.on( 'add', this.render, this);
    this.collection.on( 'remove', this.render, this);
    this.collection.on( 'reset', this.render, this);
  },
  
  showThree: function() {
    var last_three = this.collection.last(3);
    _.each( last_three, this.appendCard , this );
    this.$el.children().last().draggable({
      revert : "invalid",
      containment: $("#container"),
      zIndex: 400,
    });
    return this
  },
  
  flipThree: function(event) {
    var cardsToFlip = _.min([controller.shuffeledDeck.length,3]);
    if ( cardsToFlip == 0 ) {
      this.sendCardsToShuffeled()
    } else {
      for ( var i = 0 ; i < cardsToFlip ; i++ ) {
        var card = controller.shuffeledDeck.shift()
        card.turnFaceUp()
        this.collection.add( card );
      }
      return this
    }
  },
  
  sendCardsToShuffeled: function() {
    console.log( "seding to shuffeled")
    this.collection.each( function( card ) { card.turnFaceDown(); console.log( card ) }, this )
    controller.shuffeledDeck.add( this.collection.models )
    this.collection.reset()
    return this
  },
  
  appendCard: function( card ) {
    var view = new Solitaire.Views.Card( { model : card });
    this.$el.append( view.render().el )
    return this
  }
  
});