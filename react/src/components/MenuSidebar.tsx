import { Anchor } from 'antd';
import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
}

interface MenuSidebarProps {
  sections: Section[];
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <Anchor
      className="p-4 w-64 sticky"
      affix={false}
      getCurrentAnchor={() => `#${activeSection}`}
      items={sections.map((section) => ({
        key: section.id,
        href: `#${section.id}`,
        title: section.label,
      }))}
    />
  );
};

export default MenuSidebar;