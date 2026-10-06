import React from 'react';
import { FilterState, Product, Section } from '../types';
import { applyFilters, countActiveFilters } from '../utils/filters';
import { COLOR_LABELS, COLOR_ORDER, colorDotClass } from '../utils/colors';
import { Search, X, RotateCcw, Check } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  products: Product[];
  onFilterChange: (f: Partial<FilterState>) => void;
  onReset: () => void;
  onClose?: () => void;
}

type FacetKey = 'collection' | 'category' | 'size' | 'color' | 'mountType' | 'styleType';

interface Option {
  id: string;
  label: string;
  swatch?: string;
}

interface Facet {
  key: FacetKey;
  title: string;
  options: Option[];
  chips?: boolean;
}

// ---- Furniture (fixed lists) ----
const FURN_COLORS: Option[] = [
  { id: 'white', label: 'White Gloss', swatch: 'bg-white border-slate-300' },
  { id: 'grey', label: 'Grey Gloss', swatch: 'bg-stone-400 border-stone-500' },
  { id: 'anthracite', label: 'Anthracite Gloss', swatch: 'bg-slate-700 border-slate-800' },
  { id: 'black', label: 'Black Gloss', swatch: 'bg-black border-black' },
];

const FURNITURE_FACETS: Facet[] = [
  { key: 'color', title: 'Colour', options: FURN_COLORS },
  {
    key: 'size',
    title: 'Size (width)',
    chips: true,
    options: [
      { id: '500mm', label: '500 mm' },
      { id: '505mm', label: '505 mm' },
      { id: '600mm', label: '600 mm' },
      { id: '700mm', label: '700 mm' },
      { id: '800mm', label: '800 mm' },
      { id: 'tall', label: 'Tall (1200–1600)' },
    ],
  },
  {
    key: 'category',
    title: 'Product type',
    options: [
      { id: 'vanity', label: 'Vanity Units' },
      { id: 'wc', label: 'WC Units' },
      { id: 'tall', label: 'Tall Units' },
      { id: 'basin', label: 'Basins' },
    ],
  },
  {
    key: 'collection',
    title: 'Range',
    options: [
      { id: 'Bellatrix', label: 'Bellatrix' },
      { id: 'Vega', label: 'Vega' },
      { id: 'Sirius', label: 'Sirius' },
      { id: 'Rivvo', label: 'Rivvo' },
      { id: 'Mersey Ceramics', label: 'Universal Basins' },
    ],
  },
  {
    key: 'mountType',
    title: 'Installation',
    options: [
      { id: 'floor', label: 'Floor Standing' },
      { id: 'wall', label: 'Wall Hung' },
    ],
  },
  {
    key: 'styleType',
    title: 'Opening',
    options: [
      { id: 'doors', label: 'With Doors' },
      { id: 'drawers', label: 'With Drawers' },
    ],
  },
];

// ---- Panels / Flooring (built from data) ----
const uniq = <T,>(arr: T[]): T[] => Array.from(new Set(arr));

