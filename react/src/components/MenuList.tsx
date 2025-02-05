import { useQuery, gql } from "@apollo/client";
import { Card, Col, Row, Spin, Typography, Button } from "antd";

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
  const { loading, error, data } = useQuery<{ menu: Menu }>(GET_MENU);

  if (loading)
    return (
      <Spin size="large" className="flex justify-center items-center h-64" />
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.menu) return <p>No menu data found</p>;

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
                  className="h-full"
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
                            size="small"
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
    </div>
  );
};

export default MenuList;
