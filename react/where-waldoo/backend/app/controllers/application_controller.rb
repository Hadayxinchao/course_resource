class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  protect_from_forgery with: :exception
  
  # For API requests, we'll handle exceptions differently
  rescue_from ActionController::InvalidAuthenticityToken do |exception|
    if request.format.json? || request.content_type == 'application/json'
      render json: { error: "Invalid authenticity token" }, status: :unprocessable_entity
    else
      raise exception
    end
  end
end
