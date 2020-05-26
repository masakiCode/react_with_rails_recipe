Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
    # resourses :recipes, only: [:index, :create, :destroy, :update, :show]
      get 'recipes/index'
      post 'recipes/create'
      put '/update/:id', to: 'recipies#update'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
