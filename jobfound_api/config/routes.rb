Rails.application.routes.draw do
  resources :notes
  resources :stages
  resources :contacts
  resources :companies
  resources :assets
  resources :applications
  resources :users
  get 'auth/:provider/callback', to: 'users#create'
  get 'auth/failure', to: redirect('/')
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "users#index"
end
