FactoryBot.define do
  factory :section do
    sequence(:identifier) { |n| "section_#{n}" }
    sequence(:label) { |n| "Section #{n}" }
  end
end
