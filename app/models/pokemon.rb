class Pokemon < ApplicationRecord
  has_many :owned_pokemons
  has_many :desired_pokemons

  def target_pokemons(min_cp)
    owned_pokemons.where(OwnedPokemon.arel_table[:combat_power].gt(min_cp))
  end
end
