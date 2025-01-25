# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_label|
#     MovieGenre.find_or_create_by!(label: genre_name)
#   end

menu = Menu.create!(
  identifier: "sample_menu",
  label: "Sample Menu"
)

section1 = menu.sections.create!(
  identifier: "non_configurable",
  label: "Non-configurable Items"
)

section2 = menu.sections.create!(label: "Configurable Items", identifier: "configurable")
# Base items should be Products
item1 = Product.create!(label: "Burger", price: 10.99)
item2 = Product.create!(label: "Fries", price: 3.99)
pizza = Product.create!(label: "Pizza", price: 12.99)

# Modifier items should be Components
small = Component.create!(label: "Small", price: 0.00)
medium = Component.create!(label: "Medium", price: 2.00)
section1.items << [ item1, item2 ]

section2.items << pizza

size_group = ModifierGroup.create!(
  label: "Size",
  selection_required_min: 1,
  selection_required_max: 1
)
pizza.item_modifier_groups.create!(modifier_group: size_group)

crust_group = ModifierGroup.create!(
  label: "Crust",
  selection_required_min: 1,
  selection_required_max: 1
)
pizza.item_modifier_groups.create!(modifier_group: crust_group)

toppings_group = ModifierGroup.create!(
  label: "Toppings",
  selection_required_min: 0,
  selection_required_max: 5
)
pizza.item_modifier_groups.create!(modifier_group: toppings_group)

small = Component.create!(label: "Small")
medium = Component.create!(label: "Medium", price: 2.00)
large = Component.create!(label: "Large", price: 4.00)

size_group.modifiers.create!(item: small, default_quantity: 1)
size_group.modifiers.create!(item: medium, default_quantity: 0)
size_group.modifiers.create!(item: large, default_quantity: 0)

thin = Component.create!(label: "Thin Crust")
thick = Component.create!(label: "Thick Crust", price: 1.00)

crust_group.modifiers.create!(item: thin, default_quantity: 1)
crust_group.modifiers.create!(item: thick, default_quantity: 0)

toppings = [ "Cheese", "Pepperoni", "Mushrooms", "Onions", "Olives" ].map do |topping|
  Component.create!(label: topping, price: 1.00)
end

toppings.each do |topping|
  toppings_group.modifiers.create!(item: topping, default_quantity: 0)
end
