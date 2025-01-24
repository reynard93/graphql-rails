
module MenuService
  class FetchMenu
    def initialize(menu_id)
      @menu_id = menu_id
    end

    def call
      Menu.includes(sections: { items: { modifier_groups: :modifiers } })
          .find(@menu_id)
    end
  end
end
