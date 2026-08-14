export type PoliType = 'all' | 'genshin' | 'hsr' | 'kamen-rider' | 'aov' | 'spy-family';

export type MerchCategory = 'all' | 'print' | 'photocard' | 'pasphoto' | 'sticker' | 'keychain' | 'card';

export interface ProductVariant {
  id: string;
  name: string;
  image?: string;
  isLimited?: boolean;
}

export interface Product {
  id: string;
  name: string;
  poli: PoliType;
  category: 'print' | 'photocard' | 'pasphoto' | 'sticker' | 'keychain' | 'card';
  price: number;
  originalPrice?: number;
  image: string;
  catalogPageImage?: string;
  description: string;
  size?: string;
  isLimited?: boolean;
  isGacha?: boolean;
  badge?: string;
  dosage?: string;
  barcode?: string;
  shelfTag?: 'Top 1' | 'Hot!' | 'New!' | 'Best!' | 'Special' | 'PO 1' | 'Limited!';
  shelfSub?: string;
  shelfCode?: string;
  visualType?: 'shaker' | 'box' | 'pouch' | 'print' | 'card';
  variants?: ProductVariant[];
}

export const POLI_LIST: { id: PoliType; name: string; icon: string; subtitle: string }[] = [
  { id: 'all', name: 'Semua Poli', icon: '🏥', subtitle: 'Seluruh Resep Klinik' },
  { id: 'genshin', name: 'Poli Genshin Impact', icon: '✨', subtitle: 'Teyvat Emergency Room' },
  { id: 'hsr', name: 'Poli Honkai Star Rail', icon: '🚂', subtitle: 'Astral Express Station' },
  { id: 'kamen-rider', name: 'Poli Kamen Rider', icon: '🦗', subtitle: 'Decade & Rider Care' },
  { id: 'aov', name: 'Poli Arena of Valor', icon: '⚔️', subtitle: 'Antaris Ranked Recovery' },
  { id: 'spy-family', name: 'Poli Spy x Family', icon: '🥜', subtitle: 'Ostania Secret Therapy' },
];

export const CATEGORY_LIST: { id: MerchCategory; name: string; icon: string }[] = [
  { id: 'all', name: 'Semua Tipe', icon: '📦' },
  { id: 'print', name: 'Art Print', icon: '🖼️' },
  { id: 'photocard', name: 'Photocard', icon: '🃏' },
  { id: 'pasphoto', name: 'Pas Foto 3x4', icon: '📷' },
  { id: 'sticker', name: 'Sticker', icon: '🏷️' },
  { id: 'keychain', name: 'Keychain', icon: '🔑' },
  { id: 'card', name: 'Card Koleksi', icon: '🎴' },
];