const buildFacets = (section: Section, sectionProducts: Product[]): Facet[] => {
  if (section === 'furniture') return FURNITURE_FACETS;

  const ranges: Option[] = uniq(sectionProducts.map((p) => p.collection)).map((c) => ({ id: c, label: c }));
  const series: Option[] = uniq(sectionProducts.map((p) => p.styleType)).map((s) => ({ id: s, label: s }));
  const widths: Option[] = uniq(sectionProducts.map((p) => p.size))
    .sort((a, b) => a - b)
    .map((s) => ({ id: `${s}mm`, label: `${s} mm` }));

  if (section === 'panels') {
    const present = new Set(sectionProducts.map((p) => p.colorFamily));
    const colours: Option[] = COLOR_ORDER.filter((f) => present.has(f)).map((f) => ({
      id: f,
      label: COLOR_LABELS[f],
      swatch: colorDotClass(f),
    }));
    return [
      { key: 'color', title: 'Colour', options: colours },
      { key: 'collection', title: 'Range', options: ranges },
      { key: 'styleType', title: 'Series', options: series },
      { key: 'size', title: 'Panel width', chips: true, options: widths },
    ];
  }

  return [
    { key: 'collection', title: 'Range', options: ranges },
    { key: 'styleType', title: 'Type', options: series },
    { key: 'size', title: 'Plank / tile width', chips: true, options: widths },
  ];
};

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  products,
  onFilterChange,
  onReset,
  onClose,
}) => {
  const activeCount = countActiveFilters(filters);
  const sectionProducts = products.filter((p) => p.section === filters.section);
  const facets = buildFacets(filters.section, sectionProducts);

  // Faceted count: how many products would match if this option were chosen
  const countFor = (key: FacetKey, id: string) =>
    applyFilters(products, { ...filters, [key]: id } as FilterState).length;

  const toggle = (key: FacetKey, id: string) => {
    onFilterChange({ [key]: filters[key] === id ? 'all' : id } as Partial<FilterState>);
  };

  const renderRows = (facet: Facet) => (
    <ul className="space-y-0.5">
      {facet.options.map((o) => {
        const selected = filters[facet.key] === o.id;
        const count = countFor(facet.key, o.id);
        const disabled = count === 0 && !selected;
        return (
          <li key={o.id}>
            <button
              onClick={() => toggle(facet.key, o.id)}
              disabled={disabled}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-left transition-colors ${
                selected
                  ? 'bg-sky-50 text-sky-800 font-semibold'
                  : disabled
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span
                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                  selected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white'
                }`}
              >
                {selected && <Check className="w-3 h-3" strokeWidth={3} />}
              </span>
              {o.swatch && <span className={`w-3.5 h-3.5 rounded-full border shrink-0 ${o.swatch}`} />}
              <span className="flex-1 truncate">{o.label}</span>
              <span className={`text-xs tabular-nums ${selected ? 'text-sky-600' : 'text-slate-400'}`}>{count}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  const renderChips = (facet: Facet) => (
    <div className="grid grid-cols-2 gap-1.5">
      {facet.options.map((o, i) => {
        const selected = filters[facet.key] === o.id;
        const count = countFor(facet.key, o.id);
        const disabled = count === 0 && !selected;
        const lastOdd = i === facet.options.length - 1 && facet.options.length % 2 === 1;
        return (
          <button
            key={o.id}
            onClick={() => toggle(facet.key, o.id)}
            disabled={disabled}
            className={`px-2.5 py-2 rounded-lg text-sm border text-center transition-colors ${
              lastOdd ? 'col-span-2' : ''
            } ${
              selected
                ? 'bg-sky-600 border-sky-600 text-white font-semibold'
                : disabled
                ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                : 'bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-700'
            }`}
          >
            {o.label}
            <span className={`ml-1.5 text-xs ${selected ? 'text-sky-100' : 'text-slate-400'}`}>({count})</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col max-h-full">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">Filter products</h3>
          {activeCount > 0 && (
            <span className="min-w-5 h-5 px-1.5 rounded-full bg-sky-600 text-white text-[11px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {activeCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-rose-600 px-2 py-1 rounded-md hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 overflow-y-auto">
        <div className="pt-4 pb-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search name or SKU…"
              className="w-full pl-9 pr-8 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {facets.map((facet) => (
          <div key={facet.key} className="py-4 border-b border-slate-100 last:border-b-0">
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2.5">
              {facet.title}
            </h4>
            {facet.chips ? renderChips(facet) : renderRows(facet)}
          </div>
        ))}
      </div>

      {onClose && (
        <div className="lg:hidden p-4 border-t border-slate-100 shrink-0">
          <button onClick={onClose} className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm">
            Show results
          </button>
        </div>
      )}
    </div>
  );
};
