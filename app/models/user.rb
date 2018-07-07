class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  
  has_many :owned_pokemons
  has_many :desired_pokemons

end
