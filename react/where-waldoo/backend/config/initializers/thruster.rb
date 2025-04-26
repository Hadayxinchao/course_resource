if Rails.env.development? && Rails.application.config.respond_to?(:thruster)
  Rails.application.config.thruster.proxy_to = {
    "/api" => "http://localhost:3000/api"
  }
end
