import React from 'react';
import { Search, ArrowDown } from 'lucide-react';
import { Section } from '../types';

interface HeroProps {
  section: Section;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalProducts: number;
}

const COPY: Record<Section, { eyebrow: string; title: string; accent: string; text: string; placeholder: string }> = {
  furniture: {
    eyebrow: 'Bellatrix · Vega · Sirius · Rivvo',
    title: 'Bathroom furniture',
    accent: 'catalogue',
    text: 'Vanity units, WC units, tall units and basins. Filter by colour and size, then build a selection for your client.',
    placeholder: 'Search by name or SKU (e.g. RIV60DR, BEL14TU)…',
  },
  panels: {
    eyebrow: 'Decorwall · Maxi Panels · Elegance · Tradeline',
    title: 'PVC wall panels',
    accent: 'catalogue',
    text: 'Waterproof PVC wall cladding for bathrooms and showers. Browse Maxi Panels, the Elegance range and Tradeline.',
    placeholder: 'Search by name or SKU (e.g. QMBS29, Carrera, Hampshire)…',
  },
  flooring: {
    eyebrow: 'Decorfloor · Elegance Range · Natural Collection',
    title: 'Flooring',
    accent: 'catalogue',
    text: 'Decorfloor Elegance Range and Natural Collection stone-effect and wood-effect flooring.',
    placeholder: 'Search by name or SKU (e.g. QMBNW01, Oak, Verona)…',
  },
};

export const Hero: React.FC<HeroProps> = ({ section, searchQuery, onSearchChange, totalProducts }) => {
  const c = COPY[section];
  return (
    <div className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/8142049/pexels-photo-8142049.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600"
          alt=""
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/70" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-2xl">
          <p className="text-sky-400 text-xs font-bold uppercase tracking-widest mb-3">
            {totalProducts} products · {c.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {c.title} <span className="text-sky-400">{c.accent}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">{c.text}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={c.placeholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <a
              href="#catalog-section"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm"
            >
              Browse catalogue <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
