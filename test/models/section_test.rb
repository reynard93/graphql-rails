require "test_helper"

# this test eems to ahve issue

class SectionTest < ActiveSupport::TestCase
  test "section belongs to menu through menu_section" do
    menu = Menu.create!(label: "Test Menu")
    section = Section.create!(label: "Test Section")
    menu_section = MenuSection.create!(menu: menu, section: section, display_order: 1)
    
    assert_equal menu, section.menu
    assert_equal section, menu.sections.first
  end
end
