export type PoliType =
  | 'all'
  | 'genshin'
  | 'hsr'
  | 'zzz'
  | 'wuwa'
  | 'kamen-rider'
  | 'aov'
  | 'vtuber'
  | 'anime'
  | 'original';

export type MerchCategory =
  | 'all'
  | 'clearance'
  | 'print'
  | 'photocard'
  | 'pasphoto'
  | 'sticker'
  | 'keychain'
  | 'card'
  | 'pin'
  | 'ticket'
  | 'pick'
  | 'polaroid';

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
  category: MerchCategory;
  price: number;
  originalPrice?: number;
  image: string;
  artist?: string;
  isClearance?: boolean;
  catalogPageImage?: string;
  description: string;
  size?: string;
  isLimited?: boolean;
  isGacha?: boolean;
  badge?: string;
  dosage?: string;
  barcode?: string;
  shelfTag?: 'Top 1' | 'Hot!' | 'New!' | 'Best!' | 'Special' | 'PO 1' | 'Limited!' | 'Clearance';
  shelfSub?: string;
  shelfCode?: string;
  visualType?: MerchCategory;
  variants?: ProductVariant[];
}

export const POLI_LIST: { id: PoliType; name: string; icon: string; subtitle: string }[] = [
  { id: 'all', name: 'Semua Poli', icon: '🏥', subtitle: 'Seluruh Resep Klinik' },
  { id: 'genshin', name: 'Poli Genshin Impact', icon: '✨', subtitle: 'Teyvat Emergency Room' },
  { id: 'hsr', name: 'Poli Honkai Star Rail', icon: '🚂', subtitle: 'Astral Express Station' },
  { id: 'vtuber', name: 'Poli VTuber & Holo', icon: '🌟', subtitle: 'Suisei & Virtual Clinic' },
  { id: 'anime', name: 'Poli Anime & Fandom', icon: '🍿', subtitle: 'JJK, Bocchi, Uma Musume' },
  { id: 'kamen-rider', name: 'Poli Kamen Rider', icon: '🦗', subtitle: 'Decade & Rider Care' },
  { id: 'aov', name: 'Poli Arena of Valor', icon: '⚔️', subtitle: 'Antaris Ranked Recovery' },
  { id: 'original', name: 'Poli Original & Fun', icon: '🐟', subtitle: 'Kucing Jelek & Mascot' },
];

export const CATEGORY_LIST: { id: MerchCategory; name: string; icon: string }[] = [
  { id: 'all', name: 'Semua Tipe', icon: '📦' },
  { id: 'clearance', name: '🔥 Clearance Sale', icon: '🏷️' },
  { id: 'print', name: 'Art Print', icon: '🖼️' },
  { id: 'photocard', name: 'Photocard', icon: '🃏' },
  { id: 'sticker', name: 'Sticker', icon: '🏷️' },
  { id: 'keychain', name: 'Keychain', icon: '🔑' },
  { id: 'pin', name: 'Pin / Badge', icon: '🔘' },
  { id: 'card', name: 'Card Koleksi', icon: '🎴' },
  { id: 'pick', name: 'Guitar Pick', icon: '🎸' },
  { id: 'pasphoto', name: 'Pas Foto 3x4', icon: '📷' },
];

export const CLINIC_INFO = {
  name: 'Klinik Halu Lagi Kh?',
  tagline: 'Klinik Wibu Kepercayaan Ningentachi! Konsultasi & Resep Merchandise Obat Halu',
  eventBadge: 'CLEARANCE SALE MERCHANDISE RESEP HALU',
  doctors: 'Dr. LULU & Haha',
  location: 'ICE BSD City, Booth Comifuro / Mail Order',
  schedule: 'Comifuro Day 1 & Day 2 / Pengiriman Setelah Event',
  email: 'halulagikh@gmail.com',
  instagramHandle: '@halulagi.kh',
  instagramUrl: 'https://instagram.com',
  hashtag: '#HaluLagiKh #ResepHaluKlinik',
  messageThankYou: 'Semoga resep merchandise halu ini lekas menyembuhkan kegalauan & mempererat hubunganmu dengan husbu/waifumu!'
};

