class CharacterPosition < ApplicationRecord
  belongs_to :level_image

  validates :character_name, presence: true
  validates :character_id, presence: true
  validates :x_position, presence: true
  validates :y_position, presence: true
  validates :character_id, uniqueness: { scope: :level_image_id }
end
