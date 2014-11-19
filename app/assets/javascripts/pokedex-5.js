Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
     'click li.poke-list-item': "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
  },

  addPokemonToList: function (pokemon) {
    var content = JST["pokemonListItem"]({pokemon: pokemon});
    this.$el.append(content);
  },

  refreshPokemon: function (options, callback) {
    // first that can it change to this?
    var that = this
    this.collection.fetch({
      success: function(){
        that.render();
      }
      
    })
  },

  render: function () {
    this.$el.empty();
    var that = this
    this.collection.forEach(function (pokemon) {
      that.addPokemonToList(pokemon);
    });
  },

  selectPokemonFromList: function (event) {

    var $target = $(event.target);

    var pokeId = $target.data('id');


    Backbone.history.navigate("/pokemon/" + pokeId, {trigger: true});
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
      "click .toys li" : "selectToyFromList"
  },

  refreshPokemon: function (options, callback) {
    var that = this;
    this.model.fetch({
      success: function(){
        that.render();
      }
    })
    
  },

  render: function () {
    var that = this;
    var content = JST['pokemonDetail']({pokemon: this.model});
    this.$el.html(content);
    this.$el.find(".toys").empty();
    this.model.toys().forEach(function(toy){
      var toyContent = JST["toyListItem"]({toy: toy});
      that.$el.find(".toys").append(toyContent);
     
    })

  },

  selectToyFromList: function (event) {
    var $target = $(event.target);

    var toyId = $target.data('id');
    var toy = this.model.toys().get(toyId);
    var toyDetail = new Pokedex.Views.ToyDetail({
      model: toy
    });
    $("#pokedex .toy-detail").empty();
    $("#pokedex .toy-detail").html(toyDetail.$el)
    toyDetail.render();
    
    
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var that = this;
    var content = JST['toyDetail']({toy: this.model, pokes: []});
    this.$el.html(content);
  }
  // this.$el.empty();
  // var that = this
  // this.collection.forEach(function (pokemon) {
  //   that.addPokemonToList(pokemon);
  // });
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });

