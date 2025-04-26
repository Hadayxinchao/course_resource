class Api::CharacterSelectionsController < ApplicationController
  # Skip CSRF protection for API endpoints
  skip_before_action :verify_authenticity_token, if: :json_request?

  def validate
    # Parse the request body
    data = JSON.parse(request.body.read)

    level_id = data["level_id"]
    character_id = data["character_id"]
    x_position = data["x_position"].to_f
    y_position = data["y_position"].to_f

    # Find the character position from the database
    character_position = CharacterPosition.find_by(
      level_image_id: level_id,
      character_id: character_id
    )

    if character_position.nil?
      render json: { valid: false, message: "Character position data not found" }
      return
    end

    distance_x = (x_position - character_position.x_position).abs
    distance_y = (y_position - character_position.y_position).abs

    # Check if click is within tolerance
    is_valid = distance_x <= character_position.tolerance && distance_y <= character_position.tolerance

    render json: {
      valid: is_valid,
      message: is_valid ? "Found #{character_position.character_name}!" : "Not quite! Try again."
    }
  end

  private

  def json_request?
    request.format.json? ||
    request.content_type == "application/json" ||
    request.content_type.nil?
  end
end
