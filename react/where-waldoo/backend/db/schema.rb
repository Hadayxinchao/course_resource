# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_26_102018) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "character_positions", force: :cascade do |t|
    t.bigint "level_image_id", null: false
    t.string "character_name", null: false
    t.integer "character_id", null: false
    t.decimal "x_position", precision: 10, scale: 2, null: false
    t.decimal "y_position", precision: 10, scale: 2, null: false
    t.decimal "tolerance", precision: 10, scale: 2, default: "5.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["level_image_id", "character_id"], name: "index_character_positions_on_level_image_id_and_character_id", unique: true
    t.index ["level_image_id"], name: "index_character_positions_on_level_image_id"
  end

  create_table "game_sessions", force: :cascade do |t|
    t.string "player_name", null: false
    t.decimal "time_taken", precision: 10, scale: 2, null: false
    t.bigint "level_image_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["level_image_id"], name: "index_game_sessions_on_level_image_id"
    t.index ["time_taken"], name: "index_game_sessions_on_time_taken"
  end

  create_table "level_images", force: :cascade do |t|
    t.string "image_url"
    t.integer "level"
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "character_positions", "level_images"
  add_foreign_key "game_sessions", "level_images"
end
