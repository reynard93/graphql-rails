require 'rails_helper'

RSpec.describe Types::MenuType do
  let(:type) { described_class }
  let(:menu) {
    create(:menu,
      label: "Lunch Menu",
      identifier: "lunch_menu"
    )
  }
  let!(:sections) { create_list(:section, 3, menu: menu) }

  describe 'resolvers' do
    it 'returns the correct values for a menu' do
      query_string = <<-GRAPHQL
        query($id: ID!) {
          menu(id: $id) {
            id
            label
            sections {
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
        variables: { id: menu.id.to_s },
        context: {}
      )

      menu_data = result["data"]["menu"]
      expect(menu_data["id"]).to eq(menu.id.to_s)
      expect(menu_data["label"]).to eq("Lunch Menu")
      expect(menu_data["sections"].length).to eq(3)
      expect(menu_data["createdAt"]).to be_present
      expect(menu_data["updatedAt"]).to be_present
    end
  end

  describe 'validation' do
    it 'requires label to be present' do
      invalid_menu = build(:menu, label: nil)
      expect(invalid_menu).not_to be_valid
      expect(invalid_menu.errors[:label]).to include("can't be blank")
    end

    it 'allows sections to be empty' do
      menu_without_sections = create(:menu)
      query_string = <<-GRAPHQL
        query($id: ID!) {
          menu(id: $id) {
            sections {
              id
            }
          }
        }
      GRAPHQL

      result = RailsGrainGraphqlSchema.execute(
        query_string,
        variables: { id: menu_without_sections.id.to_s },
        context: {}
      )

      expect(result["data"]["menu"]["sections"]).to eq([])
    end
  end
end
