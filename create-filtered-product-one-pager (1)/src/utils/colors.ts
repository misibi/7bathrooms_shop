import { ColorFamily } from '../types';

export const COLOR_ORDER: ColorFamily[] = [
  'white',
  'grey',
  'black',
  'beige',
  'brown',
  'blue',
  'green',
  'pink',
  'yellow',
  'metallic',
  'other',
];

export const COLOR_LABELS: Record<ColorFamily, string> = {
  white: 'White',
  anthracite: 'Anthracite',
  grey: 'Grey',
  black: 'Black / Charcoal',
  beige: 'Beige / Cream / Taupe',
  brown: 'Brown',
  blue: 'Blue',
  green: 'Green',
  pink: 'Pink',
  yellow: 'Yellow',
  metallic: 'Silver / Gold / Metallic',
  other: 'Other shades (see photo)',
};

export const colorDotClass = (family: string): string => {
  switch (family) {
    case 'black':
      return 'bg-black border-neutral-700';
    case 'anthracite':
      return 'bg-slate-700 border-slate-600';
    case 'grey':
      return 'bg-stone-400 border-stone-500';
    case 'beige':
      return 'bg-amber-100 border-amber-300';
    case 'brown':
      return 'bg-amber-800 border-amber-900';
    case 'blue':
      return 'bg-sky-500 border-sky-600';
    case 'green':
      return 'bg-emerald-500 border-emerald-600';
    case 'pink':
      return 'bg-pink-300 border-pink-400';
    case 'yellow':
      return 'bg-yellow-300 border-yellow-400';
    case 'metallic':
      return 'bg-gradient-to-br from-slate-200 via-amber-200 to-slate-400 border-slate-400';
    case 'other':
      return 'bg-gradient-to-br from-rose-200 via-sky-200 to-emerald-200 border-slate-300';
    default:
      return 'bg-white border-slate-300';
  }
};
