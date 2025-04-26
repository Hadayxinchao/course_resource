class DropGameSessions < ActiveRecord::Migration[8.0]
  def up
    drop_table :game_sessions if table_exists?(:game_sessions)
  end

  def down
    # If you need to recreate the old table structure in case of a rollback
    create_table :game_sessions do |t|
      t.integer :game_level
      t.string :player_name
      t.integer :completion_time
      t.timestamps
    end
  end
end
