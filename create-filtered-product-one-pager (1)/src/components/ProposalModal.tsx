import React from 'react';
import { SelectionItem } from '../types';
import { X, Printer } from 'lucide-react';
import { resolveImage } from '../utils/image';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  selection: SelectionItem[];
  clientName: string;
  projectName: string;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  selection,
  clientName,
  projectName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="no-print px-6 py-3.5 bg-slate-950 text-white flex items-center justify-between shrink-0">
          <span className="text-xs font-bold tracking-wider uppercase text-sky-400">Client selection sheet</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-8 sm:p-10 space-y-6 text-slate-900 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-slate-950">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center text-sky-400 font-black">7</div>
              <h2 className="text-2xl font-black tracking-tight">
                SEVEN <span className="text-sky-600">BATHROOMS</span>
              </h2>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 min-w-56 sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Prepared for</span>
              <strong className="text-sm block mt-1">{clientName || 'Client'}</strong>
              <span className="text-[11px] text-slate-600 block mt-0.5">{projectName || 'Bathroom'}</span>
              <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                {new Date().toLocaleDateString('en-GB')}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {selection.map((item, idx) => (
              <div key={item.product.code} className="flex gap-4 border border-slate-200 rounded-xl p-3 break-inside-avoid">
                <img
                  src={resolveImage(item.product.image, 500)}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-40 aspect-4/3 object-cover rounded-lg border border-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-sky-700">
                      {idx + 1}. SKU {item.product.code}
                    </span>
                    <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded">Qty {item.quantity}</span>
                  </div>
                  <strong className="block text-sm mt-1 leading-snug">{item.product.name}</strong>
                  <p className="mt-1.5 text-slate-600">Colour: <b>{item.product.color}</b></p>
                  <p className="text-slate-600 font-mono">{item.product.dimensions}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-200">
            Total items: {selection.reduce((s, i) => s + i.quantity, 0)} · Seven Bathrooms
          </p>
        </div>
      </div>
    </div>
  );
};
