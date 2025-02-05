require 'rails_helper'

RSpec.describe DisplayOrderValidator do
  let(:menu_section) { build(:menu_section) }
  let(:section_item) { build(:section_item) }
  let(:modifier) { build(:modifier) }

  shared_examples 'validates display order' do |model_name|
    context "when testing #{model_name}" do
      it 'is valid with a positive integer' do
        subject.display_order = 1
        expect(subject).to be_valid
      end

      it 'is invalid with zero' do
        subject.display_order = 0
        expect(subject).not_to be_valid
        expect(subject.errors[:display_order]).to include('must be a positive integer')
      end

      it 'is invalid with a negative number' do
        subject.display_order = -1
        expect(subject).not_to be_valid
        expect(subject.errors[:display_order]).to include('must be a positive integer')
      end

      it 'is invalid with nil' do
        subject.display_order = nil
        expect(subject).not_to be_valid
        expect(subject.errors[:display_order]).to include('must be a positive integer')
      end
    end
  end

  describe 'validations' do
    it_behaves_like 'validates display order', 'MenuSection' do
      subject { menu_section }
    end

    it_behaves_like 'validates display order', 'SectionItem' do
      subject { section_item }
    end

    it_behaves_like 'validates display order', 'Modifier' do
      subject { modifier }
    end
  end
end
