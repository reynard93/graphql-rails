import { Button } from "antd";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

interface MenuItemModalProps {
  item: MenuItem;
  onClose: () => void;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <>
      <motion.div
        data-testid="modal-overlay"

        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-40 min-h-screen min-w-full"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-4/5 h-4/5 overflow-hidden"
      >
        <div className="flex h-full">
          <div className="w-1/2">   
            <img
              src={`images/${item.label}.jpg`}
              alt={item.label}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 p-4 flex flex-col h-full">
            <div className="flex justify-end mb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="cursor-pointer !text-xl hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">{item.label}</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus excepturi, tempora quae maiores cum reprehenderit molestiae voluptatem exercitationem. Dolor sequi ducimus quae impedit pariatur sunt ipsum animi porro voluptatum ullam?
              </p>
            </div>
            
            {item.modifierGroups.length > 0 && (
              <div className="flex-grow overflow-y-auto">
                <h3 className="text-lg font-semibold mb-3">Customization Options</h3>
                {item.modifierGroups.map((group) => (
                  <div key={group.id} className="mb-4">
                    <h4 className="font-medium mb-2">{group.label}</h4>
                    {/* Add modifier options here */}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto bg-gray-200 -mx-4 -mb-8 p-8">
              <div className="flex items-stretch gap-4">
                <div className="flex items-center bg-white w-1/3 min-h-[48px] border-1">
                  <button onClick={handleDecrement} className="!text-2xl px-4 h-full cursor-pointer">−</button>
                  <span className="text-lg font-medium flex-1 text-center">{quantity}</span>
                  <button onClick={handleIncrement} className="!text-2xl px-4 h-full cursor-pointer">+</button>
                </div>
                <Button
                  type="primary"
                  size="large"
                  className="bg-[#ff6b4a] hover:bg-[#ff5a35] border-none hover:!bg-[#e85e40] flex-1 !rounded-none min-h-[48px] flex items-center justify-center gap-2"
                >
                  <span>Add</span>
                  <span className="text-white/80">(${item.price.toFixed(2)})</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MenuItemModal;