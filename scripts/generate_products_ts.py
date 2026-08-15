import json
import os

products_json = "scripts/extracted_products.json"
with open(products_json, "r", encoding="utf-8") as f:
    items = json.load(f)

ARTIST_MAP = {
    "RD": "Red Dinoo",
    "CHKN": "Chickenology",
    "ENN": "Ennvela",
    "AYD": "Ayada-san",
    "TSN": "Tesanu",
    "LUKI": "Luki",
    "MERU": "Meru",
    "DNE": "Daniel & Tukangayyal"
}

# Metadata mappings for nice names, descriptions, sizes, dosages, etc.
def enrich_item(item, idx):
    cat = item["category"]
    poli = item["poli"]
    raw_artist_code = item["artist"] or "Team HLK"
    artist = ARTIST_MAP.get(raw_artist_code, raw_artist_code)
    is_clearance = item["isClearance"]
    raw = item["title_raw"]
    
    # Custom titles & details based on item
    name = f"{cat.title()} {raw.title()}"
    size = "Standard"
    desc = f"Merchandise estetik original dari klinik Halu Lagi Kah karya Dr. {artist}."
    dosage = "Gunakan 1-2 kali sehari untuk meredakan halusinasi wibu akut."
    badge = "CLEARANCE SALE" if is_clearance else "NEW ARRIVAL"
    shelf_tag = "Clearance" if is_clearance else ("Top 1" if idx % 5 == 0 else "Best!")
    shelf_sub = f"Dr. {artist} Resep"
    shelf_code = f"HLK-{raw_artist_code}-{cat[:2].upper()}{idx+1:02d}"
    barcode = f"4 901234 {560000 + idx + 1}"
    
    # Specific tailoring
    if "GENSHIN DATE" in raw:
        name = "Photocard Genshin Date Series"
        size = "5.5 x 9 cm (Glossy)"
        desc = "Photocard edisi kencan romantis karakter Genshin Impact dengan laminasi glossy premium."
        dosage = "Selipkan di dompet/casing HP untuk sensasi kencan Teyvat setiap saat."
    elif "GAME FEMALEPOSTER" in raw:
        name = "Art Print Female Game Heroines Poster"
        size = "A5 (14.8 x 21 cm)"
        desc = "Poster art print premium para heroine game terpopuler dalam satu frame megah."
        dosage = "Pajang di dinding ruang kerja untuk booster inspirasi gaming harian."
    elif "GENSHIN BF" in raw and cat == "photocard":
        name = "Photocard Genshin Boyfriend Series"
        size = "5.5 x 9 cm (Glossy)"
        desc = "Photocard sudut pandang pacar pria idaman Genshin Impact (Childe, Zhongli, Diluc, Kaeya)."
        dosage = "Tatap 5 menit sebelum tidur untuk mimpi indah bersama husbu tercinta."
    elif "GENSHIN BF" in raw and cat == "print":
        name = "Art Print A5 Genshin Boyfriend Series"
        size = "A5 Linen 260gsm"
        desc = "Art print bertekstur linen mewah menampilkan visual boyfriend Genshin Impact."
        dosage = "Letakkan di meja belajar sebagai obat penenang stres tugas dan kerjaan."
    elif "BOCCHI TR" in raw:
        name = "Guitar Pick Bocchi The Rock! Special"
        size = "Standard Guitar Pick (0.71mm)"
        desc = "Pick gitar koleksi edisi Bocchi The Rock! dengan grip anti-slip dan artwork Hitori Gotoh."
        dosage = "Pegang saat overthinking atau main gitar untuk memanggil jiwa Kessoku Band."
    elif "ANEMO BOYS" in raw:
        name = "Photocard Anemo Boys Boyband Series"
        size = "5.5 x 9 cm"
        desc = "Photocard formasi boyband 4 Anemo Boys (Venti, Kazuha, Xiao, Heizou) paling fresh."
        dosage = "Obat histeria fangirl/fanboy dosis tinggi. Cukup 1 lembar per hari."
    elif "JUJUTSU KAISEN" in raw:
        name = "Photocard Jujutsu Kaisen Sorcerer Series"
        size = "5.5 x 9 cm"
        desc = "Photocard glossy karakter Jujutsu Kaisen (Gojo, Geto, Megumi, Yuji) dengan visual mematikan."
        dosage = "Penyembuh depresi setelah membaca bab manga Jujutsu Kaisen."
    elif "BANGABOO" in raw and cat == "sticker":
        name = "Sticker Die-Cut Bangaboo ZZZ"
        size = "6 x 6 cm Vinyl"
        desc = "Stiker vinyl Bangaboo maskot Zenless Zone Zero yang menggemaskan dan tahan air."
        dosage = "Tempel di laptop untuk meningkatkan efisiensi Hollow exploration."
    elif "BANGABOO" in raw and cat == "keychain":
        name = "Acrylic Keychain Bangaboo ZZZ"
        size = "6 x 5 cm Acrylic Double-Sided"
        desc = "Gantungan kunci akrilik Bangaboo tebal dengan gantungan clasp bintang premium."
        dosage = "Kaitkan di tas belanja/ransel untuk mendeteksi keberadaan Hollow terdekat."
    elif "GENSHIN CHAIR" in raw:
        name = "Photocard Genshin Sitting Chair Series"
        size = "5.5 x 9 cm"
        desc = "Photocard pose duduk santai karakter Genshin Impact dengan aura elegan dan berwibawa."
        dosage = "Kagumi keanggunan karakter Teyvat di kala lelah beraktivitas."
    elif "KPOP DEMON HUNTER" in raw:
        name = "Special Event Ticket Demon Hunter K-Pop Edition"
        size = "14 x 6 cm Hologram Ticket"
        desc = "Tiket konser/event eksklusif edisi Demon Hunter Idol Group dengan efek hologram kilau mewah."
        dosage = "Simpan rapi di binder koleksi sebagai paspor VIP dunia imajinasi."
    elif "IKAN" in raw:
        name = "Sticker Die-Cut Ikan Estetik RD"
        size = "6 x 5 cm Vinyl"
        desc = f"Stiker ikan kocak filosofis karya Dr. {artist}. Anti gores, anti air, dan anti galau."
        dosage = "Tempel di helm/kendaraan agar tetap tenang mengarungi lautan kehidupan."
    elif "ZZZ" in raw and cat == "sticker":
        name = "Sticker Set Zenless Zone Zero Agents"
        size = "7 x 7 cm Vinyl"
        desc = "Stiker die-cut agen-agen New Eridu (Ellen Joe, Nicole, Billy, Anby) gaya pop urban."
        dosage = "Booster gaya streetwear dan pelindung gadget dari goresan."
    elif "ZZZ" in raw and cat == "keychain":
        name = "Acrylic Keychain Zenless Zone Zero"
        size = "6.5 x 6 cm Double Sided"
        desc = "Keychain akrilik karakter ZZZ bening tebal 4mm dengan printing UV tajam."
        dosage = "Bawa kemanapun untuk auto-parry serangan bad mood."
    elif "PAS FOTO" in cat or "PAS FOTO" in raw or "GENHSIN" in raw and cat == "pasphoto":
        name = "Pas Foto 3x4 Formal Teyvat Clinic ID"
        size = "3 x 4 cm Set 4pcs"
        desc = "Pas foto resmi ala kartu identitas warga Teyvat untuk melamar kerja di Klinik Halu Lagi Kah."
        dosage = "Simpan di saku kemeja sebagai tanda pengenal resmi pasien wibu."
    elif "KAMEN" in raw and cat == "card":
        name = "Decade Ride Card Kamen Rider Collection"
        size = "8.6 x 5.9 cm Matte Card"
        desc = "Kartu Kamen Rider Decade replika presisi dengan finishing doff tahan lama."
        dosage = "Kamen Ride! Obat pemantik semangat transformasi diri saat rebahan."
    elif "KAMEN" in raw and cat == "photocard":
        name = "Photocard Kamen Rider Legend Series"
        size = "5.5 x 9 cm Glossy"
        desc = f"Photocard koleksi rider era Heisei & Reiwa dalam balutan visual artistik Dr. {artist}."
        dosage = "Penyembuh jiwa ksatria yang tertidur."
    elif "WRIOTHESLEY" in raw:
        name = "Sticker Die-Cut Wriothesley Duke of Meropide"
        size = "7 x 7 cm Vinyl"
        desc = "Stiker sang Duke Meropide Wriothesley dengan visual gagah dan kharismatik."
        dosage = "Obat dingin untuk mendinginkan kepala yang panas akibat gacha ampas."
    elif "DANDADAN" in raw and cat == "sticker":
        name = "Sticker Set Dandadan Chibi Spirits"
        size = "7 x 7 cm Vinyl"
        desc = f"Stiker karakter Momo, Okarun, dan Turbo Granny dari Dandadan karya Dr. {artist}."
        dosage = "Tempel di pintu kamar untuk menangkal hantu dan alien jahat."
    elif "DANDADAN" in raw and cat == "keychain":
        name = "Acrylic Keychain Dandadan Turbo Action"
        size = "6.5 x 6 cm Acrylic"
        desc = "Gantungan kunci akrilik Dandadan double-sided super dinamis dan awet."
        dosage = "Kaitkan di tas sekolah/kuliah untuk kecepatan lari sprint turbo."
    elif "WUWA" in raw and cat == "sticker":
        name = "Sticker Die-Cut Wuthering Waves Resonators"
        size = "7 x 7 cm Vinyl"
        desc = "Stiker Resonator Solaris-3 (Jiyan, Rover, Changli, Yinlin) anti air dan UV."
        dosage = "Tempel di tablet/iPad untuk memicu resonansi kreativitas tingkat dewa."
    elif "WUWA" in raw and cat == "keychain":
        name = "Acrylic Keychain Wuthering Waves"
        size = "6.5 x 6 cm Acrylic"
        desc = f"Gantungan kunci akrilik Wuthering Waves tebal berkualitas tinggi karya Dr. {artist}."
        dosage = "Gantungan kunci penenang saat farming echo ampas."
    elif "UMAMUSUME" in raw:
        name = "Can Badge Pin Uma Musume Pretty Derby"
        size = "58mm Matte Can Badge"
        desc = "Pin kaleng can badge karakter Uma Musume dengan laminasi doff lembut anti pantulan."
        dosage = "Sematkan di tas/topi agar larimu kencang menuju masa depan cerah."
    elif "SUISEI" in raw and cat == "sticker":
        name = "Sticker Die-Cut Hoshimachi Suisei Idol"
        size = "7 x 7 cm Hologram Vinyl"
        desc = "Stiker hologram Hoshimachi Suisei 'Sui-chan wa Kyou mo Kawaii!' berkilau estetik."
        dosage = "Pandangi sambil mendengarkan lagu Stellar Stellar untuk pemulihan jiwa 100%."
    elif "SUISEI" in raw and cat == "keychain":
        name = "Acrylic Keychain Hoshimachi Suisei Stellar"
        size = "6.5 x 6 cm Acrylic"
        desc = "Gantungan kunci akrilik Hoshimachi Suisei dengan gantungan bintang emas elegan."
        dosage = "Bawa ke konser atau daily commute untuk menyebarkan pesona idola bintang."
    elif "SUISEI" in raw and cat == "print":
        name = "Art Print A5 Hoshimachi Suisei Concert Stage"
        size = "A5 Linen 260gsm"
        desc = f"Art print panggung konser megah Hoshimachi Suisei karya Dr. {artist}."
        dosage = "Pajang dekat audio speaker kamar untuk atmosfer konser virtual setiap hari."
    elif "MIE AYAM" in raw:
        name = "Sticker Die-Cut Mie Ayam Abang-Abang"
        size = "6 x 6 cm Vinyl"
        desc = f"Stiker kuliner lokal legendaris semangkok Mie Ayam komplit karya Dr. {artist}."
        dosage = "Obat mujarab saat lapar tengah malam tapi saldo rekening menipis."
    elif "ALIEN STAGE" in raw:
        name = "Sticker Set Alien Stage Ivan & Till"
        size = "7 x 7 cm Vinyl"
        desc = f"Stiker emosional karakter Alien Stage karya Dr. {artist} dengan sentuhan warna dramatis."
        dosage = "Dosis pengurang sesak di dada sehabis nonton putaran Alien Stage terbaru."
    elif "POLAROID" in raw:
        name = "Polaroid Collection MiHoYo MC & VTuber"
        size = "8 x 10 cm Polaroid Glossy"
        desc = "Foto polaroid kenangan manis MC game MiHoYo & VTuber dengan bingkai putih retro."
        dosage = "Koleksi di binder album atau tempel di dinding kamar."
    elif "KUCING JELEK" in raw:
        name = "Sticker Die-Cut Kucing Jelek Tapi Sayang"
        size = "6 x 6 cm Vinyl"
        desc = f"Stiker kucing pose aneh dan ekspresi kocak karya Dr. {artist}. Paling dicari pecinta anabul!"
        dosage = "Lihat wajah kucing ini selama 3 detik untuk melenyapkan amarah seharian."
    elif "HSR" in raw and cat == "print":
        name = "Art Print A5 Honkai Star Rail Astral Journey"
        size = "A5 Linen 260gsm"
        desc = f"Art print premium karakter Honkai Star Rail penuh pesona karya Dr. {artist}."
        dosage = "Pajang di ruang santai untuk menyambut kedatangan Express."
    elif "SUMERU BARBIE" in raw:
        name = "Sticker Sumeru Barbie Alhaitham & Kaveh"
        size = "7 x 7 cm Vinyl"
        desc = f"Stiker parodi Sumeru Barbie Alhaitham & Kaveh karya Dr. {artist}. Sangat ikonik dan lucu!"
        dosage = "Tempel di laptop untuk menyuntikkan energi humor ke pekerjaan arsitek/kantor."
    elif "AOV" in raw:
        name = "Sticker Chibi Pack Arena of Valor"
        size = "7 x 7 cm Vinyl"
        desc = f"Stiker chibi karakter AoV favorit karya Dr. {artist}. Tahan air & anti gores."
        dosage = "Tempel di hp/casing untuk buff winrate ranked bintang 5."
    elif "HTTD FROSTED" in raw:
        name = "Frosted Keychain How To Train Your Dragon"
        size = "6 x 5 cm Frosted Acrylic"
        desc = "Gantungan kunci akrilik doff Toothless & Light Fury dengan efek frosted elegan."
        dosage = "Pendamping setia perjalanan menjelajahi langit mimpi."
    elif "GAME MC" in raw and cat == "pin":
        name = "Can Badge Pin Game MC Protagonist"
        size = "58mm Matte Pin"
        desc = "Pin bulat protagonis game favorit dengan kualitas cetak high-res dan pin kokoh."
        dosage = "Sematkan di pouch/tas untuk mengklaim gelar Main Character."
    elif "CYNONARI" in raw:
        name = "Sticker Die-Cut Cyno & Tighnari Cynonari"
        size = "7 x 7 cm Vinyl"
        desc = f"Stiker kombo duo Sumeru Cyno & Tighnari karya Dr. {artist} dengan chemistry tak tertandingi."
        dosage = "Pencegah lelucon garing Cyno berulang kali."
    elif "WRIOTHESLEY" in raw:
        name = "Sticker Die-Cut Wriothesley Meropide"
        size = "7 x 7 cm Vinyl"
        desc = f"Stiker sang Duke Wriothesley Fontaine karya Dr. {artist}."
        dosage = "Dosis visual penyegar mata di jam-jam lelah."
    
    prod = {
        "id": item["id"],
        "name": name,
        "poli": poli,
        "category": cat,
        "price": item["price"],
        "image": item["image"],
        "artist": artist,
        "isClearance": is_clearance,
        "catalogPageImage": "/images/catalog/pages/page-2.png",
        "description": desc,
        "size": size,
        "badge": badge,
        "dosage": dosage,
        "barcode": barcode,
        "shelfTag": shelf_tag,
        "shelfSub": f"Dr. {artist}",
        "shelfCode": shelf_code,
        "visualType": cat
    }
    if is_clearance:
        prod["originalPrice"] = item["price"] + 3000
    return prod

