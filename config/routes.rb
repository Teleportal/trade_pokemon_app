Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  resources :pokemons
  resources :offers
  resources :desired_pokemons
  resources :owned_pokemons
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
