module Types
  class ModifierGroupType < Types::BaseObject
    field :id, ID, null: false
    field :identifier, String, null: true
    field :label, String, null: false
    field :selection_required_min, Integer, null: false
    field :selection_required_max, Integer, null: false
    field :modifiers, [Types::ModifierType], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
