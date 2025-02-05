FactoryBot.define do
  factory :menu_section do
    menu
    section
    display_order { 1 }
  end
end