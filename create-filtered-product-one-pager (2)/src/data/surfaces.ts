import { Product, ColorFamily } from '../types';

// Data and photos come from mbdecor.co.uk (product SKU -> the product's own featured image).
const U = 'https://mbdecor.co.uk/wp-content/uploads/';

// [post id, SKU, colour name, colour family, image path, thickness override?]
type Row = [number, string, string, ColorFamily, string, number?];

interface PanelSeries {
  collection: string;
  series: string;
  prefix: string;
  width: number;
  length: number;
  thickness: number;
  rows: Row[];
}

const buildPanels = (s: PanelSeries): Product[] =>
  s.rows.map(([id, sku, colour, fam, img, t]) => {
    const thick = t ?? s.thickness;
    return {
      id: sku,
      section: 'panels',
      code: sku,
      name: `${s.prefix} ${colour}`,
      collection: s.collection,
      category: 'Wall Panel',
      mountType: 'Wall cladding',
      styleType: s.series,
      size: s.width,
      sizeLabel: `${s.width}mm wide`,
      color: colour,
      colorFamily: fam,
      dimensions: `L${s.length} × W${s.width} × T${thick} mm`,
      image: U + img,
      note: `Coverage ${((s.length * s.width) / 1e6).toFixed(2)} m² per panel`,
      sourceUrl: `https://mbdecor.co.uk/?p=${id}`,
    };
  });

// ---------------------------------------------------------------- MAXI PANELS
const MAXI: PanelSeries = {
  collection: 'Decorwall Maxi Panels',
  series: 'Maxi Panel',
  prefix: 'Decorwall Maxi Panel –',
  width: 900,
  length: 2400,
  thickness: 10,
  rows: [
    [20714, 'QMBM10-900', 'Matt Pewter Stone', 'grey', 'Maxi-Pewter-Stone-QMBM10-900.webp'],
    [20713, 'QMBM06-900', 'Matt Truffle Stone', 'beige', 'Maxi-Truffle-Stone-QMBM06-900.webp'],
    [20712, 'QMBM08-900', 'Matt Onyx Stone', 'black', 'Maxi-Onyx-Stone-QMBM08-900.webp'],
    [20711, 'QMBM11-900', 'Matt Carrera', 'white', 'Maxi-Panel-matt-Carrera-Thumb.webp'],
    [17284, 'QMBM04-900', 'Gloss Bianco White', 'white', 'Maxi-Bianco-White-QMBM04-900.webp'],
    [17283, 'QMBM02-900', 'Gloss Bianco Gold', 'white', 'Maxi-Bianco-Gold-QMBM02-900.webp'],
    [17282, 'QMBM01-900', 'Gloss Antique Marble', 'beige', 'Maxi-Antique-Marble-QMBM01-900.webp'],
    [10562, 'QMBM26-900', 'Matt Misty Stone', 'grey', 'Maxi-Panel-Misty-Stone-thumb.jpg'],
    [10538, 'QMBM25-900', 'Matt White Stone', 'white', 'Maxi-Shower-Panel-White-Stone-Thumb.jpg'],
    [4141, 'QMBM16-900', 'Gloss White', 'white', '2022/02/QMBM16-900-Maxi-Panel-Gloss-White-Thumb.jpg'],
    [4138, 'QMBM24-900', 'Matt Metallic Stone', 'metallic', '2022/02/qmbm24-900-Maxi-Panel-Matt-Metallic-Stone-Thumb.jpg'],
    [4135, 'QMBM17-900', 'Matt Grey Stone', 'grey', 'QMBM17-900-Decorwall-Maxi-Panel-Grey-Stone-Wall-Shower-Panel-Thumb-1.webp'],
    [4134, 'QMBM23-900', 'Gloss Galaxy White', 'white', 'QMBM23-900-Decorwall-Maxi-Panel-Galaxy-White-Shower-Panel-Thumb.webp'],
    [4128, 'QMBM20-900', 'Gloss Carrera White', 'white', 'QMBM20-900-Decorwall-Maxi-Panel-Gloss-Carrera-Shower-Panel-Thumb-1.webp'],
    [4126, 'QMBM18-900', 'Matt Beige Stone', 'beige', 'QMBM18-900-Maxi-Matt-Beige-Stone-Thumb.jpg'],
    [4125, 'QMBM05-900', 'Gloss Fusion Light Grey', 'grey', 'Maxi-Panel-Fusion-Light-Grey-Thumb.jpg'],
    [4121, 'QMBM14-900', 'Gloss Beige Marble', 'beige', '2022/02/QMBM14-900-Maxi-Beige-Marble-Thumb.jpg'],
    [4117, 'QMBM13-900', 'Gloss Grey Marble', 'grey', 'QMBM13-900-Decorwall-Maxi-Panel-Grey-Marble-Shower-Panel-Thumb-1.webp'],
    [4116, 'QMBM09-900', 'Gloss Grey Sparkle', 'grey', 'QMBM09-900-Maxi-grey-Sparkle-Thumb.jpg'],
    [4111, 'QMBM07-900', 'Gloss White Sparkle', 'white', '2022/02/qmbm07-900-Maxi-Panel-Sparkle-White-Thumb.jpg'],
  ],
};

