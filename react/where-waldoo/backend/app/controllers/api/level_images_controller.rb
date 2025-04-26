class Api::LevelImagesController < ApplicationController
  def index
    levels = LevelImage.all.order(:level).map do |level|
      {
        id: level.id,
        name: level.name,
        image_url: url_for(level.image),
        level: level.level,
        description: level.description,
        difficulty: get_difficulty(level.level),
        characters: level.character_positions.map do |cp|
          {
            id: cp.character_id,
            name: cp.character_name
          }
        end
      }
    end

    render json: levels
  end

  def show
    level = LevelImage.find(params[:id])
    render json: {
      id: level.id,
      name: level.name,
      image_url: url_for(level.image),
      level: level.level,
      description: level.description,
      difficulty: get_difficulty(level.level),
      characters: level.character_positions.map do |cp|
        {
          id: cp.character_id,
          name: cp.character_name
        }
      end
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Level not found" }, status: :not_found
  end

  private

  def get_difficulty(level)
    case level
    when 1
      "Easy"
    when 2
      "Medium"
    when 3
      "Hard"
    else
      "Unknown"
    end
  end
end
