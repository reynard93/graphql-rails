class MenuSection < ApplicationRecord
  belongs_to :menu
  belongs_to :section
  
  validates :display_order, presence: true, numericality: { only_integer: true }
end
