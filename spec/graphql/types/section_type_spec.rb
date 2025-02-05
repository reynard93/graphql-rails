require 'rails_helper'

RSpec.describe Types::SectionType do
  let(:type) { described_class }
  let(:section) {
    create(:section,
      label: "Main Dishes",
      identifier: "main_dishes"
    )
  }

  describe 'resolvers' do
    it 'returns the correct values for a section' do
      # Create test items for this specific test
      create_list(:item, 3, sections: [ section ])

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

  describe 'item ordering' do
    it 'returns items in the correct display order' do
      # Create items with specific display orders
      3.times.map do |i|
        item = create(:item, label: "Item #{i + 1}")
        create(:section_item, section: section, item: item, display_order: i + 1)
        item
      end

      query_string = <<-GRAPHQL
        query($id: ID!) {
          section(id: $id) {
            items {
              id
              label
            }
          }
        }
      GRAPHQL

      result = RailsGrainGraphqlSchema.execute(
        query_string,
        variables: { id: section.id.to_s },
        context: {}
      )

      items_data = result["data"]["section"]["items"]
      # Verify items are returned in ascending display_order
      items_data.each_with_index do |item_data, index|
        expect(item_data["label"]).to eq("Item #{index + 1}")
      end
    end
  end
end
