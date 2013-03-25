Solitaire.Views.Deck = Backbone.View.extend({

  template: JST['cards/deck'],
  className: "deck",

  render: function() {
    $(this.el).html(this.template({deck: this.collection}));
    var children = this.$el.children()
    children.each ( function(i) {
      var card = children[i]
      $(card).css( "left", i*0.5 );
      $(card).css( "top", -0.5*i );
    });
    return this;
  },
    
  initialize: function() {
    this.collection.on( 'add', this.render, this);
    this.collection.on( 'remove', this.render, this);
  }
    
})