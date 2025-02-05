module Types
  class MenuSectionType < Types::BaseObject
    field :id, ID, null: false
    field :menu, Types::MenuType, null: false
    field :section, Types::SectionType, null: false
    field :display_order, Integer, null: false
  end
end