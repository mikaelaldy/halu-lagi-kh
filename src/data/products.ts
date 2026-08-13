export interface Product {
  id: string;
  name: string;
  category: 'standee' | 'keychain' | 'sticker' | 'print' | 'clearance';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  isClearance?: boolean;
  clearanceTag?: string;
  badge?: string;
  dosage?: string; // Funny medical/wibu dosage instruction
}

export const PRODUCTS: Product[] = [
  {
    id: 'hlk-01',
    name: 'Dr. LULU & Haha Acrylic Standee (Special Clinic Ver.)',
    category: 'standee',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    description: 'Acrylic standee 15cm dengan mascot Dr. LULU & Haha bertema dokter klinik. High quality print 2-side.',
    badge: 'BEST SELLER',
    dosage: 'Pajang di meja belajar/kerja 1x sehari untuk meredakan beban hidup.'
  },
  {
    id: 'hlk-02',
    name: 'Halu Prescription Keychain Shake-shake (Acrylic)',
    category: 'keychain',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    description: 'Gantungan kunci akrilik isi 5 pill shaker lucu yang bisa dikocok-kocok.',
    badge: 'NEW',
    dosage: 'Kocok saat kehaluan melanda di tempat umum.'
  },
  {
    id: 'hlk-03',
    name: 'Klinik Wibu Sticker Pack (Die-cut Waterproof 10 Pcs)',
    category: 'sticker',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=600&auto=format&fit=crop&q=80',
    description: 'Stiker vinyl laminasi doff tahan air & cuaca. Isi 10 desain mascot & quotes halu.',
    dosage: 'Tempelkan pada laptop atau tumbler kesayangan.'
  },
  {
    id: 'hlk-04',
    name: 'A3 Art Print "Dr. LULU & Ningentachi Hospital"',
    category: 'print',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    description: 'Cetakan kertas Linen 250gsm warna tajam & tidak pudar. Ilustrasi lengkap klinik wibu.',
    badge: 'LIMITED',
    dosage: 'Tatapi sebelum tidur agar bermimpi bertemu husbu/waifu.'
  },
  {
    id: 'hlk-05',
    name: 'Photocard Pack "Resep Halu Dosis Tinggi" (Set of 5)',
    category: 'print',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    description: 'Photocard glossy 2-sisi ukuran standard dengan background klinik & holografik.',
    dosage: 'Simpan dalam dompet sebagai jimat obat kehaluan.'
  },
  // CLEARANCE SALE ITEMS (10k - 85k)
  {
    id: 'clr-01',
    name: 'CLEARANCE: Mini Mascot Pin Badge 44mm (Old Season)',
    category: 'clearance',
    price: 10000,
    originalPrice: 25000,
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=600&auto=format&fit=crop&q=80',
    description: 'Pin kaleng 44mm season lalu. Stok terbatas untuk dikosongkan!',
    isClearance: true,
    clearanceTag: '60% OFF',
    dosage: 'Pasang pada tas wibu untuk menandakan kepasrahan.'
  },
  {
    id: 'clr-02',
    name: 'CLEARANCE: Mascot Washi Tape "Prescription Ribbon"',
    category: 'clearance',
    price: 15000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
    description: 'Solatip dekoratif washi tape 15mm x 10m dengan pola resep obat wibu.',
    isClearance: true,
    clearanceTag: '57% OFF',
    dosage: 'Bungkus barang kesayanganmu dengan cinta.'
  },
  {
    id: 'clr-03',
    name: 'CLEARANCE: Chibi Acrylic Charm - Dr. LULU Basic',
    category: 'clearance',
    price: 25000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    description: 'Gantungan akrilik 5cm 1-sisi stok terbatas event sebelumnya.',
    isClearance: true,
    clearanceTag: '50% OFF',
    dosage: 'Gantungkan di kunci motor agar tidak tersesat di alam halu.'
  },
  {
    id: 'clr-04',
    name: 'CLEARANCE: Totebag "Klinik Halu" Canvas Heavyweight',
    category: 'clearance',
    price: 65000,
    originalPrice: 120000,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    description: 'Tas kanvas tebal dengan kantong dalam. Muat laptop & belanjaan merch!',
    isClearance: true,
    clearanceTag: '45% OFF',
    dosage: 'Gunakan untuk menampung seluruh beban kehaluan di Comifuro.'
  }
];

export const CLINIC_INFO = {
  name: 'HALU LAGI KH?',
  tagline: 'Klinik Wibu Kepercayaan Ningentachi!',
  doctors: 'Dr. LULU & Haha',
  hashtag: '#obatHaluLagiKh',
  instagramHandle: '@halulagi_kh',
  instagramUrl: 'https://www.instagram.com/halulagi_kh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  event: 'Comifuro (Comic Frontier)',
  email: 'halulagikh@gmail.com',
  location: 'ICE BSD',
  schedule: '31 October - 1 November',
  messageThankYou: 'Semoga merchandise kami dapat mengobati kesedihan ningentachi akan dunia nyata! Semoga cepat sembuh ya!'
};
