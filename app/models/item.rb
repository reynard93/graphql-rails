class Item < ApplicationRecord
  has_many :section_items
  has_many :sections, through: :section_items

  has_many :item_modifier_groups
  has_many :modifier_groups, through: :item_modifier_groups

  has_many :modifiers
  has_many :modifier_items, through: :modifiers, source: :item
end
