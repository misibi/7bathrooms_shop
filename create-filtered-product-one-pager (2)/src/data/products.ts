import {
  Product,
  CollectionName,
  ProductCategory,
  MountType,
  StyleType,
  ColorFamily,
} from '../types';

// Every image below is the exact photo that the source store shows for this SKU
// (variant-level image, verified one by one).
const CDN = 'https://cdn.shopify.com/s/files/1/0795/3258/9393/files/';

const COLORS: Record<string, { label: string; family: ColorFamily }> = {
  W: { label: 'White Gloss', family: 'white' },
  A: { label: 'Anthracite Gloss', family: 'anthracite' },
  G: { label: 'Grey Gloss', family: 'grey' },
  B: { label: 'Black Gloss', family: 'black' },
};

interface Row {
  code: string;
  name: string;
  collection: CollectionName;
  category: ProductCategory;
  mount: MountType;
  style: StyleType;
  size: number;
  sizeLabel?: string;
  color: 'W' | 'A' | 'G' | 'B' | 'BASIN';
  dims: string;
  img: string;
}

const make = (r: Row): Product => {
  const c =
    r.color === 'BASIN'
      ? { label: 'White Ceramic', family: 'white' as ColorFamily }
      : COLORS[r.color];
  return {
    id: r.code,
    section: 'furniture',
    code: r.code,
    name: r.name,
    collection: r.collection,
    category: r.category,
    mountType: r.mount,
    styleType: r.style,
    size: r.size,
    sizeLabel: r.sizeLabel ?? `${r.size}mm`,
    color: c.label,
    colorFamily: c.family,
    dimensions: r.dims,
    image: CDN + r.img,
  };
};

const rows: Row[] = [];

