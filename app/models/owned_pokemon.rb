class OwnedPokemon < ApplicationRecord
  belongs_to :user
  belongs_to :pokemon
  has_many :offered_pokemons
  has_many :offers, :through => :offered_pokemons
end
