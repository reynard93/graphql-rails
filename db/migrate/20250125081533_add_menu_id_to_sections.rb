class AddMenuIdToSections < ActiveRecord::Migration[7.0]
  def change
    add_reference :sections, :menu, foreign_key: true
  end
end
