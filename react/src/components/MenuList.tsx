import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MenuItemModal from "./MenuItemModal";
import Section from "./Section";
import { Menu, MenuItem as MenuItemType } from "../types/menu";

const MenuList: React.FC<{menu: Menu}> = ({menu}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

  return (
    <div className="space-y-8">
      {menu.sections.map((section) => (
        <Section
          key={section.id}
          section={section}
          onSelectItem={setSelectedItem}
        />
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