// ------------------------------------------------------------ ELEGANCE RANGE
const EL = 'Decorwall Elegance';

const ultimo = (id: number, sku: string, name: string, file?: string): Row => [
  id,
  sku,
  name,
  'other',
  file ?? `${sku}-Decorwall-Elegance-Ultimo-Tile-${name}-Thumb.jpg`,
];

const ELEGANCE: PanelSeries[] = [
  {
    collection: EL,
    series: 'Mineral',
    prefix: 'Decorwall Elegance Mineral',
    width: 300,
    length: 2700,
    thickness: 8,
    rows: [
      [23584, 'QMBS50', 'Lazurite', 'blue', 'QMBS50-Decorwall-Elegance-Mineral-300mm-Lazurite-Thumb.jpg'],
      [23585, 'QMBS51', 'Bornite', 'other', 'QMBS51-Decorwall-Elegance-Mineral-300mm-Bornite-Thumb.jpg'],
      [23586, 'QMBS52', 'Jasper', 'other', 'QMBS52-Decorwall-Elegance-Mineral-300mm-Jasper-Thumb.jpg'],
      [23582, 'QMBS48', 'Limestone', 'beige', 'QMBS48-Decorwall-Elegance-Mineral-300mm-Limestone-Thumb.jpg'],
      [23587, 'QMBS53', 'Emerald', 'green', 'QMBS53-Decorwall-Elegance-Mineral-300mm-Emerald-Thumb.jpg'],
      [23583, 'QMBS49', 'Rhodonite', 'pink', 'QMBS49-Decorwall-Elegance-Mineral-300mm-Rhondonite-Thumb.jpg'],
      [17316, 'QMBS47', 'Claystone', 'beige', 'QMBS47-Elegance-Mineral-Claystone-Thumb.jpg'],
      [17315, 'QMBS46', 'Sand', 'beige', 'QMBS46-Elegance-Mineral-Sand-Thumb.jpg'],
      [17314, 'QMBS45', 'Phoenix', 'other', 'QMBS45-Elegance-Mineral-Phoenix-Thumb.jpg'],
      [17313, 'QMBS44', 'Lime', 'other', 'QMBS44-Elegance-Mineral-Lime-Thumb.jpg'],
      [17312, 'QMBS40', 'Selenite', 'white', 'QMBS40-Elegance-Mineral-Selenite-Thumb.jpg'],
      [17311, 'QMBS39', 'Zincite', 'other', 'QMBS39-Elegance-Mineral-Zincite-Thumb.jpg'],
      [17310, 'QMBS38', 'Flint', 'grey', 'QMBS38-Elegance-Mineral-Flint-Thumb.jpg'],
      [17307, 'QMBS37', 'Quartz Grey', 'grey', 'QMBS37-Elegance-Mineral-Quartz-Grey-Thumb.jpg'],
      [17306, 'QMBS36', 'Agate', 'other', 'QMBS36-Elegance-Mineral-Agate-Thumb.jpg'],
      [4069, 'QMBS34', 'Marquina', 'black', '2022/02/QMBS34-Mineral-Marqiuna-Thumb.jpg'],
      [4067, 'QMBS35', 'Pacific', 'other', '2022/02/QMBS35-Mineral-Pacific-Thumb.jpg'],
      [4065, 'QMBS33', 'Castello', 'other', '2022/02/QMBS33-Mineral-Castello-Thumb.jpg'],
      [4063, 'QMBS30', 'Beige Granite', 'beige', '2022/02/QMBS30-Mineral-Beige-Granite-thumb.jpg'],
      [4061, 'QMBS28', 'Grey Granite', 'grey', '2022/02/QMBS28-Mineral-Grey-Granite-thumb.jpg'],
      [4059, 'QMBS29', 'Black Granite', 'black', '2022/02/QMBS29-Mineral-Black-Granite-thumb.jpg'],
      [1144, 'QMBS10', 'Calcite', 'other', '2021/11/Elegance-Mineral-Calcite-Thumb.jpg'],
      [1096, 'QMBS21', 'Imperial Buff', 'beige', '2021/11/Elegance-Mineral-Imperial-Buff-Thumb.jpg'],
      [1093, 'QMBS20', 'Imperial Grey', 'grey', '2021/11/Elegance-Mineral-Imperial-Grey-Thumb.jpg'],
      [1104, 'QMBS23', 'Java', 'other', '2021/11/QMBS22-Java-Marble.jpg'],
      [1100, 'QMBS22', 'Fantasia', 'other', '2021/11/QMBS22Fantasia-Marble.jpg'],
      [1090, 'QMBS19', 'Quarried Charcoal', 'black', '2021/11/MB-Mineral-Quarried-Charcoal-Thumb.jpg'],
      [979, 'QMBS12', 'Quarried Beige', 'beige', 'MB-Mineral-Quarried-Beige-Thumb.jpg'],
      [975, 'QMBS11', 'Quarried Grey', 'grey', 'MB-Mineral-Quarried-Grey-Thumb.jpg'],
      [971, 'QMBS09', 'Gypsum', 'white', '2021/11/Gypsum-QMBS09-e1568021931778.jpg'],
      [967, 'QMBS08', 'Chromite', 'other', 'QMBS08-Decorwall-Elegance-Mineral-Chromite-Thumb.webp'],
      [963, 'QMBS07', 'Magnetite', 'other', '2021/11/magnetite-QMBS07.jpg'],
    ],
  },
  {
    collection: EL,
    series: 'Mineral Tile',
    prefix: 'Decorwall Elegance Mineral Tile',
    width: 300,
    length: 2700,
    thickness: 8,
    rows: [
      [4107, 'QMBS01T', 'Topaz', 'other', '2022/02/Elegance-Mineral-topaz-tile-thumb.jpg'],
      [4103, 'QMBS02T', 'Shale', 'grey', '2022/02/Elegance-Mineral-Shale-Thumb.jpg'],
      [1139, 'QMBS03T', 'Dolomite', 'other', '2021/11/Elegance-Mineral-Tile-Dolomite-Thumb.jpg'],
    ],
  },
  {
    collection: EL,
    series: 'Abstract',
    prefix: 'Decorwall Elegance Abstract',
    width: 300,
    length: 2700,
    thickness: 8,
    rows: [
      [26975, 'QMBS56', 'Lemon Zest', 'yellow', 'QMBS56-Decorwall-Elegance-Abstract-Lemon-Zest-Thumbnail.webp'],
      [3150, 'QMBS27', 'Sage', 'green', '2022/01/QMBS27-Elegance-Sage-Abstract-Thumb.jpg'],
      [3147, 'QMBS26', 'Pink', 'pink', '2022/01/QMBS26-Elegance-Pink-Abstract-Thumb.jpg'],
      [1137, 'QMBS25', 'Dark Blue', 'blue', '2021/11/Elegance-Abstract-Dark-Blue-Thumb.jpg'],
      [1122, 'QMBS24', 'Soft Blue', 'blue', '2021/03/Elegance-Abstract-Soft-Blue-Thumb.jpg'],
      [999, 'QMBS17', 'Brown', 'brown', '2021/03/Elegance-Abstract-Brown-Thumb.jpg'],
      [995, 'QMBS16', 'Platinum', 'metallic', '2021/03/Elegance-Abstract-Platinum-Thumb.jpg'],
      [991, 'QMBS15', 'Silver', 'metallic', '2021/03/Elegance-Abstract-Silver-Thumb.jpg'],
      [987, 'QMBS14', 'Dark', 'black', '2021/03/Elegance-Abstract-Dark-Thumb.jpg'],
      [983, 'QMBS13', 'Light', 'white', '2021/03/Abstract-Light-Thumb.jpg'],
    ],
  },
  {
    collection: EL,
    series: 'Damask',
    prefix: 'Decorwall Elegance Damask',
    width: 300,
    length: 2700,
    thickness: 8,
    rows: [
      [24523, 'QMBS54', 'Gilted Blue', 'blue', 'QMBS54-Decorwall-Mineral-Damask-Gilted-Blue-thumb-web.jpg'],
      [24524, 'QMBS55', 'Gilted Green', 'green', 'QMBS55-Decorwall-Mineral-Damask-Gilted-Green-thumb-web.jpg'],
      [4075, 'QMBS31', 'Gilted Silver', 'metallic', '2022/02/QMBS32-Damask-Gilted-Silver-Thumb.jpg'],
      [4071, 'QMBS32', 'Gilted Bronze', 'metallic', '2022/02/QMBS32-Damask-Gilted-Bronze-thumb.jpg'],
    ],
  },
  {
    collection: EL,
    series: 'Woodgrain',
    prefix: 'Decorwall Elegance Woodgrain',
    width: 300,
    length: 2700,
    thickness: 8,
    rows: [
      [17319, 'QMBS43', 'Carbon', 'black', 'QMBS43-Elegance-Carbon-Thumbnail.jpg'],
      [17318, 'QMBS42', 'Kona', 'brown', 'QMBS42-Elegance-Kona-Thumbnail.jpg'],
      [17317, 'QMBS41', 'Driftwood', 'other', 'QMBS41-Elegance-Driftwood-Thumbnail.jpg'],
    ],
  },
  {
    collection: EL,
    series: 'Ultimo Tile',
    prefix: 'Decorwall Elegance Ultimo Tile',
    width: 500,
    length: 2700,
    thickness: 8,
    rows: [
      ultimo(23574, 'QMBU28', 'Perth'),
      ultimo(23575, 'QMBU29', 'Lisburn'),
      ultimo(23573, 'QMBU27', 'Poole'),
      ultimo(23538, 'QMBU26', 'Chester'),
      ultimo(23577, 'QMBU31', 'Exeter'),
      ultimo(23576, 'QMBU30', 'Surrey'),
      ultimo(17341, 'QMBU25', 'Cornwall'),
      ultimo(17340, 'QMBU24', 'Nottinghamshire'),
      ultimo(17339, 'QMBU23', 'Oxfordshire'),
      ultimo(17337, 'QMBU22', 'Kent'),
      ultimo(17336, 'QMBU21', 'Orkney'),
      ultimo(17334, 'QMBU20', 'Windsor'),
      ultimo(17333, 'QMBU19', 'Cheshire'),
      ultimo(17326, 'QMBU18', 'Lancashire'),
      ultimo(17325, 'QMBU17', 'Suffolk'),
      ultimo(17324, 'QMBU16', 'Norfolk', 'QMBU16-Decorwall-Elegance-Ultimo-Tile-NorfolkThumb.jpg'),
      ultimo(17323, 'QMBU15', 'Berkshire'),
      ultimo(17322, 'QMBU14', 'Northumberland'),
      ultimo(17320, 'QMBU13', 'Hampshire'),
      ultimo(4100, 'QMBU12', 'Stirling', 'QMBU12-Decorwall-Elegance-Ultimo-Tile-Stirling-Thumb-1.jpg'),
      ultimo(4099, 'QMBU11', 'Wiltshire'),
      ultimo(4095, 'QMBU10', 'Shropshire'),
      ultimo(1148, 'QMBU09', 'Devon'),
      ultimo(1082, 'QMBU07', 'Gwent'),
      ultimo(1079, 'QMBU06', 'Angus'),
      ultimo(1076, 'QMBU05', 'Armagh', 'QMBU05-Decorwall-Elegance-Ultimo-Tile-Armargh-Thumb.jpg'),
      ultimo(1073, 'QMBU04', 'Yorkshire', 'QMBU04-Decorwall-Elegance-Ultimo-Tile-Yorkshire-Thumb-1.jpg'),
      ultimo(1113, 'QMBU01', 'Cleveland'),
    ],
  },
  {
    collection: EL,
    series: 'Contempo Tile',
    prefix: 'Decorwall Elegance Contempo Tile',
    width: 500,
    length: 2700,
    thickness: 8,
    rows: [
      [23589, 'QMBUC08', 'Earl', 'other', 'QMBUC08-Decorwall-Elegance-Contempo-Tile-Earl-Thumb.jpg'],
      [23588, 'QMBUC07', 'Peppermint', 'green', 'QMBUC07-Decorwall-Elegance-Contempo-Tile-Peppermint-Thumb.jpg'],
      [23590, 'QMBUC09', 'Ice', 'other', 'QMBUC09-Decorwall-Elegance-Contempo-Tile-Ice-Thumb.jpg'],
      [23591, 'QMBUC10', 'Chai', 'other', 'QMBUC10-Decorwall-Elegance-Contempo-Tile-Chai-Thumb.jpg'],
      [21763, 'QMBUC06', 'Lecco', 'other', 'QMBUC06-Decorwall-Elegance-Contempo-Tile-Lecco-Thumb.jpg'],
      [21761, 'QMBUC05', 'Lucca', 'other', 'QMBUC05-Decorwall-Elegance-Contempo-Tile-Lucca-Thumb.jpg'],
      [1141, 'QMBUC02', 'Ancona', 'grey', '2021/11/Contempo-Ancona-Tile.jpg'],
      [1126, 'QMBUC03', 'Biella', 'other', '2021/11/Comtempo-Biella-Tile.jpg'],
      [1118, 'QMBUC01', 'Formia', 'other', '2021/11/Contempo-Formia-Tile.jpg'],
    ],
  },
  {
    collection: EL,
    series: 'Contempo Smooth',
    prefix: 'Decorwall Elegance Contempo Smooth',
    width: 500,
    length: 2700,
    thickness: 8,
    rows: [
      [1134, 'QMBUC02-S', 'Ancona', 'grey', '2021/11/Contempo-Ancona.jpg'],
      [1132, 'QMBUC03-S', 'Biella', 'other', '2021/11/Contempo-Biella.jpg'],
    ],
  },
];

