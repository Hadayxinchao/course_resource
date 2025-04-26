class Api::GameSessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, if: :json_request?

  def create
    data = JSON.parse(request.body.read)
    level_id = data['level_id']
    player_name = data['player_name']
    time_taken = data['time_taken'].to_f

    level = LevelImage.find_by(id: level_id)

    if level.nil?
      render json: { error: "Level not found" }, status: :not_found
      return
    end

    game_session = level.game_sessions.build(
      player_name: player_name,
      time_taken: time_taken
    )

    if game_session.save
      # Get this player's rank
      rank = level.game_sessions.where('time_taken <= ?', time_taken).count

      render json: {
        id: game_session.id,
        player_name: game_session.player_name,
        time_taken: game_session.time_taken,
        rank: rank + 1,
        created_at: game_session.created_at
      }, status: :created
    else
      render json: { errors: game_session.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    level_image_id = params[:level_image_id]
    level = LevelImage.find_by(id: level_image_id)

    if level.nil?
      render json: { error: "Level not found" }, status: :not_found
      return
    end

    limit = params[:limit] || 10
    scores = level.game_sessions.top_scores(limit.to_i)

    render json: scores.map { |score|
      {
        id: score.id,
        player_name: score.player_name,
        time_taken: score.time_taken,
        created_at: score.created_at
      }
    }
  end

  private

  def json_request?
    request.format.json? || 
    request.content_type == 'application/json' ||
    request.content_type.nil?
  end
end
