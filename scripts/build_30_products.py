import os
import zipfile
import re
import json
from PIL import Image

ZIP_PATH = "Daftar produk halu lagi kh.zip"
DEST_DIR = "public/images/catalog/items"
os.makedirs(DEST_DIR, exist_ok=True)

ARTIST_MAP = {
    "RD": "Red Dinoo",
    "CHKN": "Chickenology",
    "ENN": "Ennvela",
    "AYD": "Ayada-san",
    "TSN": "Tesanu",
    "DNE": "Daniel & Tukangayyal",
    "MERU": "Meru"
}

def clean_slug(name):
    name_no_ext = os.path.splitext(name)[0]
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', name_no_ext.lower()).strip('-')
    return slug + ".webp"

# Specification of all 30 Sale Products with transcribed variants
PRODUCTS_SPEC = [
    {
        "filename": "ARTPRINT_SALE_AYD_GENSHIN BF.png",
        "name": "Art Print Genshin Boyfriend Series",
        "poli": "genshin",
        "category": "print",
        "price": 12000,
        "originalPrice": 15000,
        "artist_code": "AYD",
        "size": "A5 (14.8 x 21 cm)",
        "desc": "Art print edisi Boyfriend Genshin Impact (Lyney, Scara, Childe) dengan laminasi premium karya Dr. Ayada-san.",
        "dosage": "Pajang di meja kerja atau kamar untuk sensasi kencan Teyvat setiap hari.",
        "variants": [
            {"id": "a-lyney", "name": "A. Lyney"},
            {"id": "a-lyney-idol", "name": "A. Lyney Idol"},
            {"id": "a-scara", "name": "A. Scara"},
            {"id": "a-childe", "name": "A. Childe"}
        ]
    },
    {
        "filename": "ARTPRINT_SALE_CHKN_MIHOYO BF.png",
        "name": "Art Print MiHoYo Boyfriend Series",
        "poli": "hsr",
        "category": "print",
        "price": 12000,
        "originalPrice": 15000,
        "artist_code": "CHKN",
        "size": "A5 (14.8 x 21 cm)",
        "desc": "Art print pria idaman MiHoYo (Aventurine & Childe) dengan visual memikat karya Dr. Chickenology.",
        "dosage": "Obat histeria fangirl/fanboy. Tatap saat lelah beraktivitas.",
        "variants": [
            {"id": "aventurine", "name": "Aventurine"},
            {"id": "childe", "name": "Childe"}
        ]
    },
    {
        "filename": "ARTPRINT_SALE_DNE_MIHOYO MC.png",
        "name": "Art Print MiHoYo Main Character Heroines",
        "poli": "hsr",
        "category": "print",
        "price": 12000,
        "originalPrice": 15000,
        "artist_code": "DNE",
        "size": "A5 (14.8 x 21 cm)",
        "desc": "Art print para MC wanita terpopuler MiHoYo (Stelle, Belle, Kiana, Lumine) karya Dr. Daniel & Tukangayyal.",
        "dosage": "Pajang di dinding ruang gacha untuk meningkatkan luck 5-star.",
        "variants": [
            {"id": "stelle", "name": "Stelle"},
            {"id": "belle", "name": "Belle"},
            {"id": "kiana", "name": "Kiana"},
            {"id": "lumine", "name": "Lumine"}
        ]
    },
    {
        "filename": "ARTPRINT_SALE_ENN_GAME FEMALEPOSTER.png",
        "name": "Art Print Game Female Heroines Poster",
        "poli": "anime",
        "category": "print",
        "price": 12000,
        "originalPrice": 15000,
        "artist_code": "ENN",
        "size": "A5 (14.8 x 21 cm)",
        "desc": "Poster art print premium para heroine game & anime terpopuler karya Dr. Ennvela.",
        "dosage": "Booster inspirasi harian. Cocok untuk frame dekorasi kamar wibu estetik.",
        "variants": [
            {"id": "yelan", "name": "Yelan"},
            {"id": "lumine", "name": "Lumine"},
            {"id": "ei-miko", "name": "Ei & Miko"},
            {"id": "ei-masak", "name": "Ei Masak"},
            {"id": "yor-pns", "name": "Yor PNS"},
            {"id": "black-swan", "name": "Black Swan"}
        ]
    },
    {
        "filename": "ARTPRINT_SALE_MERU_HSR.png",
        "name": "Art Print Honkai Star Rail Husbu Collection",
        "poli": "hsr",
        "category": "print",
        "price": 12000,
        "originalPrice": 15000,
        "artist_code": "MERU",
        "size": "A5 (14.8 x 21 cm)",
        "desc": "Art print pria tampan Astral Express (Dan Heng, Jing Yuan, Blade) versi reguler & topless karya Dr. Meru.",
        "dosage": "Dosis tinggi pemulihan stres kerjaan dan tugas kuliah.",
        "variants": [
            {"id": "dan-heng", "name": "Dan Heng"},
            {"id": "jing-yuan", "name": "Jing Yuan"},
            {"id": "blade", "name": "Blade"},
            {"id": "dan-heng-topless", "name": "Dan Heng (Topless)"},
            {"id": "jing-yuan-topless", "name": "Jing Yuan (Topless)"},
            {"id": "blade-topless", "name": "Blade (Topless)"}
        ]
    },
    {
        "filename": "DECACDE CARD_SALE_ENN_KAMEN RAIDER.png",
        "name": "Decade Ride Card Kamen Rider Collection",
        "poli": "kamen-rider",
        "category": "card",
        "price": 8000,
        "originalPrice": 10000,
        "artist_code": "ENN",
        "size": "8.6 x 5.9 cm Matte Card",
        "desc": "Kartu Kamen Rider Decade replika presisi dengan finishing doff tahan lama karya Dr. Ennvela.",
        "dosage": "Kamen Ride! Obat pemantik semangat transformasi diri saat rebahan.",
        "variants": None
    },
    {
        "filename": "KEYCHAIN_SALE_DNE_SUISEI.png",
        "name": "Acrylic Keychain Hoshimachi Suisei Expression",
        "poli": "vtuber",
        "category": "keychain",
        "price": 20000,
        "originalPrice": 25000,
        "artist_code": "DNE",
        "size": "6.5 x 6 cm Acrylic",
        "desc": "Gantungan kunci akrilik Hoshimachi Suisei dengan berbagai ekspresi ikonik karya Dr. Daniel & Tukangayyal.",
        "dosage": "Kaitkan di tas harian untuk menyebarkan pesona idola bintang Sui-chan.",
        "variants": [
            {"id": "s-sad", "name": "S. Sad"},
            {"id": "s-battle-axe", "name": "S. Battle Axe"},
            {"id": "s-smirk", "name": "S. Smirk"},
            {"id": "s-sparkle", "name": "S. Sparkle"},
            {"id": "s-wink", "name": "S. Wink"}
        ]
    },
    {
        "filename": "KEYCHAIN_SALE_DNE_VTUBER.png",
        "name": "Acrylic Keychain VTuber Hololive Series",
        "poli": "vtuber",
        "category": "keychain",
        "price": 20000,
        "originalPrice": 25000,
        "artist_code": "DNE",
        "size": "6.5 x 6 cm Acrylic",
        "desc": "Keychain akrilik karakter VTuber populer (Suisei, Zeta, Kobo) karya Dr. Daniel & Tukangayyal.",
        "dosage": "Bawa kemanapun untuk auto-parry serangan bad mood.",
        "variants": [
            {"id": "suisei-bisik", "name": "Suisei Bisik"},
            {"id": "suisei-maid", "name": "Suisei Maid"},
            {"id": "zeta-neko", "name": "Zeta Neko"},
            {"id": "s-peace-sign", "name": "S. Peace Sign"},
            {"id": "kobo", "name": "Kobo"},
            {"id": "z-peace-sign", "name": "Z. Peace Sign"}
        ]
    },
    {
        "filename": "PAS FOTO_SALE_ENN_GENHSIN.png",
        "fallback_filename": "PAS FOTO_ENN_GENHSIN.png",
        "name": "Pas Foto 3x4 Formal Teyvat Clinic ID",
        "poli": "genshin",
        "category": "pasphoto",
        "price": 8000,
        "originalPrice": 10000,
        "artist_code": "ENN",
        "size": "3 x 4 cm Set 4pcs",
        "desc": "Pas foto resmi ala kartu identitas warga Teyvat untuk melamar kerja di Klinik Halu Lagi Kah karya Dr. Ennvela.",
        "dosage": "Simpan di saku kemeja sebagai tanda pengenal resmi pasien wibu.",
        "variants": None
    },
    {
        "filename": "PHOTOCARD_SALE_AYD_GENSHIN BF.png",
        "name": "Photocard Genshin Boyfriend Series",
        "poli": "genshin",
        "category": "photocard",
        "price": 10000,
        "originalPrice": 13000,
        "artist_code": "AYD",
        "size": "5.5 x 9 cm (Glossy)",
        "desc": "Photocard pacar idaman Genshin Impact (Baizhu, Lyney, Childe) karya Dr. Ayada-san.",
        "dosage": "Selipkan di casing HP untuk senyuman penyemangat seharian.",
        "variants": [
            {"id": "baizhu", "name": "Baizhu"},
            {"id": "lyney", "name": "Lyney"},
            {"id": "childe", "name": "Childe"}
        ]
    },
    {
        "filename": "PHOTOCARD_SALE_AYD_GENSHIN DATE.png",
        "name": "Photocard Genshin Date Series",
        "poli": "genshin",
        "category": "photocard",
        "price": 10000,
        "originalPrice": 13000,
        "artist_code": "AYD",
        "size": "5.5 x 9 cm (Glossy)",
        "desc": "Photocard kencan romantis karakter Genshin (Gaming, Wanderer, Lyney, Baizhu) karya Dr. Ayada-san.",
        "dosage": "Tatap 5 menit sebelum tidur untuk mimpi indah bersama husbu tercinta.",
        "variants": [
            {"id": "gaming", "name": "Gaming"},
            {"id": "wanderer", "name": "Wanderer"},
            {"id": "lyney", "name": "Lyney"},
            {"id": "baizhu", "name": "Baizhu"}
        ]
    },
    {
        "filename": "PHOTOCARD_SALE_CHKN_GENSHIN MALE.png",
        "name": "Photocard Genshin Male Husbu Pack",
        "poli": "genshin",
        "category": "photocard",
        "price": 10000,
        "originalPrice": 13000,
        "artist_code": "CHKN",
        "size": "5.5 x 9 cm (Glossy)",
        "desc": "Photocard cowok tampan Teyvat (Venti, Wanderer, Childe, Ayato, Alhaitham) karya Dr. Chickenology.",
        "dosage": "Penyembuh depresi dan penenang overthinking akut.",
        "variants": [
            {"id": "venti", "name": "Venti"},
            {"id": "wanderer", "name": "Wanderer"},
            {"id": "childe", "name": "Childe"},
            {"id": "ayato", "name": "Ayato"},
            {"id": "alhaitham", "name": "Alhaitham"}
        ]
    },
    {
        "filename": "PHOTOCARD_SALE_CHKN_JUJUTSU KAISEN.png",
        "name": "Photocard Jujutsu Kaisen Sorcerers",
        "poli": "anime",
        "category": "photocard",
        "price": 10000,
        "originalPrice": 13000,
        "artist_code": "CHKN",
        "size": "5.5 x 9 cm (Glossy)",
        "desc": "Photocard penyihir Jujutsu Kaisen (Geto, Gojo, Choso) dengan visual tajam karya Dr. Chickenology.",
        "dosage": "Dosis pertolongan pertama pasca membaca bab manga terbaru.",
        "variants": [
            {"id": "geto", "name": "Geto"},
            {"id": "gojo", "name": "Gojo"},
            {"id": "choso", "name": "Choso"}
        ]
    },
    {
        "filename": "PHOTOCARD_SALE_ENN_KAMEN RAIDER.png",
        "name": "Photocard Kamen Rider Legend Series",
        "poli": "kamen-rider",
        "category": "photocard",
        "price": 8000,
        "originalPrice": 10000,
        "artist_code": "ENN",
        "size": "5.5 x 9 cm Glossy",
        "desc": "Photocard koleksi rider era Heisei & Reiwa dalam balutan visual artistik Dr. Ennvela.",
        "dosage": "Pembangkit jiwa ksatria pembela kebenaran.",
        "variants": None
    },
    {
        "filename": "PHOTOCARD_SALE_MERU_GENHSIN.png",
        "name": "Photocard Genshin Archons & MC Collection",
        "poli": "genshin",
        "category": "photocard",
        "price": 10000,
        "originalPrice": 13000,
        "artist_code": "MERU",
        "size": "5.5 x 9 cm (Glossy)",
        "desc": "Photocard para Archon & karakter utama Genshin Impact karya Dr. Meru.",
        "dosage": "Dosis harian penghormatan kepada para dewa Teyvat.",
        "variants": [
            {"id": "wanderer", "name": "Wanderer"},
            {"id": "venti", "name": "Venti"},
            {"id": "mc-genshin", "name": "MC Genshin"},
            {"id": "zhongli", "name": "Zhongli"},
            {"id": "ei", "name": "Ei"},
            {"id": "nahida", "name": "Nahida"}
        ]
    },
    {
        "filename": "PHOTOCARD_SALE_RD_ANEMO BOYS.png",
        "name": "Photocard Anemo Boys Boyband Series",
        "poli": "genshin",
        "category": "photocard",
        "price": 10000,
        "originalPrice": 13000,
        "artist_code": "RD",
        "size": "5.5 x 9 cm",
        "desc": "Photocard formasi boyband 6 Anemo Boys (Heizou, Wanderer, Kazuha, Xiao, Aether, Venti) karya Dr. Red Dinoo.",
        "dosage": "Obat histeria fangirl dosis tinggi. Cukup 1 lembar per hari.",
        "variants": [
            {"id": "heizou", "name": "Heizou"},
            {"id": "wanderer", "name": "Wanderer"},
            {"id": "kazuha", "name": "Kazuha"},
            {"id": "xiao", "name": "Xiao"},
            {"id": "aether", "name": "Aether"},
            {"id": "venti", "name": "Venti"}
        ]
    },
    {
        "filename": "PHOTOCARD_SALE_RD_GENSHIN MALE.png",
        "name": "Photocard Genshin Male Lineup",
        "poli": "genshin",
        "category": "photocard",
        "price": 10000,
        "originalPrice": 13000,
        "artist_code": "RD",
        "size": "5.5 x 9 cm",
        "desc": "Photocard karakter pria idaman Teyvat (Kaeya, Diluc, Childe, Zhongli, Wriothesley, Neuvillette) karya Dr. Red Dinoo.",
        "dosage": "Koleksi lengkap untuk booster energi harian.",
        "variants": [
            {"id": "kaeya", "name": "Kaeya"},
            {"id": "diluc", "name": "Diluc"},
            {"id": "childe", "name": "Childe"},
            {"id": "zhongli", "name": "Zhongli"},
            {"id": "wriothesley", "name": "Wriothesley"},
            {"id": "neuvillette", "name": "Neuvillette"}
        ]
    },
    {
        "filename": "PHOTOCARD_SALE_TSN_GENSHIN CHAIR.png",
        "name": "Photocard Genshin Sitting Chair Series",
        "poli": "genshin",
        "category": "photocard",
        "price": 10000,
        "originalPrice": 13000,
        "artist_code": "TSN",
        "size": "5.5 x 9 cm",
        "desc": "Photocard pose duduk santai berkarisma karakter Genshin Impact karya Dr. Tesanu.",
        "dosage": "Kagumi keanggunan karakter Teyvat di kala lelah beraktivitas.",
        "variants": [
            {"id": "wriothesley", "name": "Wriothesley"},
            {"id": "wanderer", "name": "Wanderer"},
            {"id": "diluc", "name": "Diluc"},
            {"id": "alhaitham", "name": "Alhaitham"},
            {"id": "xiao", "name": "Xiao"}
        ]
    },
    {
        "filename": "PICK_SALE_ENN_BOCCHI TR.png",
        "name": "Guitar Pick Bocchi The Rock! Special",
        "poli": "anime",
        "category": "pick",
        "price": 5000,
        "originalPrice": 8000,
        "artist_code": "ENN",
        "size": "Standard Guitar Pick (0.71mm)",
        "desc": "Pick gitar koleksi edisi Kessoku Band (Bocchi The Rock!) dengan artwork estetik karya Dr. Ennvela.",
        "dosage": "Pegang saat overthinking atau main gitar untuk memanggil jiwa Kessoku Band.",
        "variants": [
            {"id": "kita", "name": "Kita"},
            {"id": "nijika", "name": "Nijika"},
            {"id": "ryo", "name": "Ryo"},
            {"id": "bocchi", "name": "Bocchi"},
            {"id": "bocchi-segitiga", "name": "Bocchi Segitiga"}
        ]
    },
    {
        "filename": "PIN_SALE_AYD_GAME MC.png",
        "name": "Can Badge Pin Game Heroines MC",
        "poli": "anime",
        "category": "pin",
        "price": 8000,
        "originalPrice": 10000,
        "artist_code": "AYD",
        "size": "58mm Matte Can Badge",
        "desc": "Pin kaleng can badge karakter protagonis game (Furina, Lumine, Miku, Firefly, Amiya) karya Dr. Ayada-san.",
        "dosage": "Sematkan di pouch/tas untuk mengklaim aura Main Character.",
        "variants": [
            {"id": "furina", "name": "Furina"},
            {"id": "lumine", "name": "Lumine"},
            {"id": "miku", "name": "Miku"},
            {"id": "firefly", "name": "Firefly"},
            {"id": "amiya", "name": "Amiya"}
        ]
    },
    {
        "filename": "PIN_SALE_ENN_UMAMUSUME.png",
        "name": "Can Badge Pin Uma Musume Meme Expressions",
        "poli": "anime",
        "category": "pin",
        "price": 8000,
        "originalPrice": 10000,
        "artist_code": "ENN",
        "size": "58mm Matte Can Badge",
        "desc": "Pin can badge Uma Musume ekspresi kocak lokal (Gas, Cihuy, Waduh, Turu, Malas) karya Dr. Ennvela.",
        "dosage": "Sematkan di tas agar larimu kencang menuju masa depan cerah.",
        "variants": [
            {"id": "gas", "name": "Gas"},
            {"id": "cihuy", "name": "Cihuy"},
            {"id": "waduh", "name": "Waduh"},
            {"id": "turu", "name": "Turu"},
            {"id": "malas", "name": "Malas"}
        ]
    },
    {
        "filename": "PIN_SALE_MERU_GENSHIN MALE.png",
        "name": "Can Badge Pin Genshin & HSR Male Stars",
        "poli": "genshin",
        "category": "pin",
        "price": 8000,
        "originalPrice": 10000,
        "artist_code": "MERU",
        "size": "58mm Matte Pin",
        "desc": "Pin bulat 10 karakter cowok Genshin Impact & Honkai Star Rail karya Dr. Meru.",
        "dosage": "Koleksi pin estetik untuk tas itabag kebanggaan.",
        "variants": [
            {"id": "xiao", "name": "Xiao"},
            {"id": "aether", "name": "Aether"},
            {"id": "kazuha", "name": "Kazuha"},
            {"id": "venti", "name": "Venti"},
            {"id": "wanderer", "name": "Wanderer"},
            {"id": "aventurine", "name": "Aventurine"},
            {"id": "dr-ratio", "name": "Dr. Ratio"},
            {"id": "gepard", "name": "Gepard"},
            {"id": "misha", "name": "Misha"},
            {"id": "sampo", "name": "Sampo"}
        ]
    },
    {
        "filename": "STICKER_SALE_AYD_AOV.png",
        "name": "Sticker Chibi Pack Arena of Valor",
        "poli": "aov",
        "category": "sticker",
        "price": 5000,
        "originalPrice": 8000,
        "artist_code": "AYD",
        "size": "7 x 7 cm Vinyl",
        "desc": "Stiker chibi karakter AoV favorit karya Dr. Ayada-san. Tahan air & anti gores.",
        "dosage": "Tempel di hp/casing untuk buff winrate ranked bintang 5.",
        "variants": None
    },
    {
        "filename": "STICKER_SALE_AYD_GENSHIN.png",
        "name": "Sticker Die-Cut Chibi Genshin Impact",
        "poli": "genshin",
        "category": "sticker",
        "price": 5000,
        "originalPrice": 8000,
        "artist_code": "AYD",
        "size": "7 x 7 cm Vinyl",
        "desc": "Stiker die-cut chibi karakter Genshin Impact karya Dr. Ayada-san.",
        "dosage": "Tempel di laptop/tablet untuk menyuntikkan energi keceriaan Teyvat.",
        "variants": None
    },
    {
        "filename": "STICKER_SALE_DNE_MIHOYO.png",
        "name": "Sticker Set MiHoYo Universes",
        "poli": "hsr",
        "category": "sticker",
        "price": 5000,
        "originalPrice": 8000,
        "artist_code": "DNE",
        "size": "7 x 7 cm Vinyl",
        "desc": "Stiker karakter MiHoYo semesta Genshin, HSR, & ZZZ karya Dr. Daniel & Tukangayyal.",
        "dosage": "Pelindung gadget dari goresan dengan visual pop urban.",
        "variants": None
    },
    {
        "filename": "STICKER_SALE_DNE_SUISEI.png",
        "name": "Sticker Die-Cut Hoshimachi Suisei Expressions",
        "poli": "vtuber",
        "category": "sticker",
        "price": 5000,
        "originalPrice": 8000,
        "artist_code": "DNE",
        "size": "7 x 7 cm Hologram Vinyl",
        "desc": "Stiker die-cut Suisei berbagai pose dan ekspresi karya Dr. Daniel & Tukangayyal.",
        "dosage": "Pandangi saat mendengarkan Stellar Stellar untuk pemulihan jiwa 100%.",
        "variants": [
            {"id": "s-wink", "name": "S. Wink"},
            {"id": "s-smirk", "name": "S. Smirk"},
            {"id": "s-sad", "name": "S. Sad"},
            {"id": "s-battle-axe", "name": "S. Battle Axe"},
            {"id": "s-sparkle", "name": "S. Sparkle"}
        ]
    },
    {
        "filename": "STICKER_SALE_RD_CYNONARI.png",
        "name": "Sticker Die-Cut Cyno & Tighnari Cynonari",
        "poli": "genshin",
        "category": "sticker",
        "price": 5000,
        "originalPrice": 8000,
        "artist_code": "RD",
        "size": "7 x 7 cm Vinyl",
        "desc": "Stiker kombo duo Sumeru Cyno & Tighnari karya Dr. Red Dinoo dengan chemistry tak tertandingi.",
        "dosage": "Pencegah lelucon garing Cyno berulang kali.",
        "variants": [
            {"id": "cyno-cabe-merah", "name": "Cyno Cabe Merah"},
            {"id": "tighnari-cabe-hijau", "name": "Tighnari Cabe Hijau"},
            {"id": "cyno-jelek", "name": "Cyno Jelek"},
            {"id": "tighnari-jelek", "name": "Tighnari Jelek"}
        ]
    },
    {
        "filename": "STICKER_SALE_RD_SUMERU BARBIE.png",
        "name": "Sticker Sumeru Barbie Edition",
        "poli": "genshin",
        "category": "sticker",
        "price": 5000,
        "originalPrice": 8000,
        "artist_code": "RD",
        "size": "7 x 7 cm Vinyl",
        "desc": "Stiker parodi Sumeru Barbie (Alhaitham, Kaveh, Cyno, Tighnari) karya Dr. Red Dinoo. Sangat ikonik!",
        "dosage": "Tempel di binder/laptop untuk menyuntikkan energi humor ke tugas kantor.",
        "variants": [
            {"id": "barbie-kaveh", "name": "Barbie Kaveh"},
            {"id": "barbie-alhaitham", "name": "Barbie Alhaitham"},
            {"id": "barbie-cyno", "name": "Barbie Cyno"},
            {"id": "barbie-tighnari", "name": "Barbie Tighnari"}
        ]
    },
    {
        "filename": "STICKER_SALE_RD_WRIOTHESLEY.png",
        "name": "Sticker Die-Cut Wriothesley Duke Teh",
        "poli": "genshin",
        "category": "sticker",
        "price": 5000,
        "originalPrice": 8000,
        "artist_code": "RD",
        "size": "7 x 7 cm Vinyl",
        "desc": "Stiker sang Duke Meropide Wriothesley dalam aneka momen minum teh & Sigewinne karya Dr. Red Dinoo.",
        "dosage": "Obat dingin untuk mendinginkan kepala yang panas akibat gacha ampas.",
        "variants": [
            {"id": "wriothesley-teh-asu", "name": "Wriothesley Teh Asu"},
            {"id": "wriothesley-sigewinne", "name": "Wriothesley Sigewinne"},
            {"id": "wriothesley-teh-besar", "name": "Wriothesley Teh Besar"},
            {"id": "wriothesley-teh-infus", "name": "Wriothesley Teh Infus"},
            {"id": "wriothesley-teh-cekek", "name": "Wriothesley Teh Cekek"}
        ]
    },
    {
        "filename": "STICKER_SALE_TSN_KUCING JELEK.png",
        "name": "Sticker Die-Cut Kucing Jelek Tapi Sayang",
        "poli": "original",
        "category": "sticker",
        "price": 5000,
        "originalPrice": 8000,
        "artist_code": "TSN",
        "size": "6 x 6 cm Vinyl",
        "desc": "Stiker kucing ekspresi kocak absurd dan tingkah konyol karya Dr. Tesanu. Paling dicari pecinta anabul!",
        "dosage": "Lihat wajah kucing ini selama 3 detik untuk melenyapkan amarah seharian.",
        "variants": [
            {"id": "k-item", "name": "K. Item"},
            {"id": "k-sapi", "name": "K. Sapi"},
            {"id": "k-pipop", "name": "K. Pipop"},
            {"id": "k-jalan", "name": "K. Jalan"},
            {"id": "k-loading", "name": "K. Loading"},
            {"id": "k-turu", "name": "K. Turu"},
            {"id": "k-hah", "name": "K. Hah"},
            {"id": "k-bontot", "name": "K. Bontot"}
        ]
    }
]

