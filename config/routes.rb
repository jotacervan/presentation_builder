Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  resources :presentation, only: [:index, :show, :create, :update, :destroy]
  get 'slide/:id', to: 'slide#index'
  get 'get_slide/:id', to: 'slide#show'
  post 'pdf_upload/:id', to: 'slide#pdf_upload'
  resources :slide, only: [:create, :update, :destroy]

  # front end react routes can be found at app/javascript/Routes.js
  get '*app', to: 'home#index'
end
