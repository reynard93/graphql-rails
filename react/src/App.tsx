import React from "react";
import { useQuery, gql } from "@apollo/client";
import MenuList from "./components/MenuList";

import { Layout, Spin, Anchor } from "antd";
import "antd/dist/reset.css";

const { Content } = Layout;

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

// TODO: remove dupe types here
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

const App: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { loading, error, data } = useQuery<{ menu: Menu }>(GET_MENU);

  if (loading)
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.menu) return <p>No menu data found</p>;

  const menuWithStubSection = {
    ...data.menu,
    sections: [
      ...data.menu.sections.map(section => ({...section, isAvailable: true})),
      {
        id: 'stub-section-2',
        label: 'Popular Items',
        isAvailable: true,
        items: [
          {
            id: 'stub-1',
            label: 'Burger',
            price: 15.99,
            modifierGroups: [],
            isSoldOut: true
          },
          {
            id: 'stub-2',
            label: 'Pizza',
            price: 24.99,
            modifierGroups: [],
          },
          {
            id: 'stub-3',
            label: 'Fries',
            price: 18.99,
            modifierGroups: [],
          }
        ],
      },
      {
        id: 'stub-section',
        label: 'Featured Items',
        items: [
          {
            id: 'featured-1',
            label: 'Burger',
            price: 15.99,
            modifierGroups: []
          },
          {
            id: 'featured-2',
            label: 'Pizza',
            price: 24.99,
            modifierGroups: []
          },
          {
            id: 'featured-3',
            label: 'Fries',
            price: 18.99,
            modifierGroups: []
          }
        ],
        isAvailable: false
      }
    ]
  };

  return (
    <Content className="p-8">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8">
        <div className="fixed bottom-0 left-0 right-0 bg-white z-10 md:static md:w-64 md:flex-shrink-0">
          <div className="md:fixed md:w-56">
            <Anchor
              className="md:p-4 md:w-56"
              direction={isMobile ? 'horizontal' : 'vertical'}
              targetOffset={100}
              items={menuWithStubSection.sections.map((section) => ({
                key: section.id,
                href: `#${section.id}`,
                title: section.label,
              }))}
            />
          </div>
        </div>
        <div className="flex-1 pb-16 md:pb-0">
          <MenuList menu={menuWithStubSection} />
        </div>
      </div>
    </Content>
  );
};

export default App;
