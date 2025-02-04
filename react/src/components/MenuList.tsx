import { Typography, Button } from "antd";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MenuItemModal from "./MenuItemModal";

const { Title, Text } = Typography;

// TODO, move the types to a separate file
interface MenuItem {
  id: string;
  label: string;
  price: number;
  image?: string;
  modifierGroups: {
    id: string;
    label: string;
    items: {
      id: string;
      label: string;
      price: number;
    }[];
  }[];
}

interface Section {
  id: string;
  label: string;
  items: MenuItem[];
  isAvailable: boolean;
}

interface Menu {
  id: string;
  label: string;
  sections: Section[];
}

const MenuList: React.FC<{menu: Menu}> = ({menu}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const getSectionDescription = (sectionLabel: MenuItem["label"]): string => {
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
              <div 
                key={item.id}
                className={`flex flex-col shadow-lg overflow-hidden ${!section.isAvailable ? 'opacity-50' : ''}`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex-shrink-0">
                  <div className="relative w-full overflow-hidden" style={{ paddingTop: '100%' }}>
                    <img
                      alt={item.label}
                      src={`${import.meta.env.BASE_URL}images/${item.label}.jpg`}
                      className="absolute top-0 object-cover w-full h-full transition-transform hover:scale-110"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1 p-3 sm:p-4.5 bg-white">
                  <div>
                    <p className="mb-3 text-base font-medium text-gray-900 line-clamp-2">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="font-bold text-md mb-3 sm:mb-0">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="w-full sm:w-auto">
                        <Button
                          type="primary"
                          className="w-full sm:w-auto border-none !rounded-none"
                        >
                          { section.isAvailable ? 'Add' : 'Not available' }
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