// ------------------------------------------------------------------ TRADELINE
const TRADELINE: PanelSeries = {
  collection: 'Decorwall Tradeline',
  series: 'Tradeline',
  prefix: 'Decorwall Trade Line –',
  width: 250,
  length: 2600,
  thickness: 5,
  rows: [
    [35032, 'QS24', 'Matt White', 'white', 'White-Wall-Panel-Thumb.webp'],
    [33055, 'QS25', 'Gloss White', 'white', 'White-Wall-Panel-Thumb.webp'],
    [21710, 'QS12', 'Grey Sparkle', 'grey', '2022/01/QS12-Tradeline-GRey-Sparkle.jpg'],
    [21417, 'QS21', 'Pewter Stone', 'grey', 'Maxi-Pewter-Stone-QMBM10-900.webp'],
    [21414, 'QS20', 'Onyx Stone', 'black', 'Maxi-Onyx-Stone-QMBM08-900.webp'],
    [21412, 'QS19', 'Truffle Stone', 'beige', 'Maxi-Truffle-Stone-QMBM06-900.webp'],
    [21411, 'QS01', 'Black Sparkle', 'black', '2021/11/QMBE23-Sparkle-Black-Thumb.jpg'],
    [11890, 'QS17', 'White Stone', 'white', 'Maxi-Shower-Panel-White-Stone-Thumb.jpg'],
    [11889, 'QS16', 'Misty Stone', 'grey', 'Maxi-Panel-Misty-Stone-thumb.jpg'],
    [3257, 'QS14', 'Beige Stone', 'beige', '2022/01/Concrete-Beige-QS14.jpg'],
    [3255, 'QS13', 'Grey Stone', 'grey', '2022/01/Concrete-Grey-QS13.jpg'],
    [1161, 'QS11', 'Glazed Ash White', 'white', 'QS11-Glazed-White-Ash.jpg'],
    [1160, 'QS10', 'Glazed Grey Marble', 'grey', '2021/11/MB-Grey-Marble.jpg'],
    [1159, 'QS09', 'Glazed Beige Marble', 'beige', '2021/11/MB-Beige-Marble.jpg'],
    [1155, 'QS03', 'Gloss White Chrome V', 'white', '2021/11/gloss-white-V-2600.jpg', 8],
    [1152, 'QS02', 'White Sparkle', 'white', '2021/11/QMBE24-Sparkle-White-Thumb.jpg'],
  ],
};

