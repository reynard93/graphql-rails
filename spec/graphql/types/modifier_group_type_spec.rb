require 'rails_helper'

RSpec.describe Types::ModifierGroupType do
  let(:type) { described_class }
  let(:modifier_group) {
    create(:modifier_group,
      label: "Toppings",
      selection_required_min: 1,
      selection_required_max: 3
    )
  }
  let!(:modifiers) { create_list(:modifier, 3, modifier_group: modifier_group) }

  describe 'resolvers' do
    it 'returns the correct values for a modifier group' do
      # Create a test schema and execute a query
      query_string = <<-GRAPHQL
        query($id: ID!) {
          modifierGroup(id: $id) {
            id
            label
            selectionRequiredMin
            selectionRequiredMax
            modifiers {
              id
            }
          }
        }
      GRAPHQL

      result = RailsGrainGraphqlSchema.execute(
        query_string,
        variables: { id: modifier_group.id.to_s },
        context: {}
      )

      modifier_group_data = result["data"]["modifierGroup"]
      expect(modifier_group_data["id"]).to eq(modifier_group.id.to_s)
      expect(modifier_group_data["label"]).to eq("Toppings")
      expect(modifier_group_data["selectionRequiredMin"]).to eq(1)
      expect(modifier_group_data["selectionRequiredMax"]).to eq(3)
      expect(modifier_group_data["modifiers"].length).to eq(3)
    end
  end

  describe 'validation' do
    it 'requires selection_required_min to be present' do
      invalid_group = build(:modifier_group, selection_required_min: nil)
      expect(invalid_group).not_to be_valid
      expect(invalid_group.errors[:selection_required_min]).to include("can't be blank")
    end

    it 'requires selection_required_max to be present' do
      invalid_group = build(:modifier_group, selection_required_max: nil)
      expect(invalid_group).not_to be_valid
      expect(invalid_group.errors[:selection_required_max]).to include("can't be blank")
    end

    it 'requires max to be greater than or equal to min' do
      invalid_group = build(:modifier_group,
        selection_required_min: 3,
        selection_required_max: 1
      )
      expect(invalid_group).not_to be_valid
      expect(invalid_group.errors[:selection_required_max])
        .to include("must be greater than or equal to minimum required selections")
    end
  end
end
