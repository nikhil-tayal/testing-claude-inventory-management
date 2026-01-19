// Jeans catalogue types
export interface JeansCatalogue {
  id: string;
  name: string;
  description?: string;
}

// Available sizes for jeans (24 to 40, even numbers)
export const JEANS_SIZES = [24, 26, 28, 30, 32, 34, 36, 38, 40] as const;
export type JeansSize = typeof JEANS_SIZES[number];

// 7 Catalogues of jeans
export const CATALOGUES: JeansCatalogue[] = [
  { id: 'cat1', name: 'Classic Fit', description: 'Traditional straight leg jeans' },
  { id: 'cat2', name: 'Slim Fit', description: 'Modern slim cut jeans' },
  { id: 'cat3', name: 'Skinny Fit', description: 'Tight fitting jeans' },
  { id: 'cat4', name: 'Relaxed Fit', description: 'Comfortable loose fit jeans' },
  { id: 'cat5', name: 'Bootcut', description: 'Flared bottom jeans' },
  { id: 'cat6', name: 'Straight Leg', description: 'Standard straight jeans' },
  { id: 'cat7', name: 'Tapered', description: 'Narrowing leg jeans' },
];

// Inventory entry for a specific catalogue and size
export interface InventoryEntry {
  catalogueId: string;
  size: JeansSize;
  bundles: number;
}

// Full inventory state
export type InventoryState = {
  [catalogueId: string]: {
    [size: number]: number; // bundles count
  };
};

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Inventory: undefined;
};

// User type
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}
