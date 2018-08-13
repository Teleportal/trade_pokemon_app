class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  
  has_many :owned_pokemons
  has_many :desired_pokemons

  geocoded_by :pretty_address
  after_validation :geocode

  def street
    address['street']
  end

  def city
    address['city']
  end

  def state
    address['state']
  end

  def zip
    address['zip']
  end

  def country
    'USA'
  end

  def pretty_address
    "#{street}, #{city}, #{state} #{zip} #{country}"
  end

end
