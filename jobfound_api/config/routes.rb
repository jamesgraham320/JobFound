Rails.application.routes.draw do
  resources :notes, only: [:create, :show, :index, :destroy, :update]
  resources :stages, only: [:create, :show, :index, :destroy, :update]
  resources :contacts, only: [:create, :show, :index, :destroy, :update]
  resources :companies, only: [:create, :show, :index, :destroy, :update]
  resources :assets, only: [:create, :show, :index, :destroy, :update]
  resources :applications, only: [:create, :show, :index, :destroy, :update]
  resources :users, only: [:create, :show, :index, :destroy, :update]

  get '/current-user', to: 'users#show'

  get 'auth/:provider/callback', to: 'users#create'
  get 'auth/failure', to: redirect('/')
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
