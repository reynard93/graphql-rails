module Resolvers
  class SectionResolver < Resolvers::BaseResolver
    type Types::SectionType, null: false
    argument :id, ID, required: true

    def resolve(id:)
      Section.find(id)
    end
  end
end