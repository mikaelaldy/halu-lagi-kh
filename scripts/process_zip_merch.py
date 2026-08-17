import zipfile
import os
import re
import json

from PIL import Image

ZIP_PATH = "Daftar produk halu lagi kh.zip"
DEST_DIR = "public/images/catalog/items"

os.makedirs(DEST_DIR, exist_ok=True)

ARTISTS = ["RD", "AYD", "ENN", "CHKN", "TSN", "LUKI", "DNE", "MERU"]

def clean_slug(name):
    name_no_ext = os.path.splitext(name)[0]
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', name_no_ext.lower()).strip('-')
    return slug + ".webp"

products_meta = []

with zipfile.ZipFile(ZIP_PATH, 'r') as z:
    for info in z.infolist():
        filename = os.path.basename(info.filename)
        if not filename.lower().endswith('.png'):
            continue
        
        # Determine clean filename
        slug_filename = clean_slug(filename)
        dest_path = os.path.join(DEST_DIR, slug_filename)
        
        # Extract and convert to WebP
        with z.open(info) as src_file:
            with Image.open(src_file) as img:
                if img.mode in ('P', 'PA'):
                    img = img.convert('RGBA')
                elif img.mode not in ('RGB', 'RGBA', 'L', 'LA'):
                    img = img.convert('RGBA')
                if max(img.size) > 900:
                    ratio = 900 / float(max(img.size))
                    img = img.resize((int(img.size[0] * ratio), int(img.size[1] * ratio)), Image.Resampling.LANCZOS)
                img.save(dest_path, 'WEBP', quality=88, method=4)
        
        # Parse metadata
        raw_base = os.path.splitext(filename)[0]
        parts = raw_base.split('_')
        
        # Detect is_clearance / sale
        is_clearance = 'SALE' in [p.upper() for p in parts]
        
        # Detect category
        raw_cat = parts[0].upper()
        category = 'card'
        if 'PHOTO' in raw_cat:
            category = 'photocard'
        elif 'PRINT' in raw_cat:
            category = 'print'
        elif 'STICK' in raw_cat:
            category = 'sticker'
        elif 'KEY' in raw_cat:
            category = 'keychain'
        elif 'PIN' in raw_cat:
            category = 'pin'
        elif 'TICKET' in raw_cat:
            category = 'ticket'
        elif 'PICK' in raw_cat:
            category = 'pick'
        elif 'PAS' in raw_cat:
            category = 'pasphoto'
        elif 'POLAR' in raw_cat:
            category = 'polaroid'
        elif 'DEC' in raw_cat:
            category = 'card'
            
        # Detect artist
        artist = None
        for a in ARTISTS:
            if a in [p.upper() for p in parts]:
                artist = a
                break
        if not artist:
            for p in parts:
                if p.upper() in ARTISTS:
                    artist = p.upper()
                    break

        title_parts = []
        for p in parts:
            p_up = p.upper()
            if p_up == raw_cat or p_up == 'SALE' or p_up == (artist or ''):
                continue
            title_parts.append(p)
        title_raw = " ".join(title_parts).strip()
        
        raw_upper = raw_base.upper()
        
        poli = 'anime'
        if any(k in raw_upper for k in ['GENSHIN', 'GENHSIN', 'ANEMO', 'SUMERU', 'CYNONARI', 'WRIOTHESLEY']):
            poli = 'genshin'
        elif 'HSR' in raw_upper:
            poli = 'hsr'
        elif 'ZZZ' in raw_upper or 'BANGABOO' in raw_upper:
            poli = 'zzz'
        elif 'WUWA' in raw_upper:
            poli = 'wuwa'
        elif any(k in raw_upper for k in ['KAMEN', 'RAIDER', 'RIDER']):
            poli = 'kamen-rider'
        elif 'AOV' in raw_upper:
            poli = 'aov'
        elif any(k in raw_upper for k in ['SUISEI', 'VTUBER']):
            poli = 'vtuber'
        elif any(k in raw_upper for k in ['IKAN', 'KUCING', 'MIE AYAM']):
            poli = 'original'
        elif 'MIHOYO' in raw_upper:
            poli = 'genshin'
        
        price = 10000
        if category == 'print':
            price = 12000
        elif category == 'sticker':
            price = 5000
        elif category == 'keychain':
            price = 20000
        elif category == 'pin':
            price = 8000
        elif category == 'photocard':
            price = 10000
        elif category == 'pasphoto':
            price = 8000
        elif category == 'ticket':
            price = 8000
        elif category == 'pick':
            price = 5000
        elif category == 'polaroid':
            price = 8000
        elif category == 'card':
            price = 8000
            
        slug_id = "hlk-" + re.sub(r'[^a-zA-Z0-9]+', '-', raw_base.lower()).strip('-')
        
        products_meta.append({
            "id": slug_id,
            "raw_filename": filename,
            "image": f"/images/catalog/items/{slug_filename}",
            "artist": artist,
            "isClearance": is_clearance,
            "category": category,
            "poli": poli,
            "title_raw": title_raw,
            "price": price,
            "raw_base": raw_base
        })

print(f"Extracted and parsed {len(products_meta)} products.")
with open("scripts/extracted_products.json", "w", encoding="utf-8") as f:
    json.dump(products_meta, f, indent=2, ensure_ascii=False)
