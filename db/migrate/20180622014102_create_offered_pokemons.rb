class CreateOfferedPokemons < ActiveRecord::Migration[5.1]
  def change
    create_table :offered_pokemons do |t|
      t.integer :owned_pokemon_id
      t.integer :offer_id

      t.timestamps
    end
  end
end