export const PRODUCTS: Product[] = [
  {
    "id": "hlk-artprint-sale-ayd-genshin-bf",
    "name": "Art Print Genshin Boyfriend Series",
    "poli": "genshin",
    "category": "print",
    "price": 12000,
    "originalPrice": 15000,
    "image": "/images/catalog/items/artprint-sale-ayd-genshin-bf.webp",
    "artist": "Ayada-san",
    "isClearance": true,
    "isLimited": true,
    "description": "Art print edisi Boyfriend Genshin Impact (Lyney, Scara, Childe) dengan laminasi premium karya Dr. Ayada-san.",
    "size": "A5 (14.8 x 21 cm)",
    "badge": "CLEARANCE SALE",
    "dosage": "Pajang di meja kerja atau kamar untuk sensasi kencan Teyvat setiap hari.",
    "barcode": "4 901234 560001",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ayada-san",
    "shelfCode": "hlk-artprint-sale-ayd-genshin-bf",
    "visualType": "print",
    "variants": [
      {
        "id": "a-lyney",
        "name": "A. Lyney"
      },
      {
        "id": "a-lyney-idol",
        "name": "A. Lyney Idol"
      },
      {
        "id": "a-scara",
        "name": "A. Scara"
      },
      {
        "id": "a-childe",
        "name": "A. Childe"
      }
    ]
  },
  {
    "id": "hlk-artprint-sale-chkn-mihoyo-bf",
    "name": "Art Print MiHoYo Boyfriend Series",
    "poli": "hsr",
    "category": "print",
    "price": 12000,
    "originalPrice": 15000,
    "image": "/images/catalog/items/artprint-sale-chkn-mihoyo-bf.webp",
    "artist": "Chickenology",
    "isClearance": true,
    "isLimited": true,
    "description": "Art print pria idaman MiHoYo (Aventurine & Childe) dengan visual memikat karya Dr. Chickenology.",
    "size": "A5 (14.8 x 21 cm)",
    "badge": "CLEARANCE SALE",
    "dosage": "Obat histeria fangirl/fanboy. Tatap saat lelah beraktivitas.",
    "barcode": "4 901234 560002",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Chickenology",
    "shelfCode": "hlk-artprint-sale-chkn-mihoyo-bf",
    "visualType": "print",
    "variants": [
      {
        "id": "aventurine",
        "name": "Aventurine"
      },
      {
        "id": "childe",
        "name": "Childe"
      }
    ]
  },
  {
    "id": "hlk-artprint-sale-dne-mihoyo-mc",
    "name": "Art Print MiHoYo Main Character Heroines",
    "poli": "hsr",
    "category": "print",
    "price": 12000,
    "originalPrice": 15000,
    "image": "/images/catalog/items/artprint-sale-dne-mihoyo-mc.webp",
    "artist": "Daniel & Tukangayyal",
    "isClearance": true,
    "isLimited": true,
    "description": "Art print para MC wanita terpopuler MiHoYo (Stelle, Belle, Kiana, Lumine) karya Dr. Daniel & Tukangayyal.",
    "size": "A5 (14.8 x 21 cm)",
    "badge": "CLEARANCE SALE",
    "dosage": "Pajang di dinding ruang gacha untuk meningkatkan luck 5-star.",
    "barcode": "4 901234 560003",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Daniel & Tukangayyal",
    "shelfCode": "hlk-artprint-sale-dne-mihoyo-mc",
    "visualType": "print",
    "variants": [
      {
        "id": "stelle",
        "name": "Stelle"
      },
      {
        "id": "belle",
        "name": "Belle"
      },
      {
        "id": "kiana",
        "name": "Kiana"
      },
      {
        "id": "lumine",
        "name": "Lumine"
      }
    ]
  },
  {
    "id": "hlk-artprint-sale-enn-game-femaleposter",
    "name": "Art Print Game Female Heroines Poster",
    "poli": "anime",
    "category": "print",
    "price": 12000,
    "originalPrice": 15000,
    "image": "/images/catalog/items/artprint-sale-enn-game-femaleposter.webp",
    "artist": "Ennvela",
    "isClearance": true,
    "isLimited": true,
    "description": "Poster art print premium para heroine game & anime terpopuler karya Dr. Ennvela.",
    "size": "A5 (14.8 x 21 cm)",
    "badge": "CLEARANCE SALE",
    "dosage": "Booster inspirasi harian. Cocok untuk frame dekorasi kamar wibu estetik.",
    "barcode": "4 901234 560004",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ennvela",
    "shelfCode": "hlk-artprint-sale-enn-game-femaleposter",
    "visualType": "print",
    "variants": [
      {
        "id": "yelan",
        "name": "Yelan"
      },
      {
        "id": "lumine",
        "name": "Lumine"
      },
      {
        "id": "ei-miko",
        "name": "Ei & Miko"
      },
      {
        "id": "ei-masak",
        "name": "Ei Masak"
      },
      {
        "id": "yor-pns",
        "name": "Yor PNS"
      },
      {
        "id": "black-swan",
        "name": "Black Swan"
      }
    ]
  },
  {
    "id": "hlk-artprint-sale-meru-hsr",
    "name": "Art Print Honkai Star Rail Husbu Collection",
    "poli": "hsr",
    "category": "print",
    "price": 12000,
    "originalPrice": 15000,
    "image": "/images/catalog/items/artprint-sale-meru-hsr.webp",
    "artist": "Meru",
    "isClearance": true,
    "isLimited": true,
    "description": "Art print pria tampan Astral Express (Dan Heng, Jing Yuan, Blade) versi reguler & topless karya Dr. Meru.",
    "size": "A5 (14.8 x 21 cm)",
    "badge": "CLEARANCE SALE",
    "dosage": "Dosis tinggi pemulihan stres kerjaan dan tugas kuliah.",
    "barcode": "4 901234 560005",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Meru",
    "shelfCode": "hlk-artprint-sale-meru-hsr",
    "visualType": "print",
    "variants": [
      {
        "id": "dan-heng",
        "name": "Dan Heng"
      },
      {
        "id": "jing-yuan",
        "name": "Jing Yuan"
      },
      {
        "id": "blade",
        "name": "Blade"
      },
      {
        "id": "dan-heng-topless",
        "name": "Dan Heng (Topless)"
      },
      {
        "id": "jing-yuan-topless",
        "name": "Jing Yuan (Topless)"
      },
      {
        "id": "blade-topless",
        "name": "Blade (Topless)"
      }
    ]
  },
  {
    "id": "hlk-decacde-card-sale-enn-kamen-raider",
    "name": "Decade Ride Card Kamen Rider Collection",
    "poli": "kamen-rider",
    "category": "card",
    "price": 8000,
    "originalPrice": 10000,
    "image": "/images/catalog/items/decacde-card-sale-enn-kamen-raider.webp",
    "artist": "Ennvela",
    "isClearance": true,
    "isLimited": true,
    "description": "Kartu Kamen Rider Decade replika presisi dengan finishing doff tahan lama karya Dr. Ennvela.",
    "size": "8.6 x 5.9 cm Matte Card",
    "badge": "CLEARANCE SALE",
    "dosage": "Kamen Ride! Obat pemantik semangat transformasi diri saat rebahan.",
    "barcode": "4 901234 560006",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ennvela",
    "shelfCode": "hlk-decacde-card-sale-enn-kamen-raider",
    "visualType": "card"
  },
  {
    "id": "hlk-keychain-sale-dne-suisei",
    "name": "Acrylic Keychain Hoshimachi Suisei Expression",
    "poli": "vtuber",
    "category": "keychain",
    "price": 20000,
    "originalPrice": 25000,
    "image": "/images/catalog/items/keychain-sale-dne-suisei.webp",
    "artist": "Daniel & Tukangayyal",
    "isClearance": true,
    "isLimited": true,
    "description": "Gantungan kunci akrilik Hoshimachi Suisei dengan berbagai ekspresi ikonik karya Dr. Daniel & Tukangayyal.",
    "size": "6.5 x 6 cm Acrylic",
    "badge": "CLEARANCE SALE",
    "dosage": "Kaitkan di tas harian untuk menyebarkan pesona idola bintang Sui-chan.",
    "barcode": "4 901234 560007",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Daniel & Tukangayyal",
    "shelfCode": "hlk-keychain-sale-dne-suisei",
    "visualType": "keychain",
    "variants": [
      {
        "id": "s-sad",
        "name": "S. Sad"
      },
      {
        "id": "s-battle-axe",
        "name": "S. Battle Axe"
      },
      {
        "id": "s-smirk",
        "name": "S. Smirk"
      },
      {
        "id": "s-sparkle",
        "name": "S. Sparkle"
      },
      {
        "id": "s-wink",
        "name": "S. Wink"
      }
    ]
  },
  {
    "id": "hlk-keychain-sale-dne-vtuber",
    "name": "Acrylic Keychain VTuber Hololive Series",
    "poli": "vtuber",
    "category": "keychain",
    "price": 20000,
    "originalPrice": 25000,
    "image": "/images/catalog/items/keychain-sale-dne-vtuber.webp",
    "artist": "Daniel & Tukangayyal",
    "isClearance": true,
    "isLimited": true,
    "description": "Keychain akrilik karakter VTuber populer (Suisei, Zeta, Kobo) karya Dr. Daniel & Tukangayyal.",
    "size": "6.5 x 6 cm Acrylic",
    "badge": "CLEARANCE SALE",
    "dosage": "Bawa kemanapun untuk auto-parry serangan bad mood.",
    "barcode": "4 901234 560008",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Daniel & Tukangayyal",
    "shelfCode": "hlk-keychain-sale-dne-vtuber",
    "visualType": "keychain",
    "variants": [
      {
        "id": "suisei-bisik",
        "name": "Suisei Bisik"
      },
      {
        "id": "suisei-maid",
        "name": "Suisei Maid"
      },
      {
        "id": "zeta-neko",
        "name": "Zeta Neko"
      },
      {
        "id": "s-peace-sign",
        "name": "S. Peace Sign"
      },
      {
        "id": "kobo",
        "name": "Kobo"
      },
      {
        "id": "z-peace-sign",
        "name": "Z. Peace Sign"
      }
    ]
  },
  {
    "id": "hlk-pas-foto-sale-enn-genhsin",
    "name": "Pas Foto 3x4 Formal Teyvat Clinic ID",
    "poli": "genshin",
    "category": "pasphoto",
    "price": 8000,
    "originalPrice": 10000,
    "image": "/images/catalog/items/pas-foto-sale-enn-genhsin.webp",
    "artist": "Ennvela",
    "isClearance": true,
    "isLimited": true,
    "description": "Pas foto resmi ala kartu identitas warga Teyvat untuk melamar kerja di Klinik Halu Lagi Kah karya Dr. Ennvela.",
    "size": "3 x 4 cm Set 4pcs",
    "badge": "CLEARANCE SALE",
    "dosage": "Simpan di saku kemeja sebagai tanda pengenal resmi pasien wibu.",
    "barcode": "4 901234 560009",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ennvela",
    "shelfCode": "hlk-pas-foto-sale-enn-genhsin",
    "visualType": "pasphoto"
  },
  {
    "id": "hlk-photocard-sale-ayd-genshin-bf",
    "name": "Photocard Genshin Boyfriend Series",
    "poli": "genshin",
    "category": "photocard",
    "price": 10000,
    "originalPrice": 13000,
    "image": "/images/catalog/items/photocard-sale-ayd-genshin-bf.webp",
    "artist": "Ayada-san",
    "isClearance": true,
    "isLimited": true,
    "description": "Photocard pacar idaman Genshin Impact (Baizhu, Lyney, Childe) karya Dr. Ayada-san.",
    "size": "5.5 x 9 cm (Glossy)",
    "badge": "CLEARANCE SALE",
    "dosage": "Selipkan di casing HP untuk senyuman penyemangat seharian.",
    "barcode": "4 901234 560010",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ayada-san",
    "shelfCode": "hlk-photocard-sale-ayd-genshin-bf",
    "visualType": "photocard",
    "variants": [
      {
        "id": "baizhu",
        "name": "Baizhu"
      },
      {
        "id": "lyney",
        "name": "Lyney"
      },
      {
        "id": "childe",
        "name": "Childe"
      }
    ]
  },
  {
    "id": "hlk-photocard-sale-ayd-genshin-date",
    "name": "Photocard Genshin Date Series",
    "poli": "genshin",
    "category": "photocard",
    "price": 10000,
    "originalPrice": 13000,
    "image": "/images/catalog/items/photocard-sale-ayd-genshin-date.webp",
    "artist": "Ayada-san",
    "isClearance": true,
    "isLimited": true,
    "description": "Photocard kencan romantis karakter Genshin (Gaming, Wanderer, Lyney, Baizhu) karya Dr. Ayada-san.",
    "size": "5.5 x 9 cm (Glossy)",
    "badge": "CLEARANCE SALE",
    "dosage": "Tatap 5 menit sebelum tidur untuk mimpi indah bersama husbu tercinta.",
    "barcode": "4 901234 560011",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ayada-san",
    "shelfCode": "hlk-photocard-sale-ayd-genshin-date",
    "visualType": "photocard",
    "variants": [
      {
        "id": "gaming",
        "name": "Gaming"
      },
      {
        "id": "wanderer",
        "name": "Wanderer"
      },
      {
        "id": "lyney",
        "name": "Lyney"
      },
      {
        "id": "baizhu",
        "name": "Baizhu"
      }
    ]
  },
  {
    "id": "hlk-photocard-sale-chkn-genshin-male",
    "name": "Photocard Genshin Male Husbu Pack",
    "poli": "genshin",
    "category": "photocard",
    "price": 10000,
    "originalPrice": 13000,
    "image": "/images/catalog/items/photocard-sale-chkn-genshin-male.webp",
    "artist": "Chickenology",
    "isClearance": true,
    "isLimited": true,
    "description": "Photocard cowok tampan Teyvat (Venti, Wanderer, Childe, Ayato, Alhaitham) karya Dr. Chickenology.",
    "size": "5.5 x 9 cm (Glossy)",
    "badge": "CLEARANCE SALE",
    "dosage": "Penyembuh depresi dan penenang overthinking akut.",
    "barcode": "4 901234 560012",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Chickenology",
    "shelfCode": "hlk-photocard-sale-chkn-genshin-male",
    "visualType": "photocard",
    "variants": [
      {
        "id": "venti",
        "name": "Venti"
      },
      {
        "id": "wanderer",
        "name": "Wanderer"
      },
      {
        "id": "childe",
        "name": "Childe"
      },
      {
        "id": "ayato",
        "name": "Ayato"
      },
      {
        "id": "alhaitham",
        "name": "Alhaitham"
      }
    ]
  },
  {
    "id": "hlk-photocard-sale-chkn-jujutsu-kaisen",
    "name": "Photocard Jujutsu Kaisen Sorcerers",
    "poli": "anime",
    "category": "photocard",
    "price": 10000,
    "originalPrice": 13000,
    "image": "/images/catalog/items/photocard-sale-chkn-jujutsu-kaisen.webp",
    "artist": "Chickenology",
    "isClearance": true,
    "isLimited": true,
    "description": "Photocard penyihir Jujutsu Kaisen (Geto, Gojo, Choso) dengan visual tajam karya Dr. Chickenology.",
    "size": "5.5 x 9 cm (Glossy)",
    "badge": "CLEARANCE SALE",
    "dosage": "Dosis pertolongan pertama pasca membaca bab manga terbaru.",
    "barcode": "4 901234 560013",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Chickenology",
    "shelfCode": "hlk-photocard-sale-chkn-jujutsu-kaisen",
    "visualType": "photocard",
    "variants": [
      {
        "id": "geto",
        "name": "Geto"
      },
      {
        "id": "gojo",
        "name": "Gojo"
      },
      {
        "id": "choso",
        "name": "Choso"
      }
    ]
  },
  {
    "id": "hlk-photocard-sale-enn-kamen-raider",
    "name": "Photocard Kamen Rider Legend Series",
    "poli": "kamen-rider",
    "category": "photocard",
    "price": 8000,
    "originalPrice": 10000,
    "image": "/images/catalog/items/photocard-sale-enn-kamen-raider.webp",
    "artist": "Ennvela",
    "isClearance": true,
    "isLimited": true,
    "description": "Photocard koleksi rider era Heisei & Reiwa dalam balutan visual artistik Dr. Ennvela.",
    "size": "5.5 x 9 cm Glossy",
    "badge": "CLEARANCE SALE",
    "dosage": "Pembangkit jiwa ksatria pembela kebenaran.",
    "barcode": "4 901234 560014",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ennvela",
    "shelfCode": "hlk-photocard-sale-enn-kamen-raider",
    "visualType": "photocard"
  },
  {
    "id": "hlk-photocard-sale-meru-genhsin",
    "name": "Photocard Genshin Archons & MC Collection",
    "poli": "genshin",
    "category": "photocard",
    "price": 10000,
    "originalPrice": 13000,
    "image": "/images/catalog/items/photocard-sale-meru-genhsin.webp",
    "artist": "Meru",
    "isClearance": true,
    "isLimited": true,
    "description": "Photocard para Archon & karakter utama Genshin Impact karya Dr. Meru.",
    "size": "5.5 x 9 cm (Glossy)",
    "badge": "CLEARANCE SALE",
    "dosage": "Dosis harian penghormatan kepada para dewa Teyvat.",
    "barcode": "4 901234 560015",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Meru",
    "shelfCode": "hlk-photocard-sale-meru-genhsin",
    "visualType": "photocard",
    "variants": [
      {
        "id": "wanderer",
        "name": "Wanderer"
      },
      {
        "id": "venti",
        "name": "Venti"
      },
      {
        "id": "mc-genshin",
        "name": "MC Genshin"
      },
      {
        "id": "zhongli",
        "name": "Zhongli"
      },
      {
        "id": "ei",
        "name": "Ei"
      },
      {
        "id": "nahida",
        "name": "Nahida"
      }
    ]
  },
  {
    "id": "hlk-photocard-sale-rd-anemo-boys",
    "name": "Photocard Anemo Boys Boyband Series",
    "poli": "genshin",
    "category": "photocard",
    "price": 10000,
    "originalPrice": 13000,
    "image": "/images/catalog/items/photocard-sale-rd-anemo-boys.webp",
    "artist": "Red Dinoo",
    "isClearance": true,
    "isLimited": true,
    "description": "Photocard formasi boyband 6 Anemo Boys (Heizou, Wanderer, Kazuha, Xiao, Aether, Venti) karya Dr. Red Dinoo.",
    "size": "5.5 x 9 cm",
    "badge": "CLEARANCE SALE",
    "dosage": "Obat histeria fangirl dosis tinggi. Cukup 1 lembar per hari.",
    "barcode": "4 901234 560016",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Red Dinoo",
    "shelfCode": "hlk-photocard-sale-rd-anemo-boys",
    "visualType": "photocard",
    "variants": [
      {
        "id": "heizou",
        "name": "Heizou"
      },
      {
        "id": "wanderer",
        "name": "Wanderer"
      },
      {
        "id": "kazuha",
        "name": "Kazuha"
      },
      {
        "id": "xiao",
        "name": "Xiao"
      },
      {
        "id": "aether",
        "name": "Aether"
      },
      {
        "id": "venti",
        "name": "Venti"
      }
    ]
  },
  {
    "id": "hlk-photocard-sale-rd-genshin-male",
    "name": "Photocard Genshin Male Lineup",
    "poli": "genshin",
    "category": "photocard",
    "price": 10000,
    "originalPrice": 13000,
    "image": "/images/catalog/items/photocard-sale-rd-genshin-male.webp",
    "artist": "Red Dinoo",
    "isClearance": true,
    "isLimited": true,
    "description": "Photocard karakter pria idaman Teyvat (Kaeya, Diluc, Childe, Zhongli, Wriothesley, Neuvillette) karya Dr. Red Dinoo.",
    "size": "5.5 x 9 cm",
    "badge": "CLEARANCE SALE",
    "dosage": "Koleksi lengkap untuk booster energi harian.",
    "barcode": "4 901234 560017",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Red Dinoo",
    "shelfCode": "hlk-photocard-sale-rd-genshin-male",
    "visualType": "photocard",
    "variants": [
      {
        "id": "kaeya",
        "name": "Kaeya"
      },
      {
        "id": "diluc",
        "name": "Diluc"
      },
      {
        "id": "childe",
        "name": "Childe"
      },
      {
        "id": "zhongli",
        "name": "Zhongli"
      },
      {
        "id": "wriothesley",
        "name": "Wriothesley"
      },
      {
        "id": "neuvillette",
        "name": "Neuvillette"
      }
    ]
  },
  {
    "id": "hlk-photocard-sale-tsn-genshin-chair",
    "name": "Photocard Genshin Sitting Chair Series",
    "poli": "genshin",
    "category": "photocard",
    "price": 10000,
    "originalPrice": 13000,
    "image": "/images/catalog/items/photocard-sale-tsn-genshin-chair.webp",
    "artist": "Tesanu",
    "isClearance": true,
    "isLimited": true,
    "description": "Photocard pose duduk santai berkarisma karakter Genshin Impact karya Dr. Tesanu.",
    "size": "5.5 x 9 cm",
    "badge": "CLEARANCE SALE",
    "dosage": "Kagumi keanggunan karakter Teyvat di kala lelah beraktivitas.",
    "barcode": "4 901234 560018",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Tesanu",
    "shelfCode": "hlk-photocard-sale-tsn-genshin-chair",
    "visualType": "photocard",
    "variants": [
      {
        "id": "wriothesley",
        "name": "Wriothesley"
      },
      {
        "id": "wanderer",
        "name": "Wanderer"
      },
      {
        "id": "diluc",
        "name": "Diluc"
      },
      {
        "id": "alhaitham",
        "name": "Alhaitham"
      },
      {
        "id": "xiao",
        "name": "Xiao"
      }
    ]
  },
  {
    "id": "hlk-pick-sale-enn-bocchi-tr",
    "name": "Guitar Pick Bocchi The Rock! Special",
    "poli": "anime",
    "category": "pick",
    "price": 5000,
    "originalPrice": 8000,
    "image": "/images/catalog/items/pick-sale-enn-bocchi-tr.webp",
    "artist": "Ennvela",
    "isClearance": true,
    "isLimited": true,
    "description": "Pick gitar koleksi edisi Kessoku Band (Bocchi The Rock!) dengan artwork estetik karya Dr. Ennvela.",
    "size": "Standard Guitar Pick (0.71mm)",
    "badge": "CLEARANCE SALE",
    "dosage": "Pegang saat overthinking atau main gitar untuk memanggil jiwa Kessoku Band.",
    "barcode": "4 901234 560019",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ennvela",
    "shelfCode": "hlk-pick-sale-enn-bocchi-tr",
    "visualType": "pick",
    "variants": [
      {
        "id": "kita",
        "name": "Kita"
      },
      {
        "id": "nijika",
        "name": "Nijika"
      },
      {
        "id": "ryo",
        "name": "Ryo"
      },
      {
        "id": "bocchi",
        "name": "Bocchi"
      },
      {
        "id": "bocchi-segitiga",
        "name": "Bocchi Segitiga"
      }
    ]
  },
  {
    "id": "hlk-pin-sale-ayd-game-mc",
    "name": "Can Badge Pin Game Heroines MC",
    "poli": "anime",
    "category": "pin",
    "price": 8000,
    "originalPrice": 10000,
    "image": "/images/catalog/items/pin-sale-ayd-game-mc.webp",
    "artist": "Ayada-san",
    "isClearance": true,
    "isLimited": true,
    "description": "Pin kaleng can badge karakter protagonis game (Furina, Lumine, Miku, Firefly, Amiya) karya Dr. Ayada-san.",
    "size": "58mm Matte Can Badge",
    "badge": "CLEARANCE SALE",
    "dosage": "Sematkan di pouch/tas untuk mengklaim aura Main Character.",
    "barcode": "4 901234 560020",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ayada-san",
    "shelfCode": "hlk-pin-sale-ayd-game-mc",
    "visualType": "pin",
    "variants": [
      {
        "id": "furina",
        "name": "Furina"
      },
      {
        "id": "lumine",
        "name": "Lumine"
      },
      {
        "id": "miku",
        "name": "Miku"
      },
      {
        "id": "firefly",
        "name": "Firefly"
      },
      {
        "id": "amiya",
        "name": "Amiya"
      }
    ]
  },
  {
    "id": "hlk-pin-sale-enn-umamusume",
    "name": "Can Badge Pin Uma Musume Meme Expressions",
    "poli": "anime",
    "category": "pin",
    "price": 8000,
    "originalPrice": 10000,
    "image": "/images/catalog/items/pin-sale-enn-umamusume.webp",
    "artist": "Ennvela",
    "isClearance": true,
    "isLimited": true,
    "description": "Pin can badge Uma Musume ekspresi kocak lokal (Gas, Cihuy, Waduh, Turu, Malas) karya Dr. Ennvela.",
    "size": "58mm Matte Can Badge",
    "badge": "CLEARANCE SALE",
    "dosage": "Sematkan di tas agar larimu kencang menuju masa depan cerah.",
    "barcode": "4 901234 560021",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ennvela",
    "shelfCode": "hlk-pin-sale-enn-umamusume",
    "visualType": "pin",
    "variants": [
      {
        "id": "gas",
        "name": "Gas"
      },
      {
        "id": "cihuy",
        "name": "Cihuy"
      },
      {
        "id": "waduh",
        "name": "Waduh"
      },
      {
        "id": "turu",
        "name": "Turu"
      },
      {
        "id": "malas",
        "name": "Malas"
      }
    ]
  },
  {
    "id": "hlk-pin-sale-meru-genshin-male",
    "name": "Can Badge Pin Genshin & HSR Male Stars",
    "poli": "genshin",
    "category": "pin",
    "price": 8000,
    "originalPrice": 10000,
    "image": "/images/catalog/items/pin-sale-meru-genshin-male.webp",
    "artist": "Meru",
    "isClearance": true,
    "isLimited": true,
    "description": "Pin bulat 10 karakter cowok Genshin Impact & Honkai Star Rail karya Dr. Meru.",
    "size": "58mm Matte Pin",
    "badge": "CLEARANCE SALE",
    "dosage": "Koleksi pin estetik untuk tas itabag kebanggaan.",
    "barcode": "4 901234 560022",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Meru",
    "shelfCode": "hlk-pin-sale-meru-genshin-male",
    "visualType": "pin",
    "variants": [
      {
        "id": "xiao",
        "name": "Xiao"
      },
      {
        "id": "aether",
        "name": "Aether"
      },
      {
        "id": "kazuha",
        "name": "Kazuha"
      },
      {
        "id": "venti",
        "name": "Venti"
      },
      {
        "id": "wanderer",
        "name": "Wanderer"
      },
      {
        "id": "aventurine",
        "name": "Aventurine"
      },
      {
        "id": "dr-ratio",
        "name": "Dr. Ratio"
      },
      {
        "id": "gepard",
        "name": "Gepard"
      },
      {
        "id": "misha",
        "name": "Misha"
      },
      {
        "id": "sampo",
        "name": "Sampo"
      }
    ]
  },
  {
    "id": "hlk-sticker-sale-ayd-aov",
    "name": "Sticker Chibi Pack Arena of Valor",
    "poli": "aov",
    "category": "sticker",
    "price": 5000,
    "originalPrice": 8000,
    "image": "/images/catalog/items/sticker-sale-ayd-aov.webp",
    "artist": "Ayada-san",
    "isClearance": true,
    "isLimited": true,
    "description": "Stiker chibi karakter AoV favorit karya Dr. Ayada-san. Tahan air & anti gores.",
    "size": "7 x 7 cm Vinyl",
    "badge": "CLEARANCE SALE",
    "dosage": "Tempel di hp/casing untuk buff winrate ranked bintang 5.",
    "barcode": "4 901234 560023",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ayada-san",
    "shelfCode": "hlk-sticker-sale-ayd-aov",
    "visualType": "sticker"
  },
  {
    "id": "hlk-sticker-sale-ayd-genshin",
    "name": "Sticker Die-Cut Chibi Genshin Impact",
    "poli": "genshin",
    "category": "sticker",
    "price": 5000,
    "originalPrice": 8000,
    "image": "/images/catalog/items/sticker-sale-ayd-genshin.webp",
    "artist": "Ayada-san",
    "isClearance": true,
    "isLimited": true,
    "description": "Stiker die-cut chibi karakter Genshin Impact karya Dr. Ayada-san.",
    "size": "7 x 7 cm Vinyl",
    "badge": "CLEARANCE SALE",
    "dosage": "Tempel di laptop/tablet untuk menyuntikkan energi keceriaan Teyvat.",
    "barcode": "4 901234 560024",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Ayada-san",
    "shelfCode": "hlk-sticker-sale-ayd-genshin",
    "visualType": "sticker"
  },
  {
    "id": "hlk-sticker-sale-dne-mihoyo",
    "name": "Sticker Set MiHoYo Universes",
    "poli": "hsr",
    "category": "sticker",
    "price": 5000,
    "originalPrice": 8000,
    "image": "/images/catalog/items/sticker-sale-dne-mihoyo.webp",
    "artist": "Daniel & Tukangayyal",
    "isClearance": true,
    "isLimited": true,
    "description": "Stiker karakter MiHoYo semesta Genshin, HSR, & ZZZ karya Dr. Daniel & Tukangayyal.",
    "size": "7 x 7 cm Vinyl",
    "badge": "CLEARANCE SALE",
    "dosage": "Pelindung gadget dari goresan dengan visual pop urban.",
    "barcode": "4 901234 560025",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Daniel & Tukangayyal",
    "shelfCode": "hlk-sticker-sale-dne-mihoyo",
    "visualType": "sticker"
  },
  {
    "id": "hlk-sticker-sale-dne-suisei",
    "name": "Sticker Die-Cut Hoshimachi Suisei Expressions",
    "poli": "vtuber",
    "category": "sticker",
    "price": 5000,
    "originalPrice": 8000,
    "image": "/images/catalog/items/sticker-sale-dne-suisei.webp",
    "artist": "Daniel & Tukangayyal",
    "isClearance": true,
    "isLimited": true,
    "description": "Stiker die-cut Suisei berbagai pose dan ekspresi karya Dr. Daniel & Tukangayyal.",
    "size": "7 x 7 cm Hologram Vinyl",
    "badge": "CLEARANCE SALE",
    "dosage": "Pandangi saat mendengarkan Stellar Stellar untuk pemulihan jiwa 100%.",
    "barcode": "4 901234 560026",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Daniel & Tukangayyal",
    "shelfCode": "hlk-sticker-sale-dne-suisei",
    "visualType": "sticker",
    "variants": [
      {
        "id": "s-wink",
        "name": "S. Wink"
      },
      {
        "id": "s-smirk",
        "name": "S. Smirk"
      },
      {
        "id": "s-sad",
        "name": "S. Sad"
      },
      {
        "id": "s-battle-axe",
        "name": "S. Battle Axe"
      },
      {
        "id": "s-sparkle",
        "name": "S. Sparkle"
      }
    ]
  },
  {
    "id": "hlk-sticker-sale-rd-cynonari",
    "name": "Sticker Die-Cut Cyno & Tighnari Cynonari",
    "poli": "genshin",
    "category": "sticker",
    "price": 5000,
    "originalPrice": 8000,
    "image": "/images/catalog/items/sticker-sale-rd-cynonari.webp",
    "artist": "Red Dinoo",
    "isClearance": true,
    "isLimited": true,
    "description": "Stiker kombo duo Sumeru Cyno & Tighnari karya Dr. Red Dinoo dengan chemistry tak tertandingi.",
    "size": "7 x 7 cm Vinyl",
    "badge": "CLEARANCE SALE",
    "dosage": "Pencegah lelucon garing Cyno berulang kali.",
    "barcode": "4 901234 560027",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Red Dinoo",
    "shelfCode": "hlk-sticker-sale-rd-cynonari",
    "visualType": "sticker",
    "variants": [
      {
        "id": "cyno-cabe-merah",
        "name": "Cyno Cabe Merah"
      },
      {
        "id": "tighnari-cabe-hijau",
        "name": "Tighnari Cabe Hijau"
      },
      {
        "id": "cyno-jelek",
        "name": "Cyno Jelek"
      },
      {
        "id": "tighnari-jelek",
        "name": "Tighnari Jelek"
      }
    ]
  },
  {
    "id": "hlk-sticker-sale-rd-sumeru-barbie",
    "name": "Sticker Sumeru Barbie Edition",
    "poli": "genshin",
    "category": "sticker",
    "price": 5000,
    "originalPrice": 8000,
    "image": "/images/catalog/items/sticker-sale-rd-sumeru-barbie.webp",
    "artist": "Red Dinoo",
    "isClearance": true,
    "isLimited": true,
    "description": "Stiker parodi Sumeru Barbie (Alhaitham, Kaveh, Cyno, Tighnari) karya Dr. Red Dinoo. Sangat ikonik!",
    "size": "7 x 7 cm Vinyl",
    "badge": "CLEARANCE SALE",
    "dosage": "Tempel di binder/laptop untuk menyuntikkan energi humor ke tugas kantor.",
    "barcode": "4 901234 560028",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Red Dinoo",
    "shelfCode": "hlk-sticker-sale-rd-sumeru-barbie",
    "visualType": "sticker",
    "variants": [
      {
        "id": "barbie-kaveh",
        "name": "Barbie Kaveh"
      },
      {
        "id": "barbie-alhaitham",
        "name": "Barbie Alhaitham"
      },
      {
        "id": "barbie-cyno",
        "name": "Barbie Cyno"
      },
      {
        "id": "barbie-tighnari",
        "name": "Barbie Tighnari"
      }
    ]
  },
  {
    "id": "hlk-sticker-sale-rd-wriothesley",
    "name": "Sticker Die-Cut Wriothesley Duke Teh",
    "poli": "genshin",
    "category": "sticker",
    "price": 5000,
    "originalPrice": 8000,
    "image": "/images/catalog/items/sticker-sale-rd-wriothesley.webp",
    "artist": "Red Dinoo",
    "isClearance": true,
    "isLimited": true,
    "description": "Stiker sang Duke Meropide Wriothesley dalam aneka momen minum teh & Sigewinne karya Dr. Red Dinoo.",
    "size": "7 x 7 cm Vinyl",
    "badge": "CLEARANCE SALE",
    "dosage": "Obat dingin untuk mendinginkan kepala yang panas akibat gacha ampas.",
    "barcode": "4 901234 560029",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Red Dinoo",
    "shelfCode": "hlk-sticker-sale-rd-wriothesley",
    "visualType": "sticker",
    "variants": [
      {
        "id": "wriothesley-teh-asu",
        "name": "Wriothesley Teh Asu"
      },
      {
        "id": "wriothesley-sigewinne",
        "name": "Wriothesley Sigewinne"
      },
      {
        "id": "wriothesley-teh-besar",
        "name": "Wriothesley Teh Besar"
      },
      {
        "id": "wriothesley-teh-infus",
        "name": "Wriothesley Teh Infus"
      },
      {
        "id": "wriothesley-teh-cekek",
        "name": "Wriothesley Teh Cekek"
      }
    ]
  },
  {
    "id": "hlk-sticker-sale-tsn-kucing-jelek",
    "name": "Sticker Die-Cut Kucing Jelek Tapi Sayang",
    "poli": "original",
    "category": "sticker",
    "price": 5000,
    "originalPrice": 8000,
    "image": "/images/catalog/items/sticker-sale-tsn-kucing-jelek.webp",
    "artist": "Tesanu",
    "isClearance": true,
    "isLimited": true,
    "description": "Stiker kucing ekspresi kocak absurd dan tingkah konyol karya Dr. Tesanu. Paling dicari pecinta anabul!",
    "size": "6 x 6 cm Vinyl",
    "badge": "CLEARANCE SALE",
    "dosage": "Lihat wajah kucing ini selama 3 detik untuk melenyapkan amarah seharian.",
    "barcode": "4 901234 560030",
    "shelfTag": "Clearance",
    "shelfSub": "Dr. Tesanu",
    "shelfCode": "hlk-sticker-sale-tsn-kucing-jelek",
    "visualType": "sticker",
    "variants": [
      {
        "id": "k-item",
        "name": "K. Item"
      },
      {
        "id": "k-sapi",
        "name": "K. Sapi"
      },
      {
        "id": "k-pipop",
        "name": "K. Pipop"
      },
      {
        "id": "k-jalan",
        "name": "K. Jalan"
      },
      {
        "id": "k-loading",
        "name": "K. Loading"
      },
      {
        "id": "k-turu",
        "name": "K. Turu"
      },
      {
        "id": "k-hah",
        "name": "K. Hah"
      },
      {
        "id": "k-bontot",
        "name": "K. Bontot"
      }
    ]
  }
];
