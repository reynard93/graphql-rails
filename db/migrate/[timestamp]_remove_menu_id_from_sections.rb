class RemoveMenuIdFromSections < ActiveRecord::Migration[8.0]
  def change
    remove_reference :sections, :menu, foreign_key: true
  end
end