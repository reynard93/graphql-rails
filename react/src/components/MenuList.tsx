import { useQuery, gql } from "@apollo/client";
import { Card, Col, Row, Spin, Typography, Button } from "antd";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const { Title, Text } = Typography;

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
}

interface Menu {
  id: string;
  label: string;
  sections: Section[];
}

const GET_MENU = gql`
  query GetMenu {
    menu(id: 1) {
      id
      label
      sections {
        id
        label
        items {
          id
          label
          price
          modifierGroups {
            label
            selectionRequiredMin
            selectionRequiredMax
            modifiers {
              item {
                label
                price
              }
              defaultQuantity
            }
          }
        }
      }
    }
  }
`;

const MenuList: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { loading, error, data } = useQuery<{ menu: Menu }>(GET_MENU);

  if (loading)
    return (
      <Spin size="large" className="flex justify-center items-center h-64" />
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.menu) return <p>No menu data found</p>;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const getSectionDescription = (sectionLabel: string) => {
    switch (sectionLabel) {
      case 'Non-configurable Items':
        return "This is Burger Peasant not Burger King you CAN'T have it your way.";
      case 'Configurable Items':
        return "At Pizza King you can have it your way. We have a wide variety of toppings to choose from.";
      default:
        return "Explore our delicious menu items.";
    }
  };

  return (
    <div className="space-y-8">
      {data.menu.sections.map((section) => (
        <div key={section.id}>
          <Title level={4} className="mb-2">
            {section.label}
          </Title>
          <Text className="block text-gray-600 mb-4">
            {getSectionDescription(section.label)}
          </Text>
          <Row gutter={[16, 16]}>
            {section.items.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  className="h-full cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                  cover={
                    <img
                      alt={item.label}
                      src={`${import.meta.env.BASE_URL}images/${
                        item.label
                      }.jpg`}
                      className="h-48 object-cover w-full"
                    />
                  }
                >
                  <Card.Meta
                    title={item.label}
                    description={
                      <div>
                        <Text className="text-gray-500 mb-3 line-clamp-3">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Rem tenetur consequuntur eveniet cumque suscipit
                          ad atque distinctio delectus unde in, saepe, impedit
                          fuga quasi. Saepe error expedita omnis dolores ipsum!
                        </Text>
                        <div className="flex justify-between items-center mb-2">
                          <Text className="text-lg font-semibold">
                            ${item.price.toFixed(2)}
                          </Text>
                          <Button
                            type="primary"
                            className="bg-[#ff6b4a] hover:bg-[#ff5a35] border-none hover:!bg-[#e85e40]"
                          >
                            Add
                          </Button>
                        </div>
                        {item.modifierGroups.length > 0 && (
                          <Text className="text-gray-600">Customizable</Text>
                        )}
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/90 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl w-4/5 h-4/5 overflow-hidden"
            >
              <div className="flex h-full">
                <div className="w-1/2">
                  <img
                    src={`${import.meta.env.BASE_URL}images/${selectedItem.label}.jpg`}
                    alt={selectedItem.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-1/2 p-4 flex flex-col h-full">
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(null);
                      }}
                      className="cursor-pointer !text-xl hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">{selectedItem.label}</h2>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus excepturi, tempora quae maiores cum reprehenderit molestiae voluptatem exercitationem. Dolor sequi ducimus quae impedit pariatur sunt ipsum animi porro voluptatum ullam?
                    </p>
                  </div>
                  
                  {selectedItem.modifierGroups.length > 0 && (
                    <div className="flex-grow overflow-y-auto">
                      <h3 className="text-lg font-semibold mb-3">Customization Options</h3>
                      {selectedItem.modifierGroups.map((group) => (
                        <div key={group.id} className="mb-4">
                          <h4 className="font-medium mb-2">{group.label}</h4>
                          {/* Add modifier options here */}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4 bg-gray-200 -mx-8 -mb-8 p-6">
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
                        <span className="text-white/80">(${selectedItem.price.toFixed(2)})</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuList;
