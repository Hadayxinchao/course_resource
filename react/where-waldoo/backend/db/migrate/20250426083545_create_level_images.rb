class CreateLevelImages < ActiveRecord::Migration[8.0]
  def change
    create_table :level_images do |t|
      t.string :image_url
      t.integer :level
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
