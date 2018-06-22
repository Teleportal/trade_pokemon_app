Rails.application.routes.draw do
  resources :pokemons
  resources :offers
  resources :desired_pokemons
  resources :owned_pokemons
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
