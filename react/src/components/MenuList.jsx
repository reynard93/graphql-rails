import { useQuery, gql } from '@apollo/client';
import { Card, Row, Col, Button, Typography } from 'antd';

const { Title, Text } = Typography;

const GET_MENU_ITEMS = gql`
  query GetMenu {
    menu(id: 1) {
      sections {
        label
        items {
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
            }
          }
        }
      }
    }
  }
`;

function MenuList() {
  const { loading, error, data } = useQuery(GET_MENU_ITEMS);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;

  return (
    <div>
      {data?.menu?.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <Title level={4} className="mb-4">{section.label}</Title>
          <Row gutter={[16, 16]}>
            {section.items.map((item, itemIndex) => (
              <Col xs={24} sm={12} md={8} lg={6} key={itemIndex}>
                <Card
                  hoverable
                  className="h-full"
                  cover={
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <Text className="text-gray-500">Image Placeholder</Text>
                    </div>
                  }
                >
                  <Card.Meta
                    title={item.label}
                    description={
                      <div>
                        <Text className="text-lg font-semibold">${item.price.toFixed(2)}</Text>
                        {item.modifierGroups?.length > 0 && (
                          <div className="mt-2">
                            <Text type="secondary">Customizable</Text>
                          </div>
                        )}
                      </div>
                    }
                  />
                  <Button type="primary" className="w-full mt-4">
                    Add to Cart
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}

export default MenuList;