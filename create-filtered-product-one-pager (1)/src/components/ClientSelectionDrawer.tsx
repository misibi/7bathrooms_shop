import React, { useState } from 'react';
import { SelectionItem } from '../types';
import { ProductImage } from './ProductImage';
import { X, Trash2, Plus, Minus, Copy, Printer, ShoppingBag, Check } from 'lucide-react';

interface ClientSelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selection: SelectionItem[];
  onUpdateQuantity: (code: string, delta: number) => void;
  onRemoveItem: (code: string) => void;
  onClearSelection: () => void;
  onOpenProposal: () => void;
  clientName: string;
  onClientNameChange: (name: string) => void;
  projectName: string;
  onProjectNameChange: (proj: string) => void;
}

export const ClientSelectionDrawer: React.FC<ClientSelectionDrawerProps> = ({
  isOpen,
  onClose,
  selection,
  onUpdateQuantity,
  onRemoveItem,
  onClearSelection,
  onOpenProposal,
  clientName,
  onClientNameChange,
  projectName,
  onProjectNameChange,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalQty = selection.reduce((s, i) => s + i.quantity, 0);

  const copyText = () => {
    let t = `SEVEN BATHROOMS - CLIENT SELECTION\n`;
    if (clientName) t += `Client: ${clientName}\n`;
    if (projectName) t += `Room / Project: ${projectName}\n`;
    t += `Date: ${new Date().toLocaleDateString('en-GB')}\n----------------------------------------\n\n`;
    selection.forEach((item, i) => {
      t += `${i + 1}. ${item.product.name}\n   SKU: ${item.product.code}\n   Colour: ${item.product.color}\n   Size: ${item.product.dimensions}\n   Qty: ${item.quantity}\n\n`;
    });
    t += `----------------------------------------\nTotal items: ${totalQty}`;
    navigator.clipboard?.writeText(t);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Client selection</h3>
              <span className="text-xs text-slate-500">{totalQty} {totalQty === 1 ? 'item' : 'items'}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-3 bg-sky-50/50 border-b border-sky-100 flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Client name</label>
            <input
              type="text"
              placeholder="e.g. Mr & Mrs Robinson"
              value={clientName}
              onChange={(e) => onClientNameChange(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 rounded-md bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Room / project</label>
            <input
              type="text"
              placeholder="e.g. Master ensuite"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 rounded-md bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {selection.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-10 h-10 text-slate-300 mb-3" />
              <h4 className="text-base font-bold text-slate-700">Nothing selected yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Press “Select” on the products your client likes and they will appear here.
              </p>
            </div>
          ) : (
            selection.map((item) => (
              <div key={item.product.code} className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3">
                <div className="w-24 aspect-4/3 rounded-lg overflow-hidden border border-slate-100 shrink-0">
                  <ProductImage product={item.product} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                    {item.product.code}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 mt-1 leading-snug">{item.product.name}</h5>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{item.product.dimensions}</span>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => onRemoveItem(item.product.code)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center bg-slate-100 rounded-md p-0.5 border border-slate-200">
                    <button onClick={() => onUpdateQuantity(item.product.code, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-white rounded">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.code, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-white rounded">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selection.length > 0 && (
          <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onOpenProposal}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
              >
                <Printer className="w-3.5 h-3.5" /> Print / PDF
              </button>
              <button
                onClick={copyText}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs border ${
                  copied ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy as text'}
              </button>
            </div>
            <div className="text-center">
              <button onClick={onClearSelection} className="text-[11px] text-slate-400 hover:text-rose-600 underline">
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
