Solitaire.Routers.Main = Backbone.Router.extend({
  
  routes: {
    '' : 'index'
  },
    
  initialize: function() {
    this.collection = new Solitaire.Collections.Cards()
    this.collection.fetch()
  },
  
  index: function() {
    controller = new Solitaire.Views.Controller({collection: this.collection})
    $('#container').html(controller.render().el)
  },
  
});