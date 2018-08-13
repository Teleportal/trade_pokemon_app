json.extract! owned_pokemon, :id, :user_id, :species, :nickname, :combat_power, :pokemon_id, :created_at, :updated_at
json.species owned_pokemon.species
json.url owned_pokemon_url(owned_pokemon, format: :json)