export const PANELS: Product[] = [MAXI, ...ELEGANCE, TRADELINE].flatMap(buildPanels);

// ------------------------------------------------------------------- FLOORING
interface FloorRow {
  id: number;
  sku: string;
  name: string;
  img: string;
}

interface FloorSeries {
  collection: string;
  type: string;
  prefix: string;
  width: number;
  length: number;
  thickness?: number;
  note: string;
  fam: ColorFamily;
  rows: (FloorRow & { fam?: ColorFamily })[];
}

const buildFloor = (s: FloorSeries): Product[] =>
  s.rows.map((r) => ({
    id: r.sku,
    section: 'flooring' as const,
    code: r.sku,
    name: `${s.prefix} ${r.name}`,
    collection: s.collection,
    category: 'Flooring',
    mountType: 'Flooring',
    styleType: s.type,
    size: s.width,
    sizeLabel: `${s.width}mm wide`,
    color: r.name,
    colorFamily: r.fam ?? s.fam,
    dimensions: `L${s.length} × W${s.width}${s.thickness ? ` × T${s.thickness}` : ''} mm`,
    image: U + r.img,
    note: s.note,
    sourceUrl: `https://mbdecor.co.uk/?p=${r.id}`,
  }));

const FLOORING_SERIES: FloorSeries[] = [
  {
    collection: 'Decorfloor Elegance Range',
    type: 'Stone effect',
    prefix: 'Decorfloor Elegance Range –',
    width: 178,
    length: 1220,
    thickness: 5,
    note: 'Pack: 8 planks · 1.73 m² coverage',
    fam: 'other',
    rows: [
      { id: 29013, sku: 'QMBSF36', name: 'Agate', img: 'QMBS36-Elegance-Mineral-Agate-Thumb.jpg' },
      { id: 29012, sku: 'QMBSF29', name: 'Black Granite', img: '2022/02/QMBS29-Mineral-Black-Granite-thumb.jpg', fam: 'black' },
      { id: 29015, sku: 'QMBSF38', name: 'Flint', img: 'QMBS38-Elegance-Mineral-Flint-Thumb.jpg', fam: 'grey' },
      { id: 29011, sku: 'QMBSF10', name: 'Calcite', img: '2021/11/Elegance-Mineral-Calcite-Thumb.jpg' },
      { id: 29014, sku: 'QMBSF31', name: 'Gilted Silver', img: '2022/02/QMBS32-Damask-Gilted-Silver-Thumb.jpg', fam: 'metallic' },
    ],
  },
  {
    collection: 'Decorfloor Natural Collection',
    type: 'Stone effect',
    prefix: 'Decorfloor Natural Collection – Stone Effect',
    width: 300,
    length: 600,
    note: 'Box: 8 tiles · 1.44 m² coverage · 0.3 mm wear layer',
    fam: 'other',
    rows: [
      { id: 1864, sku: 'QMBNS01', name: 'Verona', img: '2021/12/QMBNS01-Verona.jpg' },
      { id: 1866, sku: 'QMBNS02', name: 'Livorno', img: '2021/12/QMBNS02-Livorno.jpg' },
      { id: 1862, sku: 'QMBNS03', name: 'Florence', img: '2021/12/QMBNS03-Florence.jpg' },
      { id: 1854, sku: 'QMBNS04', name: 'Genoa', img: '2021/12/QMBNS04-Genoa.jpg' },
      { id: 4589, sku: 'QMBNS05', name: 'Milan', img: '2022/02/QMBNS05-Decorfloor-Natural-Stone-Milan-Thumb.jpg' },
      { id: 17287, sku: 'QMBNS06', name: 'Sienna', img: 'QMBNS06-Decorfloor-Natural-Stone-Sienna-Thumb.jpg' },
      { id: 17288, sku: 'QMBNS07', name: 'Rome', img: 'QMBNS07-Decorfloor-Natural-Stone-Rome-Thumb.jpg' },
      { id: 17289, sku: 'QMBNS08', name: 'Leece', img: 'QMBNS08-Decorfloor-Natural-Stone-Leece-Thumb.jpg' },
      { id: 17290, sku: 'QMBNS09', name: 'Naples', img: 'QMBNS09-Decorfloor-Natural-Stone-Naples-Thumb.jpg' },
      { id: 17291, sku: 'QMBNS10', name: 'Parma', img: 'QMBNS10-Decorfloor-Natural-Stone-Parma-Thumb.jpg' },
    ],
  },
  {
    collection: 'Decorfloor Natural Collection',
    type: 'Wood effect',
    prefix: 'Decorfloor Natural Collection – Wood Effect',
    width: 180,
    length: 1220,
    note: 'Box: 8 planks · 1.76 m² coverage · 0.3 mm wear layer',
    fam: 'other',
    rows: [
      { id: 1868, sku: 'QMBNW01', name: 'English Oak', img: '2021/12/QMBNW01-English-Oak.jpg' },
      { id: 4585, sku: 'QMBNW02', name: 'French Oak', img: '2022/02/QMBNW02-Natural-French-Oak-Thumb.jpg' },
      { id: 1860, sku: 'QMBNW03', name: 'Canadian Oak', img: '2021/12/QMBNW03-Canadian-Oak.jpg' },
      { id: 1852, sku: 'QMBNW04', name: 'Irish Oak', img: 'QMBNW04-Decorfloor-Natural-Wood-Irish-Oak-thumb.jpg' },
      { id: 1858, sku: 'QMBNW05', name: 'Norwegian Oak', img: '2021/12/QMBNW05-Norwegian-Oak.jpg' },
      { id: 1856, sku: 'QMBNW06', name: 'Swedish Oak', img: '2021/12/QMBNW06-Swedish-Oak.jpg' },
      { id: 1870, sku: 'QMBNW07', name: 'Welsh Oak', img: '2021/12/QMBNW07-Welch-Oak-Natural-Wood-Flooring.jpg' },
      { id: 17295, sku: 'QMBNW08', name: 'Serbian Oak', img: 'QMBNW08-Decorfloor-Natural-Wood-Serbian-Oak-Thumb.jpg' },
      { id: 17296, sku: 'QMBNW09', name: 'Danish Oak', img: 'QMBNW09-Decorfloor-Natural-Wood-Danish-Oak-Thumb.jpg' },
      { id: 17297, sku: 'QMBNW10', name: 'Italian Oak', img: 'QMBNW09-Decorfloor-Natural-Wood-Italian-Oak-Thumb.jpg' },
    ],
  },
];

export const FLOORING: Product[] = FLOORING_SERIES.flatMap(buildFloor);
