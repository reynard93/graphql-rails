require 'rails_helper'

RSpec.describe Types::ItemType do
  let(:type) { described_class }
  let(:item) {
    create(:item,
      label: "Cheeseburger",
      price: 12.99
    )
  }
  let!(:modifier_groups) { create_list(:modifier_group, 2, items: [ item ]) }

  describe 'resolvers' do
    it 'returns the correct values for an item' do
      query_string = <<-GRAPHQL
        query($id: ID!) {
          item(id: $id) {
            id
            label
            price
            modifierGroups {
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
        variables: { id: item.id.to_s },
        context: {}
      )

      item_data = result["data"]["item"]
      expect(item_data["id"]).to eq(item.id.to_s)
      expect(item_data["label"]).to eq("Cheeseburger")
      expect(item_data["price"]).to eq(12.99)
      expect(item_data["modifierGroups"].length).to eq(2)
      expect(item_data["createdAt"]).to be_present
      expect(item_data["updatedAt"]).to be_present
    end
  end

  describe 'items query with section filter' do
    let(:section) { create(:section) }
    let!(:section_items) { create_list(:item, 3, sections: [ section ]) }
    let!(:other_items) { create_list(:item, 2) }

    it 'returns filtered items when section_id is provided' do
      query_string = <<-GRAPHQL
        query($sectionId: ID!) {
          items(sectionId: $sectionId) {
            id
            label
          }
        }
      GRAPHQL

      result = RailsGrainGraphqlSchema.execute(
        query_string,
        variables: { sectionId: section.id.to_s },
        context: {}
      )

      items_data = result["data"]["items"]
      expect(items_data.length).to eq(3)
    end
  end
end
