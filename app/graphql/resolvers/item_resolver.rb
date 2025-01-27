module Resolvers
  class ItemResolver < Resolvers::BaseResolver
    type Types::ItemType, null: false
    argument :id, ID, required: true

    def resolve(id:)
      Item.find(id)
    end
  end

  class ItemsResolver < Resolvers::BaseResolver
    type [Types::ItemType], null: false
    argument :section_id, ID, required: false

    def resolve(section_id: nil)
      section_id ? Section.find(section_id).items : Item.all
    end
  end
end