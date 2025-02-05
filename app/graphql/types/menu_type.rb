module Types
  class MenuType < Types::BaseObject
    field :id, ID, null: false
    field :identifier, String, null: true
    field :label, String, null: false
    field :state, String, null: true
    field :start_date, GraphQL::Types::ISO8601Date, null: true
    field :end_date, GraphQL::Types::ISO8601Date, null: true
    field :sections, [ Types::SectionType ], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :is_active, Boolean, null: false

    def sections
      object.sections.includes(:menu_section).order("menu_sections.display_order")
    end

    def is_active
      return true if object.start_date.nil?

      current_time = Time.current.in_time_zone("UTC").to_date
      start_date = object.start_date.to_date

      if object.end_date
        end_date = object.end_date.to_date
        return current_time >= start_date && current_time <= end_date
      end

      current_time >= start_date
    end
  end
end
