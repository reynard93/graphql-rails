module Types
  class SectionType < Types::BaseObject
    field :id, ID, null: false
    field :identifier, String, null: true
    field :label, String, null: true
    field :description, String, null: true
    field :menu_section, Types::MenuSectionType, null: true
    field :items, [ Types::ItemType ], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    def items
      object.section_items.includes(:item).order(:display_order).map(&:item)
    end
  end
end
