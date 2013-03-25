Solitaire.Views.Card = Backbone.View.extend({

  template: JST['cards/card'],
  className : 'card-zone',

  render: function() {
    $(this.el).html(this.template({card: this.model}))
    if ( this.model.get("faceDown") ) {
      this.$el.addClass( "face-down" )
      this.$el.find(".card").addClass( "face-down-card" )
    } else { 
      this.$el.addClass( "face-up" )
      this.$el.find(".card").addClass( this.model.get( "suit" ).substr(0,1) + "-" + this.model.get( "value" ) )
    }
    this.$el.data( "cid" , this.model.cid)
    return this
  },
    
});