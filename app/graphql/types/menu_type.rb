
# app/graphql/types/menu_type.rb
module Types
  class MenuType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :sections, [ Types::SectionType ], null: false
  end
class SectionType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :items, [ Types::ItemType ], null: false
end
class ItemType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :price, Float, null: false
    field :modifier_groups, [ Types::ModifierGroupType ], null: true
end
class ModifierGroupType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :minimum_required, Integer, null: false
    field :maximum_required, Integer, null: false
    field :modifiers, [ Types::ModifierType ], null: false
end
class ModifierType < Types::BaseObject
    field :id, ID, null: false
    field :item, Types::ItemType, null: false
    field :default_quantity, Integer, null: false
end
class QueryType < Types::BaseObject
    field :menu, Types::MenuType, null: false do
      argument :id, ID, required: true
    end

    def menu(id:)
      Menu.find(id)
    end

    field :menus, [ Types::MenuType ], null: false

    def menus
      Menu.all
    end
end
end
