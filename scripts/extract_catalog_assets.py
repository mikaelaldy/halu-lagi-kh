import fitz  # PyMuPDF
import os
from PIL import Image

def main():
    pdf_path = "daftar barang Halu Lagi Kah.pdf"
    if not os.path.exists(pdf_path):
        print(f"Error: {pdf_path} not found")
        return

    output_pages_dir = os.path.join("public", "images", "catalog", "pages")
    output_crops_dir = os.path.join("public", "images", "catalog", "items")
    os.makedirs(output_pages_dir, exist_ok=True)
    os.makedirs(output_crops_dir, exist_ok=True)

    doc = fitz.open(pdf_path)
    print(f"Opened PDF with {len(doc)} pages.")

    # Render each page to high-res PNG (2.0 zoom = ~300 DPI equivalent)
    zoom = 2.0
    mat = fitz.Matrix(zoom, zoom)

    for i in range(len(doc)):
        page_num = i + 1
        page = doc[i]
        pix = page.get_pixmap(matrix=mat, alpha=False)
        page_filename = f"page-{page_num}.png"
        page_filepath = os.path.join(output_pages_dir, page_filename)
        pix.save(page_filepath)
        print(f"Saved: {page_filepath} ({pix.width}x{pix.height})")

    # Define smart crops for individual products from key pages
    # Coordinates are in ratios: (left_ratio, top_ratio, right_ratio, bottom_ratio)
    crops_config = [
        # Page 2: Arena of Valor Sticker
        {"name": "aov-sticker-group.png", "page": 2, "box": (0.15, 0.20, 0.85, 0.76)},
        # Page 3: Genshin Art Print A5
        {"name": "genshin-print-a5.png", "page": 3, "box": (0.43, 0.21, 0.95, 0.74)},
        # Page 3: Genshin Art Print Custom Size (Kokomi & Venti)
        {"name": "genshin-print-custom.png", "page": 3, "box": (0.05, 0.35, 0.43, 0.65)},
        # Page 4: HSR Art Print A5 (Blade & Jing Yuan)
        {"name": "hsr-print-a5.png", "page": 4, "box": (0.22, 0.26, 0.78, 0.73)},
        # Page 5: Genshin Art Print A5 Husbu Back view
        {"name": "genshin-print-back.png", "page": 5, "box": (0.15, 0.27, 0.85, 0.72)},
        # Page 6: Genshin Art Print A5 Waifu Series
        {"name": "genshin-print-waifu.png", "page": 6, "box": (0.28, 0.24, 0.80, 0.74)},
        # Page 7: Genshin Photocard 5.5x9cm (20 cards)
        {"name": "genshin-photocard-group.png", "page": 7, "box": (0.25, 0.20, 0.92, 0.76)},
        # Page 8: Genshin Photocard Gacha (6 cards)
        {"name": "genshin-photocard-gacha.png", "page": 8, "box": (0.27, 0.25, 0.88, 0.69)},
        # Page 9: Genshin Sticker 7x7cm Chibi (16 stickers)
        {"name": "genshin-sticker-7x7.png", "page": 9, "box": (0.20, 0.21, 0.88, 0.75)},
        # Page 10: Genshin Sticker 5x7cm Chibi
        {"name": "genshin-sticker-5x7.png", "page": 10, "box": (0.20, 0.20, 0.88, 0.42)},
        # Page 10: Genshin Sticker A5 Kisscut
        {"name": "genshin-sticker-kisscut.png", "page": 10, "box": (0.15, 0.42, 0.88, 0.74)},
        # Page 11: HSR Sticker 5x5cm (March 7th & Stelle)
        {"name": "hsr-sticker-5x5.png", "page": 11, "box": (0.22, 0.27, 0.78, 0.66)},
        # Page 12: Genshin Sticker 5x5cm Chibi (Kaveh, Alhaitham, Kirara, Klee, Yelan)
        {"name": "genshin-sticker-5x5.png", "page": 12, "box": (0.20, 0.27, 0.85, 0.71)},
        # Page 13: Genshin Pas Photo 3x4cm (27 photos)
        {"name": "genshin-pas-photo.png", "page": 13, "box": (0.20, 0.21, 0.95, 0.46)},
        # Page 13: Genshin Keychain 6x5cm (Alhaitham, Klee, Kirara)
        {"name": "genshin-keychain-6x5.png", "page": 13, "box": (0.30, 0.48, 0.85, 0.73)},
        # Page 14: Kamen Rider Decade Cards 8.4x5.8cm
        {"name": "kamen-decade-cards.png", "page": 14, "box": (0.22, 0.29, 0.95, 0.61)},
        # Page 15: Kamen Rider Gijinka Photocards 5.5x9cm
        {"name": "kamen-photocards.png", "page": 15, "box": (0.15, 0.31, 0.92, 0.65)},
        # Page 16: Spy x Family Art Print A5 (Yor Forger)
        {"name": "spy-print-yor.png", "page": 16, "box": (0.30, 0.27, 0.72, 0.68)},
    ]

    for crop_info in crops_config:
        page_idx = crop_info["page"] - 1
        page_img_path = os.path.join(output_pages_dir, f"page-{crop_info['page']}.png")
        if os.path.exists(page_img_path):
            img = Image.open(page_img_path)
            w, h = img.size
            l, t, r, b = crop_info["box"]
            crop_box = (int(l * w), int(t * h), int(r * w), int(b * h))
            cropped = img.crop(crop_box)
            out_file = os.path.join(output_crops_dir, crop_info["name"])
            cropped.save(out_file)
            print(f"Generated crop: {out_file} ({cropped.size[0]}x{cropped.size[1]})")

    print("\nAll assets extracted successfully!")

if __name__ == "__main__":
    main()
