json.extract! owned_pokemon, :id, :user_id, :nickname, :combat_power, :pokemon_id, :created_at, :updated_at
json.url owned_pokemon_url(owned_pokemon, format: :json)
