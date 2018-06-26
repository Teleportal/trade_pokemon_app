class Offer < ApplicationRecord
  has_many :offered_pokemons
  has_many :owned_pokemons, :through => :offered_pokemons
end
