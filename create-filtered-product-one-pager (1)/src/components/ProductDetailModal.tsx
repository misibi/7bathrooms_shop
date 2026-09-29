import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { colorDot } from './ProductCard';
import { X, Check, Plus, Minus, Ruler, PackageCheck, ExternalLink } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product, quantity: number) => void;
  isSelected: boolean;
  allProducts: Product[];
  onSwitchProduct: (product: Product) => void;
}

const rangeLabel = (p: Product) => (p.collection === 'Mersey Ceramics' ? 'Basins' : p.collection);

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  isSelected,
  allProducts,
  onSwitchProduct,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product?.code]);

  if (!product) return null;

  const isFurniture = product.section === 'furniture';

  const colourOptions = isFurniture
    ? allProducts.filter(
        (p) =>
          p.section === 'furniture' &&
          p.collection === product.collection &&
          p.category === product.category &&
          p.styleType === product.styleType &&
          p.mountType === product.mountType &&
          p.size === product.size &&
          p.code !== product.code
      )
    : [];

  const sizeOptions = isFurniture
    ? allProducts
        .filter(
          (p) =>
            p.section === 'furniture' &&
            p.collection === product.collection &&
            p.category === product.category &&
            p.styleType === product.styleType &&
            p.mountType === product.mountType &&
            p.colorFamily === product.colorFamily &&
            p.size !== product.size
        )
        .sort((a, b) => a.size - b.size)
    : [];

  const cells: { label: string; value: React.ReactNode }[] = [
    {
      label: 'Colour',
      value: (
        <span className="flex items-center gap-1.5">
          <span className={`w-3.5 h-3.5 rounded-full border shrink-0 ${colorDot(product.colorFamily)}`} />
          {product.color}
        </span>
      ),
    },
    { label: isFurniture ? 'Size' : 'Width', value: product.sizeLabel },
    {
      label: isFurniture ? 'Installation' : 'Application',
      value: product.mountType === 'Universal / Basin' ? 'Basin' : product.mountType,
    },
    { label: isFurniture ? 'Type' : product.section === 'panels' ? 'Series' : 'Type', value: product.styleType },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs font-bold text-sky-800 bg-sky-100 px-2.5 py-1 rounded-md border border-sky-200 shrink-0">
              SKU: {product.code}
            </span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-200/70 px-2.5 py-1 rounded-md truncate">
              {isFurniture ? `${rangeLabel(product)} range` : rangeLabel(product)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-4/3 w-full rounded-2xl overflow-hidden border border-slate-200">
              <ProductImage product={product} className="w-full h-full" />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">{product.name}</h3>

              <dl className="grid grid-cols-2 gap-2 text-sm">
                {cells.map((c) => (
                  <div key={c.label} className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                    <dt className="text-[10px] uppercase font-bold text-slate-400">{c.label}</dt>
                    <dd className="font-semibold text-slate-800 mt-0.5">{c.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="bg-sky-50/70 rounded-xl p-3.5 border border-sky-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-950 mb-1">
                  <Ruler className="w-4 h-4 text-sky-600" /> Dimensions
                </div>
                <p className="font-mono text-sm font-semibold text-slate-900">{product.dimensions}</p>
                {product.note && <p className="text-xs text-slate-600 mt-1.5">{product.note}</p>}
              </div>

              {colourOptions.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Other colours</p>
                  <div className="flex flex-wrap gap-2">
                    {colourOptions.map((p) => (
                      <button
                        key={p.code}
                        onClick={() => onSwitchProduct(p)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        <span className={`w-3 h-3 rounded-full border ${colorDot(p.colorFamily)}`} />
                        {p.color}
                        <span className="font-mono text-slate-400">{p.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {sizeOptions.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Other sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((p) => (
                      <button
                        key={p.code}
                        onClick={() => onSwitchProduct(p)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {p.sizeLabel}
                        <span className="ml-1.5 font-mono text-slate-400">{p.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sourceUrl && (
                <a
                  href={product.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View on supplier site
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <div className="flex items-center bg-white rounded-xl border border-slate-300 p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-600"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-extrabold text-slate-900">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-600"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            onClick={() => onSelectProduct(product, quantity)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95 ${
              isSelected ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-sky-600 hover:bg-sky-700'
            }`}
          >
            {isSelected ? <Check className="w-4 h-4" /> : <PackageCheck className="w-4 h-4" />}
            {isSelected ? `Update selection (${quantity})` : 'Add to client selection'}
          </button>
        </div>
      </div>
    </div>
  );
};
