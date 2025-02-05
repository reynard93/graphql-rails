class CreateMenuSections < ActiveRecord::Migration[8.0]
  def change
    create_table :menu_sections do |t|
      t.references :menu, null: false, foreign_key: true
      t.references :section, null: false, foreign_key: true
      t.integer :display_order, default: 0

      t.timestamps
    end
  end
end