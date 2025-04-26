require 'open-uri'

puts "Cleaning existing data..."
CharacterPosition.destroy_all
LevelImage.destroy_all

# Create sample level data with image attachments
level_data = [
  {
    level: 1,
    name: 'Snow Scene',
    description: 'Find Waldo, Wizard and Wilma in this snow scene!',
    image_path: 'waldo_snow.jpg',
    characters: [
      { id: 1, name: 'Waldo', x: 25.5, y: 40.2, tolerance: 20.0 },
      { id: 2, name: 'Wizard', x: 80.2, y: 70.5, tolerance: 20.0 },
      { id: 3, name: 'Wilma', x: 50.0, y: 60.0, tolerance: 20.0 }
    ]
  },
  {
    level: 2,
    name: 'Stadium Scene',
    description: 'Locate our hidden characters among the crowded stadium scene!',
    image_path: 'waldo_stadium.jpg',
    characters: [
      { id: 1, name: 'Waldo', x: 75.3, y: 30.8, tolerance: 20.0 },
      { id: 2, name: 'Wizard', x: 30.7, y: 45.9, tolerance: 20.0 },
      { id: 3, name: 'Wilma', x: 90.5, y: 10.2, tolerance: 20.0 }
    ]
  },
  {
    level: 3,
    name: 'Medieval Fair',
    description: 'Our toughest challenge! Find all characters in this busy maze!',
    image_path: 'waldo_maze.jpg',
    characters: [
      { id: 1, name: 'Waldo', x: 60.1, y: 20.5, tolerance: 20.0 },
      { id: 2, name: 'Wizard', x: 15.3, y: 85.2, tolerance: 20.0 },
      { id: 3, name: 'Wilma', x: 40.8, y: 55.7, tolerance: 20.0 }
    ]
  }
]

puts "Creating level images with character positions..."

# Create and seed each level
level_data.each do |data|
  puts "Creating level: #{data[:name]}"

  # Create the LevelImage record first
  level = LevelImage.create!(
    level: data[:level],
    name: data[:name],
    description: data[:description],
    image_url: data[:image_path] # Store the filename as a reference
  )

  # Local path for development
  local_path = Rails.root.join('app', 'assets', 'images', data[:image_path])

  begin
    # Use local file if available
    puts "Using local file: #{local_path}"
    level.image.attach(io: File.open(local_path), filename: data[:image_path], content_type: 'image/jpeg')
  rescue => e
    puts "Error attaching image to level '#{data[:name]}': #{e.message}"

    # Fallback to using placeholder if both options fail
    puts "Using placeholder image"
    placeholder_path = Rails.root.join('app', 'assets', 'images', 'placeholder.jpg')

    if File.exist?(placeholder_path)
      level.image.attach(io: File.open(placeholder_path), filename: 'placeholder.jpg', content_type: 'image/jpeg')
    else
      puts "WARNING: No placeholder image available at #{placeholder_path}"
      # Create an empty directory structure if it doesn't exist
      FileUtils.mkdir_p(Rails.root.join('app', 'assets', 'images'))
      puts "Please add Where's Waldo images to the app/assets/images directory"
    end
  end

  # Add character positions for this level
  data[:characters].each do |character_data|
    level.character_positions.create!(
      character_id: character_data[:id],
      character_name: character_data[:name],
      x_position: character_data[:x],
      y_position: character_data[:y],
      tolerance: character_data[:tolerance]
    )
    puts "  - Added character position: #{character_data[:name]}"
  end

  puts "Created level #{data[:level]}: #{data[:name]} with #{level.character_positions.count} characters"
end

puts "Seeding complete! Created #{LevelImage.count} level images with #{CharacterPosition.count} character positions."
