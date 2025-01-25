FactoryBot.define do
  factory :modifier do
    association :item, factory: :component
    association :modifier_group
    display_order { 1 }
    default_quantity { 1 }
    price_override { 1.5 }
  end
end
