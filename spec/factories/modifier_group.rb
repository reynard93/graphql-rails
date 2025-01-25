FactoryBot.define do
  factory :modifier_group do
    sequence(:identifier) { |n| "modifier_group_#{n}" }
    sequence(:label) { |n| "Modifier Group #{n}" }
    selection_required_min { 1 }
    selection_required_max { 3 }
  end
end
