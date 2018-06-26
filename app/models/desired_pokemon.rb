class DesiredPokemon < ApplicationRecord
  belongs_to :user
  belongs_to :pokemon

  def species
    pokemon.species
  end
end
