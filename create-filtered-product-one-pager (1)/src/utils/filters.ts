import { Product, FilterState } from '../types';

const furnitureMatch = (item: Product, f: FilterState): boolean => {
  if (f.collection !== 'all') {
    const isBasinRange = f.collection === 'Ceramic Basins' || f.collection === 'Mersey Ceramics';
    if (isBasinRange) {
      if (item.collection !== 'Mersey Ceramics') return false;
    } else if (item.collection !== f.collection) {
      return false;
    }
  }

  if (f.color !== 'all' && item.colorFamily !== f.color) return false;

  if (f.size !== 'all') {
    if (f.size === 'tall') {
      if (item.category !== 'Tall Unit') return false;
    } else if (item.category === 'Tall Unit' || `${item.size}mm` !== f.size) {
      return false;
    }
  }

  if (f.category !== 'all') {
    const map: Record<string, string> = {
      vanity: 'Vanity Unit',
      wc: 'WC Unit',
      tall: 'Tall Unit',
      basin: 'Basin',
    };
    if (item.category !== map[f.category]) return false;
  }

  if (f.mountType !== 'all') {
    if (f.mountType === 'floor' && item.mountType !== 'Floor Standing') return false;
    if (f.mountType === 'wall' && item.mountType !== 'Wall Hung') return false;
  }

  if (f.styleType !== 'all') {
    if (f.styleType === 'doors' && item.styleType !== '2 Doors') return false;
    if (f.styleType === 'drawers' && item.styleType !== '2 Drawers') return false;
  }

  return true;
};

const surfaceMatch = (item: Product, f: FilterState): boolean => {
  if (f.collection !== 'all' && item.collection !== f.collection) return false;
  if (f.color !== 'all' && item.colorFamily !== f.color) return false;
  if (f.size !== 'all' && `${item.size}mm` !== f.size) return false;
  if (f.styleType !== 'all' && item.styleType !== f.styleType) return false;
  return true;
};

export const matchesFilters = (item: Product, f: FilterState): boolean => {
  if (item.section !== f.section) return false;

  if (f.searchQuery) {
    const q = f.searchQuery.toLowerCase().trim();
    const hay = `${item.code} ${item.name} ${item.color} ${item.collection} ${item.styleType}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }

  return f.section === 'furniture' ? furnitureMatch(item, f) : surfaceMatch(item, f);
};

export const applyFilters = (products: Product[], f: FilterState): Product[] =>
  products.filter((p) => matchesFilters(p, f));

export const countActiveFilters = (f: FilterState): number =>
  [f.collection, f.color, f.size, f.category, f.mountType, f.styleType].filter((v) => v !== 'all').length +
  (f.searchQuery ? 1 : 0);
