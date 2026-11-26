export interface Product {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables';
  tagline: string;
  season: string;
  packaging: string;
  image: string;
  description: string;
  specs: {
    origin: string;
    shelfLife: string;
    temperature: string;
    certifications: string[];
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'valencia-oranges',
    name: 'Valencia & Navel Oranges',
    category: 'fruits',
    tagline: 'High brix, sweet, juicy with vibrant golden rind',
    season: 'December - June',
    packaging: '15kg Telescopic Cartons / Open Top',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80',
    description: 'Carefully sorted and waxed for maximum freshness, our premium oranges offer exceptional sweetness and optimal juice content.',
    specs: {
      origin: 'AMAC Certified Groves',
      shelfLife: '60 - 90 Days under cold chain',
      temperature: '+3°C to +5°C',
      certifications: ['GlobalG.A.P.', 'ISO 22000', 'BRCGS'],
    },
  },
  {
    id: 'strawberries',
    name: 'Fresh Premium Strawberries',
    category: 'fruits',
    tagline: 'Hand-picked, ruby-red, luscious aroma and flavor',
    season: 'November - April',
    packaging: '10 x 250g Punnets (2.5kg per flat)',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
    description: 'Pre-cooled within 1 hour of harvest to protect texture, sweetness, and shelf-life for air freight destinations worldwide.',
    specs: {
      origin: 'AMAC Hydroponic & Protected Farms',
      shelfLife: '14 - 21 Days',
      temperature: '+0.5°C to +2°C',
      certifications: ['GlobalG.A.P.', 'GRASP'],
    },
  },
  {
    id: 'table-grapes',
    name: 'Seedless Grapes (Flame & Superior)',
    category: 'fruits',
    tagline: 'Crisp snap, high sugar content, uniform bunch weight',
    season: 'May - August',
    packaging: '4.5kg / 5kg Cartons (Pouch bags or punnets)',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80',
    description: 'Premium white and red seedless varieties cultivated under optimal climate conditions for global export standards.',
    specs: {
      origin: 'AMAC Export Vineyards',
      shelfLife: '45 - 60 Days',
      temperature: '-0.5°C to 0°C',
      certifications: ['GlobalG.A.P.', 'SMETA'],
    },
  },
  {
    id: 'pomegranates',
    name: 'Wonderful Pomegranates',
    category: 'fruits',
    tagline: 'Deep crimson arils, rich in antioxidants and flavor',
    season: 'September - January',
    packaging: '4kg / 4.5kg Cartons (counts 8 - 14)',
    image: 'https://images.unsplash.com/photo-1541344999736-83eca872f242?auto=format&fit=crop&w=800&q=80',
    description: 'Select large-caliber pomegranates with thin skin, succulent juicy kernels, and unmatched natural color.',
    specs: {
      origin: 'AMAC River Valley Groves',
      shelfLife: '90 - 120 Days',
      temperature: '+6°C to +7°C',
      certifications: ['GlobalG.A.P.', 'FDA Registered'],
    },
  },
  {
    id: 'fresh-onions',
    name: 'Golden & Red Onions',
    category: 'vegetables',
    tagline: 'Firm, dry-skinned, long storage life, pungent flavor',
    season: 'February - August',
    packaging: '10kg / 25kg Mesh Bags & 1-Ton Jumbo Bags',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80',
    description: 'Cured and mechanically graded in our modern packing station to guarantee zero defects, high dry matter, and long transit capability.',
    specs: {
      origin: 'AMAC Fertile Basin Lands',
      shelfLife: 'Up to 6 Months',
      temperature: '+0°C to +2°C / Dry Air Flow',
      certifications: ['GlobalG.A.P.', 'ISO 9001'],
    },
  },
  {
    id: 'fresh-potatoes',
    name: 'Spunta & Hermes Potatoes',
    category: 'vegetables',
    tagline: 'Triple-washed or natural soil, high starch quality',
    season: 'January - June',
    packaging: '10kg, 20kg, 25kg Polypropylene Bags',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    description: 'Ideal for both table consumption and industrial crisp/fry processing, grown in pest-free certified agricultural zones.',
    specs: {
      origin: 'Pest-Free Production Areas (PFPA)',
      shelfLife: '90 - 120 Days',
      temperature: '+4°C to +8°C',
      certifications: ['GlobalG.A.P.', 'HACCP'],
    },
  },
  {
    id: 'bell-peppers',
    name: 'Colored Bell Peppers (Red, Yellow, Green)',
    category: 'vegetables',
    tagline: 'Thick walls, crunchy bite, vibrant glossy colors',
    season: 'October - May',
    packaging: '5kg Cartons (Flowpack or loose)',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80',
    description: 'Greenhouse-grown peppers protected from pests and weather elements, picked directly into export cartons.',
    specs: {
      origin: 'AMAC Climate-Controlled Greenhouses',
      shelfLife: '21 - 30 Days',
      temperature: '+7°C to +9°C',
      certifications: ['GlobalG.A.P.', 'TNC'],
    },
  },
  {
    id: 'fresh-garlic',
    name: 'White & Violet Garlic',
    category: 'vegetables',
    tagline: 'Tightly wrapped cloves, intense aroma, fully cured',
    season: 'March - August',
    packaging: '5kg / 10kg Cartons & Mesh Sacks',
    image: 'https://images.unsplash.com/photo-1588615419958-417161972629?auto=format&fit=crop&w=800&q=80',
    description: 'Naturally dried with stems trimmed and clean roots, ready for supermarkets and food service distributors.',
    specs: {
      origin: 'AMAC Farm Estates',
      shelfLife: '6 - 9 Months',
      temperature: '-1°C to 0°C',
      certifications: ['GlobalG.A.P.', 'ISO 22000'],
    },
  },
];
