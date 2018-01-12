Rails.application.routes.draw do

  devise_for :users
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]

  root to: 'users#index'
  resources :notes
  resources :assets
  resources :stages
  resources :contacts
  resources :companies
  resources :users
  resources :applications

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