enriched_products = [enrich_item(item, i) for i, item in enumerate(items)]

# Output TypeScript file
ts_code = """export type PoliType =
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
  { id: 'zzz', name: 'Poli Zenless Zone Zero', icon: '⚡', subtitle: 'New Eridu Therapy' },
  { id: 'wuwa', name: 'Poli Wuthering Waves', icon: '🌊', subtitle: 'Solaris-3 Recovery' },
  { id: 'kamen-rider', name: 'Poli Kamen Rider', icon: '🦗', subtitle: 'Decade & Rider Care' },
  { id: 'aov', name: 'Poli Arena of Valor', icon: '⚔️', subtitle: 'Antaris Ranked Recovery' },
  { id: 'vtuber', name: 'Poli VTuber & Holo', icon: '🌟', subtitle: 'Suisei & Virtual Clinic' },
  { id: 'anime', name: 'Poli Anime & Fandom', icon: '🍿', subtitle: 'Dandadan, Bocchi, JJK' },
  { id: 'original', name: 'Poli Original & Fun', icon: '🐟', subtitle: 'Kucing Jelek & Ikan' },
];

export const CATEGORY_LIST: { id: MerchCategory; name: string; icon: string }[] = [
  { id: 'all', name: 'Semua Tipe', icon: '📦' },
  { id: 'clearance', name: '🔥 Clearance Sale', icon: '🏷️' },
  { id: 'print', name: 'Art Print', icon: '🖼️' },
  { id: 'photocard', name: 'Photocard', icon: '🃏' },
  { id: 'pasphoto', name: 'Pas Foto 3x4', icon: '📷' },
  { id: 'sticker', name: 'Sticker', icon: '🏷️' },
  { id: 'keychain', name: 'Keychain', icon: '🔑' },
  { id: 'pin', name: 'Pin / Badge', icon: '🔘' },
  { id: 'card', name: 'Card Koleksi', icon: '🎴' },
  { id: 'ticket', name: 'Concert Ticket', icon: '🎟️' },
  { id: 'pick', name: 'Guitar Pick', icon: '🎸' },
  { id: 'polaroid', name: 'Polaroid', icon: '📸' },
];

export const CLINIC_INFO = {
  name: 'Klinik Halu Lagi Kh?',
  tagline: 'Klinik Wibu Kepercayaan Ningentachi! Konsultasi & Resep Merchandise Obat Halu',
  eventBadge: 'PRE-ORDER MERCHANDISE RESEP HALU',
  doctors: 'Dr. LULU & Haha',
  location: 'ICE BSD City, Booth Comifuro / Mail Order',
  schedule: 'Comifuro Day 1 & Day 2 / Pengiriman Setelah Event',
  email: 'halulagikh@gmail.com',
  instagramHandle: '@halulagi.kh',
  instagramUrl: 'https://instagram.com',
  hashtag: '#HaluLagiKh #ResepHaluKlinik',
  messageThankYou: 'Semoga resep merchandise halu ini lekas menyembuhkan kegalauan & mempererat hubunganmu dengan husbu/waifumu!'
};

export const PRODUCTS: Product[] = """

ts_products = json.dumps(enriched_products, indent=2, ensure_ascii=False)
full_ts = ts_code + ts_products + ";\n"

with open("src/data/products.ts", "w", encoding="utf-8") as f:
    f.write(full_ts)

print(f"Successfully generated src/data/products.ts with {len(enriched_products)} products.")
