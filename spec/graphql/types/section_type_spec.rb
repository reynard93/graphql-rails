require 'rails_helper'

RSpec.describe Types::SectionType do
  let(:type) { described_class }
  let(:section) {
    create(:section,
      label: "Main Dishes",
      identifier: "main_dishes"
    )
  }
  let!(:items) { create_list(:item, 3, sections: [ section ]) }

  describe 'resolvers' do
    it 'returns the correct values for a section' do
      query_string = <<-GRAPHQL
        query($id: ID!) {
          section(id: $id) {
            id
            label
            items {
              id
              label
            }
            createdAt
            updatedAt
          }
        }
      GRAPHQL

      result = RailsGrainGraphqlSchema.execute(
        query_string,
        variables: { id: section.id.to_s },
        context: {}
      )

      section_data = result["data"]["section"]
      expect(section_data["id"]).to eq(section.id.to_s)
      expect(section_data["label"]).to eq("Main Dishes")
      expect(section_data["items"].length).to eq(3)
      expect(section_data["createdAt"]).to be_present
      expect(section_data["updatedAt"]).to be_present
    end
  end
end
