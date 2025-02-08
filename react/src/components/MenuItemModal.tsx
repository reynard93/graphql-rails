import { Button } from "antd";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MenuItem } from "../types/menu";

interface MenuItemModalProps {
  item: MenuItem;
  onClose: () => void;
  isAvailable: boolean;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({ item, onClose, isAvailable }) => {
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
        className="fixed inset-0 w-screen h-screen bg-black/90 z-40"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed z-50 bg-white
          w-full h-full
          inset-0
          lg:w-4/5 lg:h-4/5 lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
          md:w-[90%] md:h-[90%] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          sm:w-[95%] sm:h-[95%] sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
          overflow-y-auto"
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="relative w-full md:w-1/2 h-[30vh] md:h-full sticky top-0">   
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 right-4 z-10 cursor-pointer !text-xl hover:text-gray-700 md:hidden bg-white/80 w-8 h-8 flex items-center justify-center rounded-full"
            >
              ✕
            </button>
            <img
              src={`images/${item.label}.jpg`}
              alt={item.label}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 pt-4 px-4 flex flex-col h-full">
            <div className="hidden md:flex justify-end">
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
            <div className="mt-2">
              <h2 className="text-2xl font-bold mb-2">{item.label}</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </p>
            </div>
            
            {item.modifierGroups.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Customization Options</h3>
                {item.modifierGroups.map((group) => (
                  <div key={group.id} className="mb-4">
                    <h4 className="font-medium mb-2">{group.label}</h4>
                    {/* Add modifier options here */}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto sticky bottom-0 bg-gray-200 -mx-4 p-4">
              <div className="flex flex-col md:flex-row items-stretch gap-4">
                {isAvailable ? (
                  <>
                    <div className="flex items-center bg-white w-full md:w-1/3 h-12 md:min-h-[48px] border-1">
                      <button 
                        disabled={item?.isSoldOut}
                        onClick={handleDecrement} 
                        className="!text-2xl px-4 h-full cursor-pointer"
                      >−</button>
                      <span className="text-lg font-medium flex-1 text-center">{quantity}</span>
                      <button 
                        disabled={item?.isSoldOut}
                        onClick={handleIncrement} 
                        className="!text-2xl px-4 h-full cursor-pointer"
                      >+</button>
                    </div>
                    <Button
                      type="primary"
                      size="large"
                      disabled={item?.isSoldOut}
                      className="w-full h-12 md:flex-1 !rounded-none md:min-h-[48px] flex items-center justify-center gap-2"
                    >
                      <span>Add</span>
                      <span className="text-white/80">(${item.price.toFixed(2)})</span>
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                    <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                    <Button
                      type="primary"
                      size="large"
                      className="w-full md:w-auto !rounded-none h-12 md:min-h-[48px]"
                    >
                      Not Available
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MenuItemModal;