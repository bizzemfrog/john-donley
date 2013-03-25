window.Solitaire = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Solitaire.Routers.Main();
    Backbone.history.start();
  }
};

$(document).ready( function() {
  Solitaire.initialize()
});
