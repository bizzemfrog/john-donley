Solitaire.Models.Card = Backbone.Model.extend({
  
  defaults: {
    "faceDown": true,
  },
  
  turnFaceDown: function() {
    this.set("faceDown",true)
  },
  
  turnFaceUp: function() {
    this.set("faceDown", false)
  },
  
  flip: function() {
    if ( this.faceDown ) {
      this.turnFaceUp()
    } else {
      this.turnFaceDown()
    }
  },
  
})
