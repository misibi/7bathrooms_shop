import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { PANELS, FLOORING } from './data/surfaces';
import { Product, FilterState, SelectionItem, Section, ColorFamily } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ClientSelectionDrawer } from './components/ClientSelectionDrawer';
import { CompareModal } from './components/CompareModal';
import { ProposalModal } from './components/ProposalModal';
import { applyFilters, countActiveFilters } from './utils/filters';
import { COLOR_LABELS } from './utils/colors';
import { RotateCcw, ShoppingBag, ChevronUp, X, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

const ALL_PRODUCTS: Product[] = [...PRODUCTS, ...PANELS, ...FLOORING];

const COUNTS: Record<Section, number> = {
  furniture: PRODUCTS.length,
  panels: PANELS.length,
  flooring: FLOORING.length,
};

const initialFilters = (section: Section, sortBy: FilterState['sortBy'] = 'default'): FilterState => ({
  section,
  collection: 'all',
  color: 'all',
  size: 'all',
  category: 'all',
  mountType: 'all',
  styleType: 'all',
  searchQuery: '',
  sortBy,
});

const FURNITURE_LABELS: Record<string, Record<string, string>> = {
  color: { white: 'White Gloss', grey: 'Grey Gloss', anthracite: 'Anthracite Gloss', black: 'Black Gloss' },
  category: { vanity: 'Vanity Units', wc: 'WC Units', tall: 'Tall Units', basin: 'Basins' },
  mountType: { floor: 'Floor Standing', wall: 'Wall Hung' },
  styleType: { doors: 'With Doors', drawers: 'With Drawers' },
  collection: { 'Mersey Ceramics': 'Universal Basins' },
};

const chipLabel = (section: Section, key: string, value: string): string => {
  if (key === 'size') return value === 'tall' ? 'Tall (1200–1600mm)' : value.replace('mm', ' mm');
  if (section === 'furniture') return FURNITURE_LABELS[key]?.[value] ?? value;
  if (key === 'color') return COLOR_LABELS[value as ColorFamily] ?? value;
  return value;
};

export const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters('furniture'));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const section = filters.section;

  const [selection, setSelection] = useState<SelectionItem[]>(() => {
    try {
      const saved: SelectionItem[] = JSON.parse(localStorage.getItem('seven_selection_v2') || '[]');
      // re-link to current catalogue data
      return saved
        .map((s) => ({ ...s, product: ALL_PRODUCTS.find((p) => p.code === s.product.code)! }))
        .filter((s) => s.product);
    } catch {
      return [];
    }
  });
  const [clientName, setClientName] = useState(() => localStorage.getItem('seven_client_name') || '');
  const [projectName, setProjectName] = useState(() => localStorage.getItem('seven_project_name') || 'Main Bathroom');

  const [compareCodes, setCompareCodes] = useState<string[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    localStorage.setItem('seven_selection_v2', JSON.stringify(selection));
  }, [selection]);
  useEffect(() => {
    localStorage.setItem('seven_client_name', clientName);
  }, [clientName]);
  useEffect(() => {
    localStorage.setItem('seven_project_name', projectName);
  }, [projectName]);
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    const list = applyFilters(ALL_PRODUCTS, filters);
    return [...list].sort((a, b) => {
      switch (filters.sortBy) {
        case 'size-asc':
          return a.size - b.size;
        case 'size-desc':
          return b.size - a.size;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'code-asc':
          return a.code.localeCompare(b.code);
        default:
          return 0;
      }
    });
  }, [filters]);

  const selectedCodes = useMemo(() => new Set(selection.map((s) => s.product.code)), [selection]);
  const comparedProducts = useMemo(
    () => compareCodes.map((c) => ALL_PRODUCTS.find((p) => p.code === c)).filter((p): p is Product => !!p),
    [compareCodes]
  );
  const activeCount = countActiveFilters(filters);
  const totalQty = selection.reduce((s, i) => s + i.quantity, 0);

  const handleFilterChange = (f: Partial<FilterState>) => setFilters((prev) => ({ ...prev, ...f }));
  const handleResetFilters = () => setFilters((prev) => initialFilters(prev.section, prev.sortBy));

  const handleSectionChange = (s: Section) => {
    if (s === section) return;
    setFilters(initialFilters(s));
    setMobileFiltersOpen(false);
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleToggleSelect = (product: Product) =>
    setSelection((prev) =>
      prev.some((i) => i.product.code === product.code)
        ? prev.filter((i) => i.product.code !== product.code)
        : [...prev, { product, quantity: 1, addedAt: Date.now() }]
    );

  const handleUpdateQuantity = (code: string, delta: number) =>
    setSelection((prev) =>
      prev
        .map((i) => (i.product.code === code ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );

  const handleToggleCompare = (product: Product) =>
    setCompareCodes((prev) => {
      if (prev.includes(product.code)) return prev.filter((c) => c !== product.code);
      if (prev.length >= 4) {
        alert('You can compare up to 4 items at once. Remove one to add another.');
        return prev;
      }
      return [...prev, product.code];
    });

  const chips: { key: keyof FilterState; label: string }[] = [];
  (['collection', 'color', 'size', 'category', 'mountType', 'styleType'] as const).forEach((k) => {
    const v = filters[k];
    if (v !== 'all') chips.push({ key: k, label: chipLabel(section, k, v) });
  });
  if (filters.searchQuery) chips.push({ key: 'searchQuery', label: `“${filters.searchQuery}”` });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header
        section={section}
        onSectionChange={handleSectionChange}
        counts={COUNTS}
        selectionCount={totalQty}
        onOpenSelection={() => setIsSelectionOpen(true)}
        compareCount={compareCodes.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      <Hero
        section={section}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        totalProducts={COUNTS[section]}
      />

      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 scroll-mt-28">
        <div className="flex gap-7 items-start">
          <aside
            className={`${
              mobileFiltersOpen ? 'fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex' : 'hidden'
            } lg:block lg:static lg:bg-transparent lg:backdrop-blur-none lg:w-72 lg:shrink-0 lg:sticky lg:top-20 lg:self-start`}
            onClick={() => setMobileFiltersOpen(false)}
          >
            <div
              className="w-[88%] max-w-sm h-full lg:w-full lg:max-w-none lg:h-auto lg:max-h-[calc(100vh-6rem)] bg-slate-50 lg:bg-transparent p-3 lg:p-0 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterSidebar
                filters={filters}
                products={ALL_PRODUCTS}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                onClose={() => setMobileFiltersOpen(false)}
              />
            </div>
          </aside>

          <section className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
                {activeCount > 0 && (
                  <span className="min-w-5 h-5 px-1.5 rounded-full bg-sky-500 text-slate-950 text-xs font-bold flex items-center justify-center">
                    {activeCount}
                  </span>
                )}
              </button>
              <p className="text-sm text-slate-500">
                <strong className="text-slate-900">{filteredProducts.length}</strong> of {COUNTS[section]} products
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
                  className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="default">Default order</option>
                  <option value="size-asc">Size: small to large</option>
                  <option value="size-desc">Size: large to small</option>
                  <option value="name-asc">Name: A–Z</option>
                  <option value="code-asc">SKU: A–Z</option>
                </select>
                <div className="flex items-center bg-white p-0.5 rounded-lg border border-slate-200">
                  {(['grid', 'list'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setViewMode(m)}
                      className={`p-2 rounded-md ${viewMode === m ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                      title={`${m} view`}
                    >
                      {m === 'grid' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {chips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {chips.map((c) => (
                  <button
                    key={c.key}
                    onClick={() =>
                      handleFilterChange({ [c.key]: c.key === 'searchQuery' ? '' : 'all' } as Partial<FilterState>)
                    }
                    className="group inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold hover:bg-sky-100"
                  >
                    {c.label}
                    <X className="w-3.5 h-3.5 text-sky-500 group-hover:text-sky-800" />
                  </button>
                ))}
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 underline underline-offset-2 ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
                <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold">No matching products</h3>
                <p className="text-sm text-slate-500 mt-2">Try removing a filter or reset them all.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800"
                >
                  <RotateCcw className="w-4 h-4" /> Reset all filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-3'}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.code}
                    product={product}
                    isSelected={selectedCodes.has(product.code)}
                    onToggleSelect={handleToggleSelect}
                    onQuickView={setActiveProduct}
                    isCompared={compareCodes.includes(product.code)}
                    onToggleCompare={handleToggleCompare}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {selection.length > 0 && (
        <aside
          aria-label="Selection summary"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-950/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 max-w-lg w-[92%] sm:w-auto"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold">{totalQty} items selected</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setIsProposalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-bold text-xs"
            >
              Print PDF
            </button>
            <button
              onClick={() => setIsSelectionOpen(true)}
              className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs"
            >
              View selection
            </button>
          </div>
        </aside>
      )}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-sky-600 hover:text-white"
          title="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onSelectProduct={(product, qty) => {
          setSelection((prev) =>
            prev.some((i) => i.product.code === product.code)
              ? prev.map((i) => (i.product.code === product.code ? { ...i, quantity: qty } : i))
              : [...prev, { product, quantity: qty, addedAt: Date.now() }]
          );
          setActiveProduct(null);
        }}
        isSelected={activeProduct ? selectedCodes.has(activeProduct.code) : false}
        allProducts={ALL_PRODUCTS}
        onSwitchProduct={setActiveProduct}
      />

      <ClientSelectionDrawer
        isOpen={isSelectionOpen}
        onClose={() => setIsSelectionOpen(false)}
        selection={selection}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={(code) => setSelection((prev) => prev.filter((i) => i.product.code !== code))}
        onClearSelection={() => window.confirm('Clear all selected items?') && setSelection([])}
        onOpenProposal={() => {
          setIsSelectionOpen(false);
          setIsProposalOpen(true);
        }}
        clientName={clientName}
        onClientNameChange={setClientName}
        projectName={projectName}
        onProjectNameChange={setProjectName}
      />

      <CompareModal
        products={comparedProducts}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemoveFromCompare={(code) => setCompareCodes((prev) => prev.filter((c) => c !== code))}
        onToggleSelect={handleToggleSelect}
        selectedCodes={selectedCodes}
      />

      <ProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        selection={selection}
        clientName={clientName}
        projectName={projectName}
      />

      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-black">7</div>
            <span className="font-black tracking-tight text-white">SEVEN BATHROOMS</span>
          </div>
          <span>© {new Date().getFullYear()} Seven Bathrooms. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
