class GameSession < ApplicationRecord
  belongs_to :level_image
  
  validates :player_name, presence: true
  validates :time_taken, presence: true, numericality: { greater_than: 0 }
  
  scope :top_scores, ->(limit = 10) { order(time_taken: :asc).limit(limit) }
end
