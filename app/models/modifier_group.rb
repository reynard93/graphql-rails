class ModifierGroup < ApplicationRecord
  has_many :item_modifier_groups
  has_many :items, through: :item_modifier_groups
  has_many :modifiers

  validates :selection_required_min, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :selection_required_max, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validate :max_greater_than_or_equal_to_min

  private

  def max_greater_than_or_equal_to_min
    return unless selection_required_min.present? && selection_required_max.present?

    if selection_required_max < selection_required_min
      errors.add(:selection_required_max, "must be greater than or equal to minimum required selections")
    end
  end
end
