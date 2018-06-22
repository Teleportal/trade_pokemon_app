class CreateOwnedPokemons < ActiveRecord::Migration[5.1]
  def change
    create_table :owned_pokemons do |t|
      t.integer :user_id
      t.string :nickname
      t.integer :combat_power
      t.integer :pokemon_id

      t.timestamps
    end
  end
end
