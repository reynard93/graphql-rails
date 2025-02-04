Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '/graphql',
      headers: :any,
      methods: [:post, :options],
      expose: ['Access-Control-Allow-Origin'],
      max_age: 600
  end
end