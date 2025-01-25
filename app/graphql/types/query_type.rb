module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [ Types::NodeType, null: true ], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ ID ], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    field :menu, MenuType, null: false do
      argument :id, ID, required: true
    end

    def menu(id:)
      Menu.find(id)
    end

    field :section, SectionType, null: false do
      argument :id, ID, required: true
    end

    def section(id:)
      Section.find(id)
    end

    field :modifier_group, ModifierGroupType, null: true do
      argument :id, ID, required: true
    end

    def modifier_group(id:)
      ModifierGroup.find(id)
    end

    field :item, ItemType, null: false do
      argument :id, ID, required: true
    end

    def item(id:)
      Item.find(id)
    end

    field :items, [ ItemType ], null: false do
      argument :section_id, ID, required: false
    end

    def items(section_id: nil)
      section_id ? Section.find(section_id).items : Item.all
    end
  end
end
