class RemoveOwnedPokemonIdFromOffer < ActiveRecord::Migration[5.1]
  def change
    remove_column :offers, :owned_pokemon_id_1, :integer
    remove_column :offers, :owned_pokemon_id_2, :integer

  end
end
