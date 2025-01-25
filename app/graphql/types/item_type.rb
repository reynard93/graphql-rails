module Types
  class ItemType < Types::BaseObject
    field :id, ID, null: false
    field :label, String, null: false
    field :price, Float, null: false
    field :modifier_groups, [ Types::ModifierGroupType ], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, camelize: true
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false, camelize: true
  end
end
