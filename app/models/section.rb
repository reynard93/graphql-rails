class Section < ApplicationRecord
  has_one :menu_section
  has_one :menu, through: :menu_section
  has_many :section_items
  has_many :items, through: :section_items
end
