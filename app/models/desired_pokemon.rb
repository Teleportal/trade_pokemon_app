class DesiredPokemon < ApplicationRecord
  belongs_to :user
  belongs_to :pokemon
end
