export interface MenuItem {
  id: string;
  label: string;
  price: number;
  image?: string;
  isSoldOut?: boolean;
  modifierGroups: ModifierGroup[];
}

export interface ModifierGroup {
  id: string;
  label: string;
  items: {
    id: string;
    label: string;
    price: number;
  }[];
}

export interface Section {
  id: string;
  label: string;
  items: MenuItem[];
  isAvailable: boolean;
}

export interface Menu {
  id: string;
  label: string;
  sections: Section[];
}