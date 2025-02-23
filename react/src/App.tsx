import React from "react";
import { useQuery, gql } from "@apollo/client";
import MenuList from "./components/MenuList";
import { ConfigProvider, Layout, Spin, Anchor } from "antd";
import { theme } from "./styles/theme";
import "antd/dist/reset.css";
import { Menu } from "./types/menu";

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

const App: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { loading, error, data } = useQuery<{ menu: Menu }>(GET_MENU);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.menu) return <p>No menu data found</p>;

  const menuWithStubSection = {
    ...data.menu,
    sections: [
      ...data.menu.sections.map((section) => ({
        ...section,
        isAvailable: true,
      })),
      {
        id: "stub-section-2",
        label: "Popular Items",
        isAvailable: true,
        items: [
          {
            id: "stub-1",
            label: "Burger",
            price: 15.99,
            modifierGroups: [],
            isSoldOut: true,
          },
          {
            id: "stub-2",
            label: "Pizza",
            price: 24.99,
            modifierGroups: [],
          },
          {
            id: "stub-3",
            label: "Fries",
            price: 18.99,
            modifierGroups: [],
          },
        ],
      },
      {
        id: "stub-section",
        label: "Featured Items",
        items: [
          {
            id: "featured-1",
            label: "Burger",
            price: 15.99,
            modifierGroups: [],
          },
          {
            id: "featured-2",
            label: "Pizza",
            price: 24.99,
            modifierGroups: [],
          },
          {
            id: "featured-3",
            label: "Fries",
            price: 18.99,
            modifierGroups: [],
          },
        ],
        isAvailable: false,
      },
    ],
  };

  return (
  <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.colors.primary,
          fontFamily: theme.fonts.primary,
        },
        components: {
          Button: {
            colorPrimary: theme.colors.button.primary,
            colorPrimaryHover: theme.colors.button.hover,
          },
        },
      }}
    >
      <Content className="p-8">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8">
          <div className="fixed bottom-0 left-0 right-0 bg-white z-10 md:static md:w-64 md:flex-shrink-0">
            <div className="md:fixed md:w-56">
              <Anchor
                className="md:p-4 md:w-56"
                direction={isMobile ? "horizontal" : "vertical"}
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
    </ConfigProvider>
  );
};

export default App;
