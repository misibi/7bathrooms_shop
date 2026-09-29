import React from 'react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { X, Check, Plus, Trash2, ArrowLeftRight } from 'lucide-react';

interface CompareModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveFromCompare: (code: string) => void;
  onToggleSelect: (product: Product) => void;
  selectedCodes: Set<string>;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  products,
  isOpen,
  onClose,
  onRemoveFromCompare,
  onToggleSelect,
  selectedCodes,
}) => {
  if (!isOpen) return null;

  const rows: { label: string; get: (p: Product) => string }[] = [
    { label: 'Range', get: (p) => (p.collection === 'Mersey Ceramics' ? 'Basins' : p.collection) },
    { label: 'Colour', get: (p) => p.color },
    { label: 'Size', get: (p) => p.sizeLabel },
    { label: 'Dimensions', get: (p) => p.dimensions },
    { label: 'Installation', get: (p) => (p.mountType === 'Universal / Basin' ? 'Basin' : p.mountType) },
    { label: 'Type', get: (p) => p.styleType },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Compare ({products.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-auto p-6">
          {products.length === 0 ? (
            <p className="text-center py-12 text-slate-400">No items added to comparison yet.</p>
          ) : (
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr>
                  <th className="p-3 bg-slate-100/70 w-32 rounded-l-xl" />
                  {products.map((p) => (
                    <th key={p.code} className="p-3 min-w-52 align-top">
                      <div className="relative">
                        <button
                          onClick={() => onRemoveFromCompare(p.code)}
                          className="absolute top-1 right-1 z-10 p-1.5 rounded-full bg-white/90 text-slate-500 hover:text-rose-600"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="aspect-4/3 rounded-lg overflow-hidden border border-slate-200 mb-2">
                          <ProductImage product={p} className="w-full h-full" />
                        </div>
                        <span className="font-mono text-[10px] text-sky-700 font-bold block">{p.code}</span>
                        <span className="font-bold text-slate-900 block leading-snug mt-0.5">{p.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.label}>
                    <td className="p-3 font-semibold text-slate-500 bg-slate-50/50">{r.label}</td>
                    {products.map((p) => (
                      <td key={p.code} className="p-3 font-medium text-slate-800">
                        {r.get(p)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-3 bg-slate-50/50" />
                  {products.map((p) => {
                    const sel = selectedCodes.has(p.code);
                    return (
                      <td key={p.code} className="p-3">
                        <button
                          onClick={() => onToggleSelect(p)}
                          className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg font-bold text-xs text-white ${
                            sel ? 'bg-emerald-600' : 'bg-sky-600 hover:bg-sky-700'
                          }`}
                        >
                          {sel ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          {sel ? 'Selected' : 'Select'}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
