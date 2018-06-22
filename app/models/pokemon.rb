class Pokemon < ApplicationRecord
  has_many :owned_pokemons
  has_many :desired_pokemons
end
