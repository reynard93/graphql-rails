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
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Get the first visible section
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null, // viewport
        rootMargin: '-20% 0px -70% 0px', // Adjust the detection area
        threshold: 0.1 // Trigger when even 10% is visible
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
      className="p-4 w-64"
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