// ---------------------------------------------------------------- BELLATRIX
const BEL = 'Bellatrix' as const;
rows.push(
  { code: 'BEL50WCL-W', name: 'Bellatrix WC Unit White Gloss PVC L Shape 500mm', collection: BEL, category: 'WC Unit', mount: 'Floor Standing', style: 'L-Shape WC', size: 500, color: 'W', dims: 'W500 × D250 × H830 mm', img: 'VE50WC-W_1.jpg?v=1768405560' },
  { code: 'BEL50WCL-A', name: 'Bellatrix WC Unit Anthracite Gloss PVC L Shape 500mm', collection: BEL, category: 'WC Unit', mount: 'Floor Standing', style: 'L-Shape WC', size: 500, color: 'A', dims: 'W500 × D250 × H830 mm', img: 'VE50WC-A.jpg?v=1768405584' },
  { code: 'BEL505WC-W', name: 'Bellatrix WC Unit White Gloss PVC 505mm', collection: BEL, category: 'WC Unit', mount: 'Floor Standing', style: 'WC Unit', size: 505, color: 'W', dims: 'W505 × D250 × H830 mm', img: 'BEL505WC-W.jpg?v=1772721959' },
  { code: 'BEL505WC-A', name: 'Bellatrix WC Unit Anthracite Gloss PVC 505mm', collection: BEL, category: 'WC Unit', mount: 'Floor Standing', style: 'WC Unit', size: 505, color: 'A', dims: 'W505 × D250 × H830 mm', img: 'BEL505WC-A.jpg?v=1772721959' },
  { code: 'BEL50FS-W', name: 'Bellatrix Floor Standing Door 500mm White Gloss Vanity Unit', collection: BEL, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 500, color: 'W', dims: 'W495 × D390 × H830 mm', img: 'BEL50FS-W.jpg?v=1769011373' },
  { code: 'BEL50FS-A', name: 'Bellatrix Floor Standing Door 500mm Anthracite Gloss Vanity Unit', collection: BEL, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 500, color: 'A', dims: 'W495 × D390 × H830 mm', img: 'BEL50FS-A.jpg?v=1769011396' },
  { code: 'BEL60FS-W', name: 'Bellatrix Floor Standing Door 600mm White Gloss Vanity Unit', collection: BEL, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 600, color: 'W', dims: 'W600 × D450 × H830 mm', img: 'BEL60FS-W.jpg?v=1768916665' },
  { code: 'BEL60FS-A', name: 'Bellatrix Floor Standing Door 600mm Anthracite Gloss Vanity Unit', collection: BEL, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 600, color: 'A', dims: 'W600 × D450 × H830 mm', img: 'BEL60FS-A.jpg?v=1768916665' },
  { code: 'BEL14TU-W', name: 'Bellatrix Wall Hung White Gloss Tall Unit', collection: BEL, category: 'Tall Unit', mount: 'Wall Hung', style: 'Tall Storage', size: 1400, sizeLabel: '1400mm tall', color: 'W', dims: 'W350 × D250 × H1400 mm', img: 'BEL14TU-W.jpg?v=1768567510' },
  { code: 'BEL14TU-A', name: 'Bellatrix Wall Hung Anthracite Gloss Tall Unit', collection: BEL, category: 'Tall Unit', mount: 'Wall Hung', style: 'Tall Storage', size: 1400, sizeLabel: '1400mm tall', color: 'A', dims: 'W350 × D250 × H1400 mm', img: 'BEL14TU-A.jpg' },
  { code: 'BEL60WMD-W', name: 'Bellatrix Wall Hung Drawer 600mm White Gloss Vanity Unit', collection: BEL, category: 'Vanity Unit', mount: 'Wall Hung', style: '2 Drawers', size: 600, color: 'W', dims: 'W600 × D457 × H500 mm', img: 'BEL60WMD-W.jpg?v=1768579509' },
  { code: 'BEL60WMD-A', name: 'Bellatrix Wall Hung Drawer 600mm Anthracite Gloss Vanity Unit', collection: BEL, category: 'Vanity Unit', mount: 'Wall Hung', style: '2 Drawers', size: 600, color: 'A', dims: 'W600 × D457 × H500 mm', img: 'BEL60WMD-A.jpg?v=1768579534' },
  { code: 'BEL60FSD-W', name: 'Bellatrix Floor Standing Drawer 600mm White Gloss Vanity Unit', collection: BEL, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Drawers', size: 600, color: 'W', dims: 'W600 × D450 × H830 mm', img: 'BEL60FSD-W.jpg?v=1768841865' },
  { code: 'BEL60FSD-A', name: 'Bellatrix Floor Standing Drawer 600mm Anthracite Gloss Vanity Unit', collection: BEL, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Drawers', size: 600, color: 'A', dims: 'W600 × D450 × H830 mm', img: 'BEL60FSD-A.jpg?v=1768841992' }
);

// --------------------------------------------------------------------- VEGA
const VEG = 'Vega' as const;
rows.push(
  { code: 'VE50WC-W', name: 'Vega WC Unit White Gloss PVC 505mm', collection: VEG, category: 'WC Unit', mount: 'Floor Standing', style: 'WC Unit', size: 505, color: 'W', dims: 'W500 × D250 × H830 mm', img: 'VE50WC-W_1.jpg?v=1768405560' },
  { code: 'VE50WC-A', name: 'Vega WC Unit Anthracite Gloss PVC 505mm', collection: VEG, category: 'WC Unit', mount: 'Floor Standing', style: 'WC Unit', size: 505, color: 'A', dims: 'W500 × D250 × H830 mm', img: 'VE50WC-A.jpg?v=1768405584' },
  { code: 'VE50FS-W', name: 'Vega Floor Standing Door 500mm White Gloss Vanity Unit', collection: VEG, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 500, color: 'W', dims: 'W500 × D450 × H830 mm', img: 'VE50FS-W_1.jpg?v=1768408095' },
  { code: 'VE50FS-A', name: 'Vega Floor Standing Door 500mm Anthracite Gloss Vanity Unit', collection: VEG, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 500, color: 'A', dims: 'W500 × D450 × H830 mm', img: 'VE50FS-A.jpg?v=1768408114' },
  { code: 'VE60FS-W', name: 'Vega Floor Standing Door 600mm White Gloss Vanity Unit', collection: VEG, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 600, color: 'W', dims: 'W600 × D450 × H830 mm', img: 'VE60FS-W_1.jpg?v=1768406730' },
  { code: 'VE60FS-A', name: 'Vega Floor Standing Door 600mm Anthracite Gloss Vanity Unit', collection: VEG, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 600, color: 'A', dims: 'W600 × D450 × H830 mm', img: 'VE60FS-A.jpg?v=1768406761' },
  { code: 'VE60FSD-W', name: 'Vega Floor Standing Drawer 600mm White Gloss Vanity Unit', collection: VEG, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Drawers', size: 600, color: 'W', dims: 'W600 × D450 × H830 mm', img: 'VE60FSD-W.jpg?v=1768565206' },
  { code: 'VEFSD60-A', name: 'Vega Floor Standing Drawer 600mm Anthracite Gloss Vanity Unit', collection: VEG, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Drawers', size: 600, color: 'A', dims: 'W600 × D450 × H830 mm', img: 'VE60FSD-A.jpg?v=1768565210' },
  { code: 'VE14TU-W', name: 'Vega Wall Hung White Gloss Tall Unit', collection: VEG, category: 'Tall Unit', mount: 'Wall Hung', style: 'Tall Storage', size: 1200, sizeLabel: '1200mm tall', color: 'W', dims: 'W300 × D250 × H1200 mm', img: 'VE14TU-W_1.jpg?v=1768401074' },
  { code: 'VE14TU-A', name: 'Vega Wall Hung Anthracite Gloss Tall Unit', collection: VEG, category: 'Tall Unit', mount: 'Wall Hung', style: 'Tall Storage', size: 1200, sizeLabel: '1200mm tall', color: 'A', dims: 'W300 × D250 × H1200 mm', img: 'VE14TU-A.jpg?v=1768405014' }
);

// -------------------------------------------------------- MERSEY BASINS
const CER = 'Mersey Ceramics' as const;
rows.push(
  { code: 'KV-50', name: 'Mersey Mid-Edge Basin (VEGA & BELLA)', collection: CER, category: 'Basin', mount: 'Universal / Basin', style: 'Ceramic Basin', size: 500, sizeLabel: '500mm', color: 'BASIN', dims: 'W500 × D395 × H180 mm', img: 'ChatGPTImageJan23_2026_10_43_20AM_10c9c2d2-ba21-4291-bbbc-23976cb595d7.png?v=1769165537' },
  { code: 'BAS600', name: 'Mersey Thin Edge Basin (VEGA & BELLA)', collection: CER, category: 'Basin', mount: 'Universal / Basin', style: 'Ceramic Basin', size: 600, sizeLabel: '600mm', color: 'BASIN', dims: 'W600 × D460 × H170 mm', img: 'ChatGPTImageJan23_2026_10_45_14AM.png?v=1769165154' }
);

// ------------------------------------------------------------------- SIRIUS
const SIR = 'Sirius' as const;
rows.push(
  { code: 'SIRF50W', name: 'Sirius 500mm PVC Floor Standing Vanity Unit - White Gloss', collection: SIR, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 500, color: 'W', dims: 'W490 × D470 × H830 mm (with basin)', img: 'SIRF50W.jpg?v=1769080915' },
  { code: 'SIRF50A', name: 'Sirius 500mm PVC Floor Standing Vanity Unit - Anthracite Gloss', collection: SIR, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 500, color: 'A', dims: 'W490 × D470 × H830 mm (with basin)', img: 'SIRF50A.jpg?v=1769081130' },
  { code: 'SIRF60W', name: 'Sirius 600mm PVC Floor Standing Vanity Unit - White Gloss', collection: SIR, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 600, color: 'W', dims: 'W590 × D470 × H830 mm (with basin)', img: 'SIRF60W.jpg?v=1769015156' },
  { code: 'SIRF60A', name: 'Sirius 600mm PVC Floor Standing Vanity Unit - Anthracite Gloss', collection: SIR, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors', size: 600, color: 'A', dims: 'W590 × D470 × H830 mm (with basin)', img: 'SIRF60A.jpg?v=1769081204' },
  { code: 'SIRW50W', name: 'Sirius 500mm PVC Wall Hung Vanity Unit - White Gloss', collection: SIR, category: 'Vanity Unit', mount: 'Wall Hung', style: '2 Doors', size: 500, color: 'W', dims: 'W490 × D470 × H480 mm (with basin)', img: 'SIRW50W.jpg?v=1769014807' },
  { code: 'SIRW50A', name: 'Sirius 500mm PVC Wall Hung Vanity Unit - Anthracite Gloss', collection: SIR, category: 'Vanity Unit', mount: 'Wall Hung', style: '2 Doors', size: 500, color: 'A', dims: 'W490 × D470 × H480 mm (with basin)', img: 'SIRW50A.jpg?v=1769081366' },
  { code: 'SIRW60W', name: 'Sirius 600mm PVC Wall Hung Vanity Unit - White Gloss', collection: SIR, category: 'Vanity Unit', mount: 'Wall Hung', style: '2 Doors', size: 600, color: 'W', dims: 'W590 × D470 × H480 mm (with basin)', img: 'SIRW60W.jpg?v=1769014670' },
  { code: 'SIRW60A', name: 'Sirius 600mm PVC Wall Hung Vanity Unit - Anthracite Gloss', collection: SIR, category: 'Vanity Unit', mount: 'Wall Hung', style: '2 Doors', size: 600, color: 'A', dims: 'W590 × D470 × H480 mm (with basin)', img: 'SIRW60A.jpg?v=1769081444' },
  { code: 'SIRWC50A', name: 'Sirius 500mm PVC WC Unit - Anthracite Gloss', collection: SIR, category: 'WC Unit', mount: 'Floor Standing', style: 'WC Unit', size: 500, color: 'A', dims: 'W500 × D250 × H830 mm', img: 'SIRWC50A.jpg?v=1769081581' },
  { code: 'SIRWC50W', name: 'Sirius 500mm PVC WC Unit - White Gloss', collection: SIR, category: 'WC Unit', mount: 'Floor Standing', style: 'WC Unit', size: 500, color: 'W', dims: 'W500 × D250 × H830 mm', img: 'SIRWC50W.jpg?v=1769015023' },
  { code: 'SIR16TUA', name: 'Sirius 1600mm Side Unit - Anthracite Gloss', collection: SIR, category: 'Tall Unit', mount: 'Floor Standing', style: 'Tall Storage', size: 1600, sizeLabel: '1600mm tall', color: 'A', dims: 'W400 × D300 × H1600 mm', img: 'SIR16TUA.jpg?v=1769081500' },
  { code: 'SIR16TUW', name: 'Sirius 1600mm Side Unit - White Gloss', collection: SIR, category: 'Tall Unit', mount: 'Floor Standing', style: 'Tall Storage', size: 1600, sizeLabel: '1600mm tall', color: 'W', dims: 'W400 × D300 × H1600 mm', img: 'SIR16TUW.jpg?v=1769014913' },
  { code: 'SIRB50', name: 'Sirius 500mm Ceramic Basin', collection: SIR, category: 'Basin', mount: 'Universal / Basin', style: 'Ceramic Basin', size: 500, color: 'BASIN', dims: 'W500 × D480 × H55 mm', img: 'e13a931e-9c91-472f-b35d-b14880ebfc0c.jpg?v=1764777362' },
  { code: 'SIRB60', name: 'Sirius 600mm Ceramic Basin', collection: SIR, category: 'Basin', mount: 'Universal / Basin', style: 'Ceramic Basin', size: 600, color: 'BASIN', dims: 'W600 × D480 × H55 mm', img: '89410193-e3a2-4c19-98f6-00d2205be7d2.jpg?v=1764777659' }
);

// -------------------------------------------------------------------- RIVVO
const RIV = 'Rivvo' as const;
const RIVVO_SIZES = [500, 600, 700, 800];
const COLOR_WORD = { B: 'Black Gloss', G: 'Grey Gloss', W: 'White Gloss' } as const;
const COLOR_ORDER = ['B', 'G', 'W'] as const;

// One photo per product on the store, shared by all four sizes.
const DOOR_IMG = {
  B: 'RIV60DO-B_047ffc93-105a-4ffb-95bf-f909ee663158.jpg?v=1775118269',
  G: 'RIV60DO-G.jpg?v=1775117467',
  W: 'RIV60DO-W.jpg?v=1775115707',
};
const DRAWER_IMG = {
  B: 'RIV60DR-B.jpg?v=1775123271',
  G: 'RIV60DR-G.jpg?v=1775123014',
  W: 'RIV60DR-W.jpg?v=1775122578',
};
const WC_IMG = {
  B: 'RIV50WC-B_638256a3-3fd3-48bf-8125-7c558fc970c7.jpg?v=1775114796',
  G: 'RIV50WC-G.jpg?v=1775113630',
  W: 'RIV50WC-W.jpg?v=1775113632',
};
const TALL_IMG = {
  B: 'RIV13SU-B.jpg?v=1775056902',
  G: 'RIV13SU-G_4b85f188-faf0-417c-8d54-7004d0369831.jpg?v=1775058027',
  W: 'RIV13SU-W.jpg?v=1775056903',
};

COLOR_ORDER.forEach((c) =>
  RIVVO_SIZES.forEach((s) =>
    rows.push({
      code: `RIV${s / 10}DO-${c}`,
      name: `Rivvo ${s}mm Vanity Unit With 2 Doors - ${COLOR_WORD[c]}`,
      collection: RIV, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Doors',
      size: s, color: c, dims: `W${s} × D390 × H830 mm`, img: DOOR_IMG[c],
    })
  )
);
COLOR_ORDER.forEach((c) =>
  RIVVO_SIZES.forEach((s) =>
    rows.push({
      code: `RIV${s / 10}DR-${c}`,
      name: `Rivvo ${s}mm Vanity Unit With 2 Drawers - ${COLOR_WORD[c]}`,
      collection: RIV, category: 'Vanity Unit', mount: 'Floor Standing', style: '2 Drawers',
      size: s, color: c, dims: `W${s} × D390 × H830 mm`, img: DRAWER_IMG[c],
    })
  )
);
COLOR_ORDER.forEach((c) =>
  rows.push({
    code: `RIV50WC-${c}`,
    name: `Rivvo WC 500mm Unit - ${COLOR_WORD[c]}`,
    collection: RIV, category: 'WC Unit', mount: 'Floor Standing', style: 'WC Unit',
    size: 500, color: c, dims: 'W500 × D250 × H830 mm', img: WC_IMG[c],
  })
);
COLOR_ORDER.forEach((c) =>
  rows.push({
    code: `RIV13SU-${c}`,
    name: `Rivvo 1300mm Tall Unit - ${COLOR_WORD[c]}`,
    collection: RIV, category: 'Tall Unit', mount: 'Wall Hung', style: 'Tall Storage',
    size: 1300, sizeLabel: '1300mm tall', color: c, dims: 'W300 × D250 × H1300 mm', img: TALL_IMG[c],
  })
);

// Doors code pattern is RIV50DO-B etc. (size digits are part of the code)
export const PRODUCTS: Product[] = rows.map(make);
