module Resolvers
  class ModifierGroupResolver < Resolvers::BaseResolver
    type Types::ModifierGroupType, null: true
    argument :id, ID, required: true

    def resolve(id:)
      ModifierGroup.find(id)
    end
  end
end