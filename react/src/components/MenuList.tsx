import { Typography } from "antd";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MenuItemModal from "./MenuItemModal";
import MenuItem from "./MenuItem";
import { Menu, MenuItem as MenuItemType } from "../types/menu";

const { Title, Text } = Typography;

const MenuList: React.FC<{menu: Menu}> = ({menu}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

  const getSectionDescription = (sectionLabel: MenuItemType["label"]): string => {
    switch (sectionLabel) {
      case "Non-configurable Items":
        return "This is Burger Peasant not Burger King you CAN'T have it your way.";
      case "Configurable Items":
        return "At Pizza King you can have it your way. We have a wide variety of toppings to choose from.";
      default:
        return "Explore our delicious menu items.";
    }
  };

  return (
    <div className="space-y-8">
      {menu.sections.map((section) => (
        <div key={section.id} id={section.id} className={!section.isAvailable ? 'opacity-50' : ''}>
          <Title level={3} className="mb-2">
            {section.label}
          </Title>
          {!section.isAvailable && (
            <div className="text-red-500 font-normal text-sm my-4 block">
              Only available on Fri, Sat and Sun
            </div>
          )}
          <Text className="block text-gray-600 mb-4">
            {getSectionDescription(section.label)}
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {section.items.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                sectionIsAvailable={section.isAvailable}
                onSelect={setSelectedItem}
              />
            ))}
          </div>
        </div>
      ))}
      <AnimatePresence>
        {selectedItem && (
          <MenuItemModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
            isAvailable={menu.sections.find(section => 
              section.items.some(item => item.id === selectedItem.id)
            )?.isAvailable ?? true}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuList;
