Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
  },

  pokemonDetail: function (id, callback) {
    if (!this._pokemonIndex) {
      var that = this;
      this.pokemonIndex({
        success: function () {
          var pokemon = that._pokemonIndex.collection.get(id)
          that.pokemonDetail.refreshPokemon({
            model: pokemon
          })
        }
      })
    }
    var pokemon = this._pokemonIndex.collection.get(id);
    var pokemonDetail = new Pokedex.Views.PokemonDetail({
      model: pokemon
    });

    $("#pokedex .pokemon-detail").html(pokemonDetail.$el)
    pokemonDetail.refreshPokemon();
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon();
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
    
     
  },

  toyDetail: function (pokemonId, toyId) {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});

