class CreateItems < ActiveRecord::Migration[8.0]
  def change
    create_table :items do |t|
      t.string :type
      t.string :identifier
      t.string :label
      t.string :description
      t.float :price

      t.timestamps
    end
  end
end
