import React from 'react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { colorDotClass } from '../utils/colors';
import { Plus, Check, Eye, Ruler, ArrowLeftRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export const colorDot = colorDotClass;

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onToggleSelect,
  onQuickView,
  isCompared,
  onToggleCompare,
  viewMode = 'grid',
}) => {
  const selectBtn = (
    <button
      onClick={() => onToggleSelect(product)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
        isSelected ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-sky-600 text-white hover:bg-sky-700'
      }`}
    >
      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
      <span>{isSelected ? 'Selected' : 'Select'}</span>
    </button>
  );

  const compareBtn = (
    <button
      onClick={() => onToggleCompare(product)}
      title={isCompared ? 'Remove from compare' : 'Add to compare'}
      className={`p-2 rounded-lg border transition-colors ${
        isCompared
          ? 'bg-slate-900 text-white border-slate-900'
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
      }`}
    >
      <ArrowLeftRight className="w-3.5 h-3.5" />
    </button>
  );

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-4">
        <div
          onClick={() => onQuickView(product)}
          className="w-full sm:w-44 aspect-4/3 rounded-lg overflow-hidden shrink-0 cursor-pointer"
        >
          <ProductImage product={product} className="w-full h-full" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
              {product.code}
            </span>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              {product.collection === 'Mersey Ceramics' ? 'Basins' : product.collection}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-600">
              <span className={`w-2.5 h-2.5 rounded-full border ${colorDot(product.colorFamily)}`} />
              {product.color}
            </span>
          </div>
          <h4
            onClick={() => onQuickView(product)}
            className="text-sm font-bold text-slate-900 hover:text-sky-600 cursor-pointer"
          >
            {product.name}
          </h4>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <Ruler className="w-3.5 h-3.5 text-slate-400" />
            {product.dimensions}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onQuickView(product)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          {compareBtn}
          {selectBtn}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all flex flex-col overflow-hidden ${
        isSelected
          ? 'border-emerald-400 shadow-md ring-2 ring-emerald-400/20'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'
      }`}
    >
      <div
        className="relative aspect-4/3 w-full border-b border-slate-100 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <ProductImage product={product} className="w-full h-full group-hover:scale-[1.02] transition-transform duration-300" />
        <div className="absolute bottom-2 left-2 font-mono text-[11px] font-bold bg-slate-900/85 text-white px-2 py-0.5 rounded-md">
          {product.code}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {product.collection === 'Mersey Ceramics' ? 'Basins' : product.collection}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
              <span className={`w-3.5 h-3.5 rounded-full border ${colorDot(product.colorFamily)}`} />
              {product.color}
            </span>
          </div>
          <h3
            onClick={() => onQuickView(product)}
            className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <Ruler className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{product.dimensions}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              {product.sizeLabel}
            </span>
            <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              {product.mountType === 'Universal / Basin' ? 'Basin' : product.mountType}
            </span>
            <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              {product.styleType}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="text-xs font-semibold text-slate-500 hover:text-sky-700 flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </button>
          <div className="flex items-center gap-1.5">
            {compareBtn}
            {selectBtn}
          </div>
        </div>
      </div>
    </div>
  );
};
