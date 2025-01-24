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

ActiveRecord::Schema[8.0].define(version: 2025_01_25_081533) do
  create_table "item_modifier_groups", force: :cascade do |t|
    t.integer "item_id", null: false
    t.integer "modifier_group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_item_modifier_groups_on_item_id"
    t.index ["modifier_group_id"], name: "index_item_modifier_groups_on_modifier_group_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "type"
    t.string "identifier"
    t.string "label"
    t.string "description"
    t.float "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "menu_sections", force: :cascade do |t|
    t.integer "menu_id", null: false
    t.integer "section_id", null: false
    t.integer "display_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_id"], name: "index_menu_sections_on_menu_id"
    t.index ["section_id"], name: "index_menu_sections_on_section_id"
  end

  create_table "menus", force: :cascade do |t|
    t.string "identifier"
    t.string "label"
    t.string "state"
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "modifier_groups", force: :cascade do |t|
    t.string "identifier"
    t.string "label"
    t.integer "selection_required_min"
    t.integer "selection_required_max"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "modifiers", force: :cascade do |t|
    t.integer "item_id", null: false
    t.integer "modifier_group_id", null: false
    t.integer "display_order"
    t.integer "default_quantity"
    t.float "price_override"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_modifiers_on_item_id"
    t.index ["modifier_group_id"], name: "index_modifiers_on_modifier_group_id"
  end

  create_table "section_items", force: :cascade do |t|
    t.integer "section_id", null: false
    t.integer "item_id", null: false
    t.integer "display_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_section_items_on_item_id"
    t.index ["section_id"], name: "index_section_items_on_section_id"
  end

  create_table "sections", force: :cascade do |t|
    t.string "identifier"
    t.string "label"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "menu_id"
    t.index ["menu_id"], name: "index_sections_on_menu_id"
  end

  add_foreign_key "item_modifier_groups", "items"
  add_foreign_key "item_modifier_groups", "modifier_groups"
  add_foreign_key "menu_sections", "menus"
  add_foreign_key "menu_sections", "sections"
  add_foreign_key "modifiers", "items"
  add_foreign_key "modifiers", "modifier_groups"
  add_foreign_key "section_items", "items"
  add_foreign_key "section_items", "sections"
  add_foreign_key "sections", "menus"
end
