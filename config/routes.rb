Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  resources :presentation, only: [:index, :show, :create, :update, :destroy]
  get '*app', to: 'home#index'
end
