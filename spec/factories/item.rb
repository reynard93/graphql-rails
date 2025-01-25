FactoryBot.define do
  factory :item do
    sequence(:identifier) { |n| "item_#{n}" }
    sequence(:label) { |n| "Item #{n}" }
    price { 9.99 }

    factory :component, class: 'Component'
    factory :product, class: 'Product'
  end
end
