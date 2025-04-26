class CreateCharacterPositions < ActiveRecord::Migration[8.0]
  def change
    create_table :character_positions do |t|
      t.references :level_image, null: false, foreign_key: true
      t.string :character_name, null: false
      t.integer :character_id, null: false
      t.decimal :x_position, precision: 10, scale: 2, null: false
      t.decimal :y_position, precision: 10, scale: 2, null: false
      t.decimal :tolerance, precision: 10, scale: 2, default: 5.0

      t.timestamps
    end

    add_index :character_positions, [ :level_image_id, :character_id ], unique: true
  end
end