# Step 1: Process and save WebP images from Zip
products_output = []
saved_images = set()

with zipfile.ZipFile(ZIP_PATH, 'r') as z:
    zip_names = {os.path.basename(info.filename): info for info in z.infolist()}
    
    for idx, spec in enumerate(PRODUCTS_SPEC):
        fname = spec["filename"]
        target_info = zip_names.get(fname)
        if not target_info and "fallback_filename" in spec:
            target_info = zip_names.get(spec["fallback_filename"])
            
        if not target_info:
            print(f"WARNING: File {fname} not found in zip!")
            continue
            
        slug_filename = clean_slug(fname)
        dest_path = os.path.join(DEST_DIR, slug_filename)
        
        # Save image as optimized WebP
        with z.open(target_info) as src_file:
            with Image.open(src_file) as img:
                if img.mode in ('P', 'PA'):
                    img = img.convert('RGBA')
                elif img.mode not in ('RGB', 'RGBA', 'L', 'LA'):
                    img = img.convert('RGBA')
                if max(img.size) > 1000:
                    ratio = 1000 / float(max(img.size))
                    img = img.resize((int(img.size[0] * ratio), int(img.size[1] * ratio)), Image.Resampling.LANCZOS)
                img.save(dest_path, 'WEBP', quality=90, method=4)
                saved_images.add(slug_filename)
                
        raw_base = os.path.splitext(fname)[0]
        slug_id = "hlk-" + re.sub(r'[^a-zA-Z0-9]+', '-', raw_base.lower()).strip('-')
        artist_name = ARTIST_MAP.get(spec["artist_code"], spec["artist_code"])
        
        prod = {
            "id": slug_id,
            "name": spec["name"],
            "poli": spec["poli"],
            "category": spec["category"],
            "price": spec["price"],
            "originalPrice": spec["originalPrice"],
            "image": f"/images/catalog/items/{slug_filename}",
            "artist": artist_name,
            "isClearance": True,
            "isLimited": True,
            "description": spec["desc"],
            "size": spec["size"],
            "badge": "CLEARANCE SALE",
            "dosage": spec["dosage"],
            "barcode": f"4 901234 {560000 + idx + 1}",
            "shelfTag": "Clearance",
            "shelfSub": f"Dr. {artist_name}",
            "shelfCode": slug_id,
            "visualType": spec["category"]
        }
        if spec["variants"]:
            prod["variants"] = spec["variants"]
            
        products_output.append(prod)

# Step 2: Clean up any extra files in public/images/catalog/items
existing_files = os.listdir(DEST_DIR)
for f in existing_files:
    if f not in saved_images:
        os.remove(os.path.join(DEST_DIR, f))
        print(f"Deleted old unused item image: {f}")

print(f"Total processed products: {len(products_output)}")
print(f"Total images in {DEST_DIR}: {len(os.listdir(DEST_DIR))}")

# Step 3: Generate src/data/products.ts
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

export const PRODUCTS: Product[] = """

full_ts = ts_code + json.dumps(products_output, indent=2, ensure_ascii=False) + ";\n"

with open("src/data/products.ts", "w", encoding="utf-8") as f:
    f.write(full_ts)

print("Successfully updated src/data/products.ts with 30 products.")
