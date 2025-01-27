module Resolvers
  class MenuResolver < Resolvers::BaseResolver
    type Types::MenuType, null: false
    argument :id, ID, required: true

    def resolve(id:)
      Menu.find(id)
    end
  end
end
