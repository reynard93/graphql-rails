import { Button } from "antd";
import { MenuItem as MenuItemType } from "../types/menu";

interface MenuItemProps {
  item: MenuItemType;
  sectionIsAvailable: boolean;
  onSelect: (item: MenuItemType) => void;
}

const getButtonText = (sectionAvailable: boolean, itemSoldOut: boolean | undefined): string => {
  if (!sectionAvailable) return 'Not available';
  if (itemSoldOut) return 'Sold out';
  return 'Add';
};

const MenuItem: React.FC<MenuItemProps> = ({ item, sectionIsAvailable, onSelect }) => {
  return (
    <div 
      className={`flex flex-col shadow-lg overflow-hidden ${!sectionIsAvailable ? 'opacity-50' : ''}`}
      onClick={() => onSelect(item)}
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
          <div className="flex flex-col items-stretch sm:items-center justify-between justify-items-stretch sm:flex-row">
            <div className="space-x-1 font-medium sm:w-auto text-md text-default w-full mb-3 sm:mb-0">
              ${item.price.toFixed(2)}
            </div>
            <div className="w-full sm:w-auto">
              <Button
                type="primary"
                className={`w-full sm:w-auto border-none !rounded-none ${(!sectionIsAvailable || item.isSoldOut) ? 'opacity-50' : ''}`}
              >
                {getButtonText(sectionIsAvailable, item.isSoldOut)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;