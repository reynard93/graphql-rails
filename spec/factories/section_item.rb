FactoryBot.define do
  factory :section_item do
    section
    item
    display_order { 1 }
  end
end
