class SectionItem < ApplicationRecord
  belongs_to :section
  belongs_to :item

  validates :display_order, display_order: true
end
