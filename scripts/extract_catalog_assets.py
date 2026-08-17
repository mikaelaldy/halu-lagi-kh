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
        page_filename = f"page-{page_num}.webp"
        page_filepath = os.path.join(output_pages_dir, page_filename)
        # Convert pixmap to PIL and save as webp
        mode = "RGBA" if pix.alpha else "RGB"
        img = Image.frombytes(mode, [pix.width, pix.height], pix.samples)
        if max(pix.width, pix.height) > 1600:
            ratio = 1600 / float(max(pix.width, pix.height))
            img = img.resize((int(pix.width * ratio), int(pix.height * ratio)), Image.Resampling.LANCZOS)
        img.save(page_filepath, 'WEBP', quality=85, method=4)
        print(f"Saved: {page_filepath} ({img.size[0]}x{img.size[1]})")

    # Define smart crops for individual products from key pages
    crops_config = [
        {"name": "aov-sticker-group.webp", "page": 2, "box": (0.15, 0.20, 0.85, 0.76)},
        {"name": "genshin-print-a5.webp", "page": 3, "box": (0.43, 0.21, 0.95, 0.74)},
        {"name": "genshin-print-custom.webp", "page": 3, "box": (0.05, 0.35, 0.43, 0.65)},
        {"name": "hsr-print-a5.webp", "page": 4, "box": (0.22, 0.26, 0.78, 0.73)},
        {"name": "genshin-print-back.webp", "page": 5, "box": (0.15, 0.27, 0.85, 0.72)},
        {"name": "genshin-print-waifu.webp", "page": 6, "box": (0.28, 0.24, 0.80, 0.74)},
        {"name": "genshin-photocard-group.webp", "page": 7, "box": (0.25, 0.20, 0.92, 0.76)},
        {"name": "genshin-photocard-gacha.webp", "page": 8, "box": (0.27, 0.25, 0.88, 0.69)},
        {"name": "genshin-sticker-7x7.webp", "page": 9, "box": (0.20, 0.21, 0.88, 0.75)},
        {"name": "genshin-sticker-5x7.webp", "page": 10, "box": (0.20, 0.20, 0.88, 0.42)},
        {"name": "genshin-sticker-kisscut.webp", "page": 10, "box": (0.15, 0.42, 0.88, 0.74)},
        {"name": "hsr-sticker-5x5.webp", "page": 11, "box": (0.22, 0.27, 0.78, 0.66)},
        {"name": "genshin-sticker-5x5.webp", "page": 12, "box": (0.20, 0.27, 0.85, 0.71)},
        {"name": "genshin-pas-photo.webp", "page": 13, "box": (0.20, 0.21, 0.95, 0.46)},
        {"name": "genshin-keychain-6x5.webp", "page": 13, "box": (0.30, 0.48, 0.85, 0.73)},
        {"name": "kamen-decade-cards.webp", "page": 14, "box": (0.22, 0.29, 0.95, 0.61)},
        {"name": "kamen-photocards.webp", "page": 15, "box": (0.15, 0.31, 0.92, 0.65)},
        {"name": "spy-print-yor.webp", "page": 16, "box": (0.30, 0.27, 0.72, 0.68)},
    ]

    for crop_info in crops_config:
        page_img_path = os.path.join(output_pages_dir, f"page-{crop_info['page']}.webp")
        if os.path.exists(page_img_path):
            img = Image.open(page_img_path)
            w, h = img.size
            l, t, r, b = crop_info["box"]
            crop_box = (int(l * w), int(t * h), int(r * w), int(b * h))
            cropped = img.crop(crop_box)
            if max(cropped.size) > 900:
                ratio = 900 / float(max(cropped.size))
                cropped = cropped.resize((int(cropped.size[0] * ratio), int(cropped.size[1] * ratio)), Image.Resampling.LANCZOS)
            out_file = os.path.join(output_crops_dir, crop_info["name"])
            cropped.save(out_file, 'WEBP', quality=88, method=4)
            print(f"Generated crop: {out_file} ({cropped.size[0]}x{cropped.size[1]})")

    print("\nAll assets extracted successfully!")

if __name__ == "__main__":
    main()
