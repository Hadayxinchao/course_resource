Rails.application.routes.draw do
  namespace :api do
    resources :level_images, only: [ :index, :show ] do
      resources :game_sessions, only: [ :index ]
    end

    post "/validate_character", to: "character_selections#validate"
    resources :game_sessions, only: [ :create ]
  end
end
