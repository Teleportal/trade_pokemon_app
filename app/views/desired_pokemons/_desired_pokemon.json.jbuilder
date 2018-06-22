json.extract! desired_pokemon, :id, :user_id, :pokemon_id, :min_cp, :created_at, :updated_at
json.url desired_pokemon_url(desired_pokemon, format: :json)
