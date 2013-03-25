Solitaire.Views.SuitPile = Backbone.View.extend( {

  template: JST['cards/suitPile'],
  className: "suit-pile",
  
  events: {
    "drop" : "addDropped"
  },
  
  render: function() {
    $( this.el ).html( this.template() );
    return this;
  },
  
  initialize: function() {
    this.makeDroppable();
    this.collection.on( 'add', this.render, this);
    this.collection.on( 'remove', this.render, this);
    this.collection.on( 'reset', this.render, this);
  },
  
  render: function() {
    $( this.el ).html( this.template() );
    this.collection.each( this.appendCard, this );
    return this
  },
  
  appendCard: function( card ) {
    var view = new Solitaire.Views.Card( { model : card } );
    this.$el.append( view.render().el );
    return this
  },
  
  makeDroppable:function() {
    var dropTest = this.collection.canDropDiv.bind( this.collection )
    this.$el.droppable({
      accept: dropTest,
      tolerance: "pointer",
    });
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
      this.collection.add( row.collection.pop() )
    }
  },
  
})