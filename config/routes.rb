Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
  # Set root path to serve the Vite frontend
  root "vite#index"

  # Serve static files if enabled
  if ENV["RAILS_SERVE_STATIC_FILES"].present?
    get "*path", to: "vite#index", constraints: ->(req) { !req.xhr? && req.format.html? }
    post "*path", to: "vite#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  end
end
