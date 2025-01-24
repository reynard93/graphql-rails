class Section < ApplicationRecord
  belongs_to :menu
  has_many :section_items
  has_many :items, through: :section_items
end
