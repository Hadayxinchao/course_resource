class LevelImage < ApplicationRecord
  has_one_attached :image
  has_many :character_positions, dependent: :destroy
  has_many :game_sessions, dependent: :destroy

  validates :level, presence: true
  validates :name, presence: true

  def top_scores(limit = 10)
    game_sessions.order(time_taken: :asc).limit(limit)
  end
end
