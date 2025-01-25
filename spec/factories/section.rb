FactoryBot.define do
  factory :section do
    sequence(:label) { |n| "Section #{n}" }
    association :menu  # This assumes you have a factory for the Menu model

    # You can add additional attributes here if your Section model has more fields
  end
end
