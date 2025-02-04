FactoryBot.define do
  factory :item do
    sequence(:identifier) { |n| "item_#{n}" }
    sequence(:label) { |n| "Item #{n}" }
    price { 9.99 }

    transient do
      sections { [] }
    end

    after(:create) do |item, evaluator|
      evaluator.sections.each_with_index do |section, index|
        create(:section_item, section: section, item: item, display_order: index + 1)
      end
    end

    factory :component, class: 'Component'
    factory :product, class: 'Product'
  end
end
