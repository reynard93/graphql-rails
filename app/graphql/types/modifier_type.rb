module Types
  class ModifierType < Types::BaseObject
    field :id, ID, null: false
    field :item, Types::ItemType, null: false
    field :display_order, Integer, null: false
    field :default_quantity, Integer, null: false
    field :price_override, Float, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
