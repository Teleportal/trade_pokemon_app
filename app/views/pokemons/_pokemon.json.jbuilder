json.extract! pokemon, :id, :species, :created_at, :updated_at
json.url pokemon_url(pokemon, format: :json)
# json.target_pokemons pokemon.target_pokemons

# adding the image of the game_image to the output
json.target_pokemons @target_pokemons