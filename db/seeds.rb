# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
menu = Menu.create!(
  identifier: "sample_menu",
  label: "Sample Menu"
)

section1 = Section.create!(
  identifier: "non_configurable",
  label: "Non-configurable Items"
)

section2 = Section.create!(
  label: "Configurable Items",
  identifier: "configurable"
)

# Create menu sections with display order
MenuSection.create!(menu: menu, section: section1, display_order: 1)
MenuSection.create!(menu: menu, section: section2, display_order: 2)

# Base items should be Products
item1 = Product.create!(label: "Burger", price: 10.99)
item2 = Product.create!(label: "Fries", price: 3.99)
pizza = Product.create!(label: "Pizza", price: 12.99)

# Create section items with display order
SectionItem.create!(section: section1, item: item1, display_order: 2)
SectionItem.create!(section: section1, item: item2, display_order: 1)
SectionItem.create!(section: section2, item: pizza, display_order: 1)

# Modifier items should be Components
small = Component.create!(label: "Small", price: 0.00)
medium = Component.create!(label: "Medium", price: 2.00)

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

# Add crust components
thin = Component.create!(label: "Thin Crust", price: 1.00)
thick = Component.create!(label: "Thick Crust", price: 1.00)

# Create topping components
toppings = [
  Component.create!(label: "Pepperoni", price: 1.50),
  Component.create!(label: "Mushrooms", price: 1.00),
  Component.create!(label: "Bell Peppers", price: 1.00),
  Component.create!(label: "Onions", price: 1.00),
  Component.create!(label: "Extra Cheese", price: 2.00)
]

# When creating modifiers, add display_order
size_group.modifiers.create!(item: small, default_quantity: 1, display_order: 1)
size_group.modifiers.create!(item: medium, default_quantity: 0, display_order: 2)
size_group.modifiers.create!(item: large, default_quantity: 0, display_order: 3)

crust_group.modifiers.create!(item: thin, default_quantity: 1, display_order: 1)
crust_group.modifiers.create!(item: thick, default_quantity: 0, display_order: 2)

# For toppings, use each_with_index to set display_order
toppings.each_with_index do |topping, index|
  toppings_group.modifiers.create!(
    item: topping, 
    default_quantity: 0, 
    display_order: index + 1
  )
end
