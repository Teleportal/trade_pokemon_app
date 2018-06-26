class OfferedPokemon < ApplicationRecord
  belongs_to :owned_pokemon
  belongs_to :offer
end
