Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get '*app', to: 'home#index'
  
  resources :presentation, only: [:index, :show, :create, :update, :destroy]
end
