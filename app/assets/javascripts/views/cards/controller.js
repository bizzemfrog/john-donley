faceUpView = {flip:function(){}} // to get rid of the warning
Solitaire.Views.Controller = Backbone.View.extend( {
  
  template: JST['cards/index'],
  
  events: {
    'click #deck-spot': 'flipThree',
  },
  
  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on( 'add', this.render, this);
    },
  
  setUpCollectionsAndViews: function() {
    var shuffeledCards = this.collection.shuffle()
    this.shuffeledDeck = new Solitaire.Collections.Deck( shuffeledCards );
    this.deckView = new Solitaire.Views.Deck( { collection: this.shuffeledDeck } );
    $('#deck-spot').html( this.deckView.render().el );
    this.faceUpPile = new  Solitaire.Collections.FaceUpPile();
    this.faceUpView = new Solitaire.Views.FaceUpPile( { collection: this.faceUpPile } );
    $('#face-up-spot').html( this.faceUpView.render().el );
    this.columns = new Array();
    this.columnViews = []
    for ( var row_i = 0 ; row_i < 7 ; row_i++ ) {
      var colummnCollection = new Solitaire.Collections.Column()
      this.columns.push( colummnCollection );
      var columnView = new Solitaire.Views.Column({ collection : colummnCollection });
      $('#column-spot').append( columnView.render().el );
      this.columnViews.push( columnView )
    }
    this.suitPiles = []
    this.suitPileViews = []
    for ( var row_i = 0 ; row_i < 4 ; row_i++ ) {
      var suitPileColleciton = new Solitaire.Collections.SuitPile()
      this.suitPiles.push( suitPileColleciton );
      var suitView = new Solitaire.Views.SuitPile ( { collection: suitPileColleciton } );
      $('#suit-pile-spot').append( suitView.render().el );
      this.suitPileViews.push( suitView )
    }
  },

  render: function() {
    $(this.el).html(this.template());
    this.setUpCollectionsAndViews()
    return this;
  },
  
  getColumnByCardCid: function( card_cid ) {
    for ( var col_i = 0 ; col_i < this.columnViews.length ; col_i++ ) {
      var column = this.columnViews[col_i];
      if ( column.collection.get( card_cid ) ) {
        var targetColumn = column;
        break;
      }
    }
    return targetColumn;
  },
    
  deal: function() {
    columnsNumbers = [1,2,3,4,5,6,7];
    for ( var i = 0 ; i <= 6 ; i++ ) {
      for ( column_i in this.columns ) {
        var column = this.columns[column_i];
        if ( column.length < columnsNumbers[this.columns.indexOf(column)] - 1 ) {
          column.add( this.shuffeledDeck.pop(), {silent: true} );
        } else if ( column.length == columnsNumbers[this.columns.indexOf(column)] - 1 ) {
          column.add( this.shuffeledDeck.pop() )
        }
      }
    };
    return this
  },
  
  flipThree: function() {
    if ( this.shuffeledDeck.length == 52 ) {
      this.deal()
    } else {
      this.faceUpView.flipThree()
    }
  },
  
});