class CreateOffers < ActiveRecord::Migration[5.1]
  def change
    create_table :offers do |t|
      t.integer :owned_pokemon_id_1
      t.integer :owned_pokemon_id_2
      t.integer :status

      t.timestamps
    end
  end
end
