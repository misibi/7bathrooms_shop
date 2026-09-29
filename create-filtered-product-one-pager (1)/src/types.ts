export type Section = 'furniture' | 'panels' | 'flooring';

export type CollectionName = string;
export type ProductCategory = string;
export type MountType = string;
export type StyleType = string;

export type ColorFamily =
  | 'white'
  | 'anthracite'
  | 'grey'
  | 'black'
  | 'beige'
  | 'brown'
  | 'blue'
  | 'green'
  | 'pink'
  | 'yellow'
  | 'metallic'
  | 'other';

export interface Product {
  id: string;
  section: Section;
  code: string;
  name: string;
  collection: CollectionName;
  category: ProductCategory;
  mountType: MountType;
  styleType: StyleType;
  size: number; // width in mm (height for tall furniture units)
  sizeLabel: string;
  color: string;
  colorFamily: ColorFamily;
  dimensions: string;
  image: string;
  note?: string;
  sourceUrl?: string;
}

export interface FilterState {
  section: Section;
  collection: string;
  color: string;
  size: string;
  category: string;
  mountType: string;
  styleType: string;
  searchQuery: string;
  sortBy: 'default' | 'size-asc' | 'size-desc' | 'name-asc' | 'code-asc';
}

export interface SelectionItem {
  product: Product;
  quantity: number;
  addedAt: number;
}