export const PRODUCTS: Product[] = [
  // ==========================================
  // POLI ARENA OF VALOR (Page 2)
  // ==========================================
  {
    id: 'hlk-aov-stk-01',
    name: 'Sticker Chibi 7x7cm Poli Arena of Valor',
    poli: 'aov',
    category: 'sticker',
    price: 4000,
    size: '7 x 7 cm',
    image: '/images/catalog/items/aov-sticker-group.png',
    catalogPageImage: '/images/catalog/pages/page-2.png',
    description: 'Stiker die-cut vinyl chibi lucu karakter Arena of Valor. Tahan air & anti gores.',
    badge: 'NEW SEASON',
    shelfTag: 'New!',
    shelfSub: 'AoV Chibi Pack',
    shelfCode: 'HLK-AOV-ST01',
    barcode: '4 901234 560002',
    visualType: 'pouch',
    dosage: 'Tempel 1 stiker di hp/casing untuk buff winrate ranked bintang 5.',
    variants: [
      { id: 'violet', name: 'Violet' },
      { id: 'liliana', name: 'Liliana' },
      { id: 'lauriel', name: 'Lauriel' },
      { id: 'alice', name: 'Alice' },
      { id: 'butterfly', name: 'Butterfly' },
      { id: 'tulen', name: 'Tulen' },
      { id: 'sinestrea', name: 'Sinestrea' },
      { id: 'tel-annas', name: 'Tel\'Annas' },
      { id: 'dextra', name: 'Dextra' },
      { id: 'bright', name: 'Bright' },
      { id: 'allain', name: 'Allain' },
      { id: 'thorne', name: 'Thorne' },
      { id: 'laville', name: 'Laville' },
      { id: 'hayate', name: 'Hayate' },
      { id: 'lubu', name: 'Lubu' },
      { id: 'murad', name: 'Murad' }
    ]
  },

  // ==========================================
  // POLI GENSHIN IMPACT (Page 3 - Art Print A5 & Custom)
  // ==========================================
  {
    id: 'hlk-gi-pr-a5-01',
    name: 'Art Print A5 Poli Genshin Impact',
    poli: 'genshin',
    category: 'print',
    price: 12000,
    size: 'A5 (14.8 x 21 cm)',
    image: '/images/catalog/items/genshin-print-a5.png',
    catalogPageImage: '/images/catalog/pages/page-3.png',
    description: 'Art print premium kertas Linen 260gsm tebal warna tajam. Ilustrasi artwork memukau karakter Genshin.',
    badge: 'BEST SELLER',
    shelfTag: 'Best!',
    shelfSub: 'Genshin A5 Print',
    shelfCode: 'HLK-GI-PR01',
    barcode: '4 901234 560003',
    visualType: 'print',
    dosage: 'Pajang di dinding kamar untuk meredakan halusinasi gacha ampas.',
    variants: [
      { id: 'lyney', name: 'Lyney (Magician Red Feather)' },
      { id: 'scaramouche-casual', name: 'Scaramouche (Casual Modern)' },
      { id: 'childe-beach', name: 'Tartaglia / Childe (Summer Vacation)' },
      { id: 'xiao-rock', name: 'Xiao (Rockstar Mic Vocalist)' },
      { id: 'baizhu-pantalone', name: 'Pantalone & Baizhu (Suit Ver.)' },
      { id: 'lumine-scara-carry', name: 'Lumine & Scaramouche ("Suka Lu" Bridal Carry)' },
      { id: 'cyno-casual', name: 'Cyno (Casual Desert)' },
      { id: 'cyno-anubis', name: 'Cyno (Anubis Hooded Ver.)' },
      { id: 'baizhu-glasses', name: 'Baizhu (Doctor Coat Glasses)' }
    ]
  },
  {
    id: 'hlk-gi-pr-custom-02',
    name: 'Art Print Custom Size (Limited Edition)',
    poli: 'genshin',
    category: 'print',
    price: 12000,
    size: 'Custom Size (Linen 260gsm)',
    image: '/images/catalog/items/genshin-print-custom.png',
    catalogPageImage: '/images/catalog/pages/page-3.png',
    description: 'Art print ukuran khusus dengan format panorama/portrait unik. Stok sangat terbatas!',
    isLimited: true,
    badge: 'LIMITED STOCK',
    shelfTag: 'Limited!',
    shelfSub: 'Special Size Print',
    shelfCode: 'HLK-GI-PR02',
    barcode: '4 901234 560004',
    visualType: 'print',
    dosage: 'Simpan dengan hati-hati. Dosis visual penyembuh stres berlebih.',
    variants: [
      { id: 'kokomi-custom', name: 'Sangonomiya Kokomi (20.5 x 9.5 cm)', isLimited: true },
      { id: 'venti-custom', name: 'Venti Pastel (18 x 14.5 cm)', isLimited: true }
    ]
  },

  // ==========================================
  // POLI HONKAI STAR RAIL (Page 4 - Art Print A5 Husbu)
  // ==========================================
  {
    id: 'hlk-hsr-pr-a5-01',
    name: 'Art Print A5 Poli Honkai Star Rail (Husbu Series)',
    poli: 'hsr',
    category: 'print',
    price: 12000,
    size: 'A5 (14.8 x 21 cm)',
    image: '/images/catalog/items/hsr-print-a5.png',
    catalogPageImage: '/images/catalog/pages/page-4.png',
    description: 'Art print premium Linen 260gsm duo husbu Blade & Jing Yuan dalam edisi formal dan santai.',
    badge: 'HOT ITEM',
    shelfTag: 'Hot!',
    shelfSub: 'HSR A5 Print',
    shelfCode: 'HLK-HSR-PR01',
    barcode: '4 901234 560005',
    visualType: 'print',
    dosage: 'Pandangi sebelum tidur untuk memicu mimpi astral express yang indah.',
    variants: [
      { id: 'blade-suit', name: 'Blade (Formal Office Suit)' },
      { id: 'blade-boxer', name: 'Blade (Shirtless Boxer Ver.)' },
      { id: 'jingyuan-suit', name: 'Jing Yuan (Formal Office Suit)' },
      { id: 'jingyuan-boxer', name: 'Jing Yuan (Shirtless Boxer Ver.)' }
    ]
  },

  // ==========================================
  // POLI GENSHIN IMPACT (Page 5 - Husbu Back-View Series)
  // ==========================================
  {
    id: 'hlk-gi-pr-back-01',
    name: 'Art Print A5 Husbu Back-View Series',
    poli: 'genshin',
    category: 'print',
    price: 12000,
    size: 'A5 (14.8 x 21 cm)',
    image: '/images/catalog/items/genshin-print-back.png',
    catalogPageImage: '/images/catalog/pages/page-5.png',
    description: 'Ilustrasi sudut pandang punggung estetik Diluc, Tighnari, & Scaramouche. Kertas linen mewah.',
    badge: 'TOP 1',
    shelfTag: 'Top 1',
    shelfSub: 'Back-View Print',
    shelfCode: 'HLK-GI-PR03',
    barcode: '4 901234 560006',
    visualType: 'print',
    dosage: 'Obat penenang histeria fangirl/fanboy dosis tinggi.',
    variants: [
      { id: 'diluc-back', name: 'Diluc Ragnvindr (Backless View)' },
      { id: 'tighnari-back', name: 'Tighnari (Back View & Fluffy Tail)' },
      { id: 'scaramouche-back', name: 'Scaramouche (Back Pose)' }
    ]
  },

  // ==========================================
  // POLI GENSHIN IMPACT (Page 6 - Waifu Series A5 10K)
  // ==========================================
  {
    id: 'hlk-gi-pr-waifu-01',
    name: 'Art Print A5 Waifu Series (10K)',
    poli: 'genshin',
    category: 'print',
    price: 10000,
    size: 'A5 (14.8 x 21 cm)',
    image: '/images/catalog/items/genshin-print-waifu.png',
    catalogPageImage: '/images/catalog/pages/page-6.png',
    description: 'Art print edisi santai waifu Genshin Impact (Raiden, Yae Miko, Lumine, Yelan). Bahan art paper 260gsm doff.',
    shelfTag: 'Best!',
    shelfSub: 'Waifu Series Print',
    shelfCode: 'HLK-GI-PR04',
    barcode: '4 901234 560007',
    visualType: 'print',
    dosage: 'Terapi relaksasi visual 3x sehari setelah makan.',
    variants: [
      { id: 'raiden-apron', name: 'Raiden Shogun (Baking Apron Ver.)' },
      { id: 'yae-raiden-noodles', name: 'Yae Miko & Raiden (Eating Noodles)' },
      { id: 'lumine-casual', name: 'Lumine (Casual Braided Hair)' },
      { id: 'yelan-bed', name: 'Yelan (Casual Bedroom View)' }
    ]
  },

  // ==========================================
  // POLI GENSHIN IMPACT (Page 7 - Photocard 5.5x9cm 10K)
  // ==========================================
  {
    id: 'hlk-gi-pc-reg-01',
    name: 'Photocard 5.5x9cm Poli Genshin Impact',
    poli: 'genshin',
    category: 'photocard',
    price: 10000,
    size: '5.5 x 9 cm (Glossy 2-Side)',
    image: '/images/catalog/items/genshin-photocard-group.png',
    catalogPageImage: '/images/catalog/pages/page-7.png',
    description: 'Photocard tebal 2 sisi laminasi glossy sudut rounded. Tersedia 20 varian karakter favorit.',
    badge: 'POPULAR',
    shelfTag: 'Hot!',
    shelfSub: 'Photocard Pack',
    shelfCode: 'HLK-GI-PC01',
    barcode: '4 901234 560008',
    visualType: 'box',
    dosage: 'Simpan di balik case hp transparan sebagai jimat pelindung hati.',
    variants: [
      { id: 'scara-casual-pc', name: 'Scaramouche (Casual Sweater)' },
      { id: 'lyney-pc', name: 'Lyney (Magician)' },
      { id: 'childe-beach-pc', name: 'Tartaglia / Childe (Beach Sun)' },
      { id: 'kaeya-pc', name: 'Kaeya Alberich' },
      { id: 'zhongli-pc', name: 'Zhongli (Geo Archon)' },
      { id: 'nahida-pc', name: 'Nahida (Cute Flower)' },
      { id: 'venti-cat-pc', name: 'Venti (Cat Hoodie Green)' },
      { id: 'venti-casual-pc', name: 'Venti (Casual Modern)' },
      { id: 'scara-cat-pc', name: 'Scaramouche (Cat Paws Cap)' },
      { id: 'raiden-pc', name: 'Raiden Shogun (Purple Elegance)' },
      { id: 'childe-suit-pc', name: 'Tartaglia (Formal Black Suit)' },
      { id: 'alhaitham-suit-pc', name: 'Alhaitham (Formal Black Suit)' },
      { id: 'kaveh-suit-pc', name: 'Kaveh (Formal White Suit)' },
      { id: 'cyno-suit-pc', name: 'Cyno (Formal Black Suit)' },
      { id: 'baizhu-suit-pc', name: 'Baizhu (Formal Black Suit)' },
      { id: 'scara-formal-pc', name: 'Scaramouche (Formal Suit)' },
      { id: 'lumine-aether-pc', name: 'Lumine & Aether (Twin Travelers)' },
      { id: 'diluc-formal-pc', name: 'Diluc (Formal Red Hair)' },
      { id: 'kaveh-glasses-pc', name: 'Kaveh (Casual Glasses)' },
      { id: 'baizhu-glasses-pc', name: 'Baizhu (Casual Glasses)' }
    ]
  },

  // ==========================================
  // POLI GENSHIN IMPACT (Page 8 - Photocard Gacha Only 10K/Pull)
  // ==========================================
  {
    id: 'hlk-gi-pc-gacha-01',
    name: 'Photocard Gacha Blind Pack (Random Pull)',
    poli: 'genshin',
    category: 'photocard',
    price: 10000,
    size: '5.5 x 9 cm (Sealed Blind Pack)',
    image: '/images/catalog/items/genshin-photocard-gacha.png',
    catalogPageImage: '/images/catalog/pages/page-8.png',
    description: '!!GACHA ONLY!! Kemasan blind pack acak berisi 1 dari 6 karakter edisi pita plester cinta (Tape-Mouth Series). Uji hoki gacha-mu!',
    badge: 'GACHA ONLY',
    shelfTag: 'Special',
    shelfSub: 'Gacha Pull Blind Pack',
    shelfCode: 'HLK-GI-PC02',
    barcode: '4 901234 560009',
    visualType: 'box',
    isGacha: true,
    dosage: 'Tarik 1 pack saat butuh kejutan asmara tak terduga.',
    variants: [
      { id: 'gacha-blind-pack', name: 'Blind Pack Acak (1x Pull Random)' },
      { id: 'pool-scara', name: '[Pool Info] Scaramouche ("I <3 U")' },
      { id: 'pool-venti', name: '[Pool Info] Venti ("I LOVE U")' },
      { id: 'pool-aether', name: '[Pool Info] Aether ("I NEED U")' },
      { id: 'pool-heizou', name: '[Pool Info] Heizou ("I WANT U")' },
      { id: 'pool-xiao', name: '[Pool Info] Xiao ("I LOVE U")' },
      { id: 'pool-kazuha', name: '[Pool Info] Kazuha ("I MISS U")' }
    ]
  },

  // ==========================================
  // POLI GENSHIN IMPACT (Page 9 - Sticker 7x7cm Chibi 4K)
  // ==========================================
  {
    id: 'hlk-gi-stk-7x7-01',
    name: 'Sticker Chibi 7x7cm Poli Genshin Impact',
    poli: 'genshin',
    category: 'sticker',
    price: 4000,
    size: '7 x 7 cm',
    image: '/images/catalog/items/genshin-sticker-7x7.png',
    catalogPageImage: '/images/catalog/pages/page-9.png',
    description: 'Stiker vinyl laminasi doff tahan air isi ekspresi chibi menggemaskan karakter Genshin.',
    badge: 'TOP 1',
    shelfTag: 'Top 1',
    shelfSub: 'Chibi 7cm Sticker',
    shelfCode: 'HLK-GI-ST01',
    barcode: '4 901234 560010',
    visualType: 'pouch',
    dosage: 'Tempelkan di permukaan datar untuk memancarkan aura imut seketika.',
    variants: [
      { id: 'lumine-chibi', name: 'Lumine (Mora Bag)' },
      { id: 'scara-chibi-angry', name: 'Scaramouche (Angry Chibi)' },
      { id: 'kazuha-chibi', name: 'Kazuha' },
      { id: 'heizou-chibi', name: 'Heizou' },
      { id: 'furina-chibi', name: 'Furina' },
      { id: 'raiden-chibi', name: 'Raiden Shogun (Dango)' },
      { id: 'nahida-chibi', name: 'Nahida (Swing)' },
      { id: 'barbara-chibi', name: 'Barbara (Limited Stock!)', isLimited: true },
      { id: 'nilou-chibi', name: 'Nilou (Dance)' },
      { id: 'sucrose-chibi', name: 'Sucrose' },
      { id: 'tighnari-chibi-panic', name: 'Tighnari (Panik Chibi)' },
      { id: 'xiao-chibi', name: 'Xiao (Almond Tofu)' },
      { id: 'aether-chibi', name: 'Aether (Mora Bag)' },
      { id: 'venti-chibi', name: 'Venti (Lyre)' },
      { id: 'ayato-chibi', name: 'Kamisato Ayato (Boba Drink)' },
      { id: 'yae-chibi', name: 'Yae Miko (Fox Fried Tofu)' }
    ]
  },

  // ==========================================
  // POLI GENSHIN IMPACT (Page 10 - Sticker 5x7cm & A5 Kisscut)
  // ==========================================
  {
    id: 'hlk-gi-stk-5x7-02',
    name: 'Sticker 5x7cm Sumeru Duo Series',
    poli: 'genshin',
    category: 'sticker',
    price: 2500,
    size: '5 x 7 cm',
    image: '/images/catalog/items/genshin-sticker-5x7.png',
    catalogPageImage: '/images/catalog/pages/page-10.png',
    description: 'Stiker hemat duo Sumeru Cyno & Tighnari dalam pakaian orisinil dan kasual santai.',
    shelfTag: 'Best!',
    shelfSub: 'Sumeru 5x7 Sticker',
    shelfCode: 'HLK-GI-ST02',
    barcode: '4 901234 560011',
    visualType: 'pouch',
    dosage: 'Obat anti-gundah gulana saat revisi skripsi atau deadline kantor.',
    variants: [
      { id: 'cyno-anubis-stk', name: 'Cyno (Anubis Headpiece)' },
      { id: 'tighnari-forest-stk', name: 'Tighnari (Forest Watcher)' },
      { id: 'tighnari-green-stk', name: 'Tighnari (Casual Green Shirt)' },
      { id: 'cyno-red-stk', name: 'Cyno (Casual Red Shirt)' }
    ]
  },
  {
    id: 'hlk-gi-stk-kisscut-03',
    name: 'Sticker Sheet A5 Kisscut (Barbie & Ken Sumeru Theme)',
    poli: 'genshin',
    category: 'sticker',
    price: 15000,
    size: 'A5 Kisscut Sheet',
    image: '/images/catalog/items/genshin-sticker-kisscut.png',
    catalogPageImage: '/images/catalog/pages/page-10.png',
    description: 'Lembar stiker kisscut A5 siap kelupas tema Barbiecore & Kencore Summer Sumeru lengkap dengan aksesoris.',
    badge: 'MUST HAVE',
    shelfTag: 'Hot!',
    shelfSub: 'A5 Kisscut Sheet',
    shelfCode: 'HLK-GI-ST03',
    barcode: '4 901234 560012',
    visualType: 'pouch',
    dosage: 'Kupas dan tempelkan set aksesoris Barbie & Ken Sumeru untuk mendongkrak dopamine.',
    variants: [
      { id: 'kaveh-barbie-sheet', name: 'Kaveh (Pink Barbie Theme Sheet)' },
      { id: 'cyno-barbie-sheet', name: 'Cyno (Pink Barbie Theme Sheet)' },
      { id: 'alhaitham-ken-sheet', name: 'Alhaitham (Ken Beach Summer Sheet)' },
      { id: 'tighnari-ken-sheet', name: 'Tighnari (Ken Cowboy Theme Sheet)' }
    ]
  },

  // ==========================================
  // POLI HONKAI STAR RAIL (Page 11 - Sticker 5x5cm 4K)
  // ==========================================
  {
    id: 'hlk-hsr-stk-5x5-01',
    name: 'Sticker Chibi 5x5cm Poli Honkai Star Rail',
    poli: 'hsr',
    category: 'sticker',
    price: 4000,
    size: '5 x 5 cm',
    image: '/images/catalog/items/hsr-sticker-5x5.png',
    catalogPageImage: '/images/catalog/pages/page-11.png',
    description: 'Stiker die-cut vinyl March 7th kedip dan Stelle di dalam tempat sampah kesayangan.',
    shelfTag: 'New!',
    shelfSub: 'HSR 5x5 Sticker',
    shelfCode: 'HLK-HSR-ST01',
    barcode: '4 901234 560013',
    visualType: 'pouch',
    dosage: 'Tempel di tempat kerja untuk meningkatkan semangat trailblazing tanpa batas.',
    variants: [
      { id: 'march7-chibi', name: 'March 7th (Winking Chibi)' },
      { id: 'stelle-trashcan', name: 'Stelle / Trailblazer (Trash Can Lover)' }
    ]
  },

  // ==========================================
  // POLI GENSHIN IMPACT (Page 12 - Sticker 5x5cm Chibi 4K)
  // ==========================================
  {
    id: 'hlk-gi-stk-5x5-04',
    name: 'Sticker Chibi 5x5cm Genshin Impact',
    poli: 'genshin',
    category: 'sticker',
    price: 4000,
    size: '5 x 5 cm',
    image: '/images/catalog/items/genshin-sticker-5x5.png',
    catalogPageImage: '/images/catalog/pages/page-12.png',
    description: 'Stiker chibi mini 5x5cm Kaveh, Alhaitham, Kirara Box, Klee, dan Yelan.',
    shelfTag: 'Hot!',
    shelfSub: 'Genshin 5x5 Sticker',
    shelfCode: 'HLK-GI-ST04',
    barcode: '4 901234 560014',
    visualType: 'pouch',
    dosage: 'Tempel di jurnal atau laptop sebagai booster kebahagiaan harian.',
    variants: [
      { id: 'kaveh-key-5x5', name: 'Kaveh (with Mehrak Key)' },
      { id: 'alhaitham-book-5x5', name: 'Alhaitham (Reading Book)' },
      { id: 'kirara-box-5x5', name: 'Kirara (Delivery Box Neko)' },
      { id: 'klee-hat-5x5', name: 'Klee (Red Hat Bomber)' },
      { id: 'yelan-smug-5x5', name: 'Yelan (Smug Chibi)' }
    ]
  },

  // ==========================================
  // POLI GENSHIN IMPACT (Page 13 - Pas Foto 3x4cm 2K & Keychain 6x5cm 25K)
  // ==========================================
  {
    id: 'hlk-gi-pasphoto-01',
    name: 'Pas Foto Formal 3x4cm Poli Genshin Impact',
    poli: 'genshin',
    category: 'pasphoto',
    price: 2000,
    size: '3 x 4 cm (Background Biru Formal)',
    image: '/images/catalog/items/genshin-pas-photo.png',
    catalogPageImage: '/images/catalog/pages/page-13.png',
    description: 'Pas foto resmi background biru formal siap pakai untuk KTP Wibu atau buku nikah halu. Tersedia 27 karakter!',
    badge: 'BEST VALUE (2K)',
    shelfTag: 'Top 1',
    shelfSub: '3x4 Passport Photo',
    shelfCode: 'HLK-GI-PP01',
    barcode: '4 901234 560015',
    visualType: 'card',
    dosage: 'Pasang di dompet atau kartu identitas wibu Anda untuk keperluan darurat.',
    variants: [
      { id: 'ayaka-pp', name: 'Kamisato Ayaka' },
      { id: 'raiden-pp', name: 'Raiden Shogun' },
      { id: 'eula-pp', name: 'Eula Lawrence' },
      { id: 'ganyu-pp', name: 'Ganyu' },
      { id: 'keqing-pp', name: 'Keqing' },
      { id: 'yae-pp', name: 'Yae Miko' },
      { id: 'nilou-pp', name: 'Nilou' },
      { id: 'lumine-pp', name: 'Lumine' },
      { id: 'kokomi-pp', name: 'Sangonomiya Kokomi' },
      { id: 'yelan-pp', name: 'Yelan' },
      { id: 'albedo-pp', name: 'Albedo' },
      { id: 'alhaitham-pp', name: 'Alhaitham' },
      { id: 'kaveh-pp', name: 'Kaveh' },
      { id: 'ayato-pp', name: 'Kamisato Ayato' },
      { id: 'chongyun-pp', name: 'Chongyun' },
      { id: 'diluc-pp', name: 'Diluc Ragnvindr' },
      { id: 'heizou-pp', name: 'Shikanoin Heizou' },
      { id: 'itto-pp', name: 'Arataki Itto' },
      { id: 'kaeya-pp', name: 'Kaeya Alberich' },
      { id: 'zhongli-pp', name: 'Zhongli' },
      { id: 'xiao-pp', name: 'Xiao' },
      { id: 'scaramouche-pp', name: 'Scaramouche / Wanderer' },
      { id: 'venti-pp', name: 'Venti' },
      { id: 'tighnari-pp', name: 'Tighnari' },
      { id: 'thoma-pp', name: 'Thoma' },
      { id: 'childe-pp', name: 'Tartaglia / Childe' },
      { id: 'kazuha-pp', name: 'Kaedehara Kazuha' }
    ]
  },
  {
    id: 'hlk-gi-keychain-01',
    name: 'Acrylic Keychain 6x5cm Poli Genshin Impact',
    poli: 'genshin',
    category: 'keychain',
    price: 25000,
    size: '6 x 5 cm',
    image: '/images/catalog/items/genshin-keychain-6x5.png',
    catalogPageImage: '/images/catalog/pages/page-13.png',
    description: 'Gantungan kunci akrilik tebal 2 sisi bening dengan gantungan clasp silver kokoh.',
    badge: 'PREMIUM ACRYLIC',
    shelfTag: 'Best!',
    shelfSub: 'Acrylic Keychain 6cm',
    shelfCode: 'HLK-GI-KC01',
    barcode: '4 901234 560016',
    visualType: 'shaker',
    dosage: 'Gantungkan pada tas ransel atau kunci motor agar tidak tersesat di jalan hidup.',
    variants: [
      { id: 'alhaitham-kc', name: 'Alhaitham (Chibi Book)' },
      { id: 'klee-kc', name: 'Klee (Chibi Bomber)' },
      { id: 'kirara-kc', name: 'Kirara (Delivery Box Neko)' }
    ]
  },

  // ==========================================
  // POLI KAMEN RIDER (Page 14 - Decade Cards 8.4x5.8cm 5K)
  // ==========================================
  {
    id: 'hlk-kr-decade-cards-01',
    name: 'Decade Kamen Ride Card (Waifu Gijinka Ver.)',
    poli: 'kamen-rider',
    category: 'card',
    price: 5000,
    size: '8.4 x 5.8 cm (Art Carton 310gsm)',
    image: '/images/catalog/items/kamen-decade-cards.png',
    catalogPageImage: '/images/catalog/pages/page-14.png',
    description: 'Kartu Kamen Ride Decade versi gijinka waifu heisei riders! Kertas tebal glossy barcode otentik.',
    isLimited: true,
    badge: 'LIMITED STOCK',
    shelfTag: 'Limited!',
    shelfSub: 'Kamen Ride Card',
    shelfCode: 'HLK-KR-CD01',
    barcode: '4 901234 560017',
    visualType: 'card',
    dosage: 'Masukan ke dalam Decadriver khayalan untuk henshin dan melibas rasa galau.',
    variants: [
      { id: 'kr-kuuga-card', name: 'Kamen Rider Kuuga (Limited)', isLimited: true },
      { id: 'kr-agito-card', name: 'Kamen Rider Agito (Limited)', isLimited: true },
      { id: 'kr-ryuki-card', name: 'Kamen Rider Ryuki (Limited)', isLimited: true },
      { id: 'kr-faiz-card', name: 'Kamen Rider Faiz (Limited)', isLimited: true },
      { id: 'kr-blade-card', name: 'Kamen Rider Blade (Limited)', isLimited: true },
      { id: 'kr-hibiki-card', name: 'Kamen Rider Hibiki (Limited)', isLimited: true },
      { id: 'kr-kabuto-card', name: 'Kamen Rider Kabuto (Limited)', isLimited: true },
      { id: 'kr-deno-card', name: 'Kamen Rider Den-O (Limited)', isLimited: true },
      { id: 'kr-kiva-card', name: 'Kamen Rider Kiva (Limited)', isLimited: true },
      { id: 'kr-decade-card', name: 'Kamen Rider Decade (Limited)', isLimited: true }
    ]
  },

  // ==========================================
  // POLI KAMEN RIDER (Page 15 - Photocard 5.5x9cm 5K)
  // ==========================================
  {
    id: 'hlk-kr-photocard-01',
    name: 'Photocard 5.5x9cm Poli Kamen Rider (Gijinka Ver.)',
    poli: 'kamen-rider',
    category: 'photocard',
    price: 5000,
    size: '5.5 x 9 cm',
    image: '/images/catalog/items/kamen-photocards.png',
    catalogPageImage: '/images/catalog/pages/page-15.png',
    description: 'Photocard pose dinamis gijinka waifu 10 Heisei Kamen Riders. Laminasi doff halus.',
    shelfTag: 'New!',
    shelfSub: 'Kamen Rider Photocard',
    shelfCode: 'HLK-KR-PC01',
    barcode: '4 901234 560018',
    visualType: 'box',
    dosage: 'Koleksi 10 Rider waifu gijinka untuk menjaga ketentraman jiwa.',
    variants: [
      { id: 'kr-pc-kuuga', name: 'Kuuga Gijinka' },
      { id: 'kr-pc-hibiki', name: 'Hibiki Gijinka' },
      { id: 'kr-pc-ryuki', name: 'Ryuki Gijinka' },
      { id: 'kr-pc-agito', name: 'Agito Gijinka' },
      { id: 'kr-pc-blade', name: 'Blade Gijinka' },
      { id: 'kr-pc-kiva', name: 'Kiva Gijinka' },
      { id: 'kr-pc-kabuto', name: 'Kabuto Gijinka' },
      { id: 'kr-pc-decade', name: 'Decade Gijinka' },
      { id: 'kr-pc-deno', name: 'Den-O Gijinka' },
      { id: 'kr-pc-faiz', name: 'Faiz Gijinka' }
    ]
  },

  // ==========================================
  // POLI SPY X FAMILY (Page 16 - Art Print A5 10K)
  // ==========================================
  {
    id: 'hlk-spy-print-yor-01',
    name: 'Art Print A5 Yor Forger (Office Worker PNS Ver.)',
    poli: 'spy-family',
    category: 'print',
    price: 10000,
    size: 'A5 (14.8 x 21 cm)',
    image: '/images/catalog/items/spy-print-yor.png',
    catalogPageImage: '/images/catalog/pages/page-16.png',
    description: 'Art print elegan Yor Forger dalam seragam pegawai kantor balai kota Berlint (PNS style). Kertas linen tebal.',
    badge: 'EXCLUSIVE',
    shelfTag: 'Special',
    shelfSub: 'Spy x Family Print',
    shelfCode: 'HLK-SPY-PR01',
    barcode: '4 901234 560019',
    visualType: 'print',
    dosage: 'Pajang di atas meja kerja kantor agar tetap fokus dan terlindungi dari kejaran deadline.',
    variants: [
      { id: 'yor-office-print', name: 'Yor Forger (Office Worker PNS Ver.)' }
    ]
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
  eventBadge: 'PO COMIFURO OPEN',
  boothSchedule: 'Jumat - Minggu (Jadwal Praktek)',
  email: 'halulagikh@gmail.com',
  location: 'ICE BSD City',
  schedule: 'Season 2024 / Comifuro PO',
  messageThankYou: 'Semoga merchandise kami dapat mengobati kesedihan ningentachi akan dunia nyata! Semoga cepat sembuh ya!'
};
