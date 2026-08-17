import os
import sys
import glob
from PIL import Image
from concurrent.futures import ThreadPoolExecutor

# Force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

def optimize_file(png_path, max_dim, quality):
    webp_path = os.path.splitext(png_path)[0] + ".webp"
    orig_size = os.path.getsize(png_path)
    try:
        with Image.open(png_path) as img:
            if img.mode in ('P', 'PA'):
                img = img.convert('RGBA')
            elif img.mode not in ('RGB', 'RGBA', 'L', 'LA'):
                img = img.convert('RGBA')

            if max_dim:
                w, h = img.size
                if max(w, h) > max_dim:
                    ratio = max_dim / float(max(w, h))
                    new_size = (int(w * ratio), int(h * ratio))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)

            img.save(webp_path, 'WEBP', quality=quality, method=4)
        
        new_size = os.path.getsize(webp_path)
        os.remove(png_path)
        savings = (1 - (new_size / orig_size)) * 100
        print(f"[OK] {os.path.basename(png_path)}: {orig_size / 1024:.1f}KB -> {new_size / 1024:.1f}KB ({savings:.1f}% saved)", flush=True)
        return orig_size, new_size
    except Exception as e:
        print(f"[ERROR] Failed {png_path}: {e}", flush=True)
        return 0, 0

def main():
    base_dir = os.path.join("public", "images", "catalog")
    items_dir = os.path.join(base_dir, "items")
    pages_dir = os.path.join(base_dir, "pages")

    item_pngs = glob.glob(os.path.join(items_dir, "*.png"))
    page_pngs = glob.glob(os.path.join(pages_dir, "*.png"))

    total_orig = 0
    total_new = 0

    print(f"Starting parallel optimization of {len(item_pngs)} item images and {len(page_pngs)} page images...", flush=True)

    with ThreadPoolExecutor(max_workers=4) as executor:
        item_futures = [executor.submit(optimize_file, p, 900, 88) for p in item_pngs]
        page_futures = [executor.submit(optimize_file, p, 1600, 85) for p in page_pngs]

        for f in item_futures + page_futures:
            orig, new = f.result()
            total_orig += orig
            total_new += new

    print("\n==========================================", flush=True)
    print("Optimization Batch Finished!", flush=True)
    print(f"Original Batch Size:  {total_orig / (1024 * 1024):.2f} MB", flush=True)
    print(f"Optimized Batch Size: {total_new / (1024 * 1024):.2f} MB", flush=True)
    if total_orig > 0:
        print(f"Batch Savings:        {(1 - (total_new / total_orig)) * 100:.1f}% reduction", flush=True)
    print("==========================================", flush=True)

if __name__ == "__main__":
    main()
