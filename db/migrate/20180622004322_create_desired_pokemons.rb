class CreateDesiredPokemons < ActiveRecord::Migration[5.1]
  def change
    create_table :desired_pokemons do |t|
      t.integer :user_id
      t.integer :pokemon_id
      t.integer :min_cp

      t.timestamps
    end
  end
end
