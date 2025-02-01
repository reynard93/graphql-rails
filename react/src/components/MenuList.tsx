import { useQuery, gql } from '@apollo/client';
import { Card, Col, Row, Spin } from 'antd';

interface MenuItem {
  id: string;
  label: string;
  price: number;
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
        }
      }
    }
  }
`;

const MenuList: React.FC = () => {
  const { loading, error, data } = useQuery<{ menu: Menu }>(GET_MENU);

  if (loading) return <Spin size="large" className="flex justify-center items-center h-64" />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.menu) return <p>No menu data found</p>;

  return (
    <div className="space-y-8">
      {data.menu.sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-2xl font-bold mb-4">{section.label}</h2>
          <Row gutter={[16, 16]}>
            {section.items.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  className="h-full"
                  title={item.label}
                >
                  <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
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