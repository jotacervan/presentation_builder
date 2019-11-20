Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  resources :presentation, only: [:index, :show, :create, :update, :destroy]
  get 'slide/:id', to: 'slide#index'
  resources :slide, only: [:show, :create, :update, :destroy]
  # front end react routes can be found at app/javascript/Routes.js
  get '*app', to: 'home#index'
end
