class Menu < ApplicationRecord
  has_many :menu_sections
  has_many :sections, -> { order('menu_sections.display_order') }, through: :menu_sections
  
  validates :label, presence: true
end
