FactoryBot.define do
  factory :menu do
    sequence(:identifier) { |n| "menu_#{n}" }
    sequence(:label) { |n| "Menu #{n}" }
    state { "active" }  # Adjust this based on your model's attributes
    start_date { Date.today }
    end_date { Date.today + 30.days }
  end
end
