class CreateGameSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :game_sessions do |t|
      t.string :player_name, null: false
      t.decimal :time_taken, precision: 10, scale: 2, null: false
      t.references :level_image, null: false, foreign_key: true

      t.timestamps
    end

    add_index :game_sessions, :time_taken
  end
end
