import os
import re
from PIL import Image

SRC_DIR = "scripts/gdrive_new_images"
DEST_DIR = "public/images/catalog/items"

def clean_slug(name):
    name_no_ext = os.path.splitext(name)[0]
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', name_no_ext.lower()).strip('-')
    return slug + ".webp"

# Clear existing items
for f in os.listdir(DEST_DIR):
    os.remove(os.path.join(DEST_DIR, f))
    print(f"Removed old: {f}")

# Convert new Google Drive images to WebP
count = 0
for fname in sorted(os.listdir(SRC_DIR)):
    if not fname.lower().endswith('.png'):
        continue
    
    src_path = os.path.join(SRC_DIR, fname)
    slug = clean_slug(fname)
    dest_path = os.path.join(DEST_DIR, slug)
    
    with Image.open(src_path) as img:
        if img.mode in ('P', 'PA'):
            img = img.convert('RGBA')
        elif img.mode not in ('RGB', 'RGBA', 'L', 'LA'):
            img = img.convert('RGBA')
        if max(img.size) > 1000:
            ratio = 1000 / float(max(img.size))
            img = img.resize((int(img.size[0] * ratio), int(img.size[1] * ratio)), Image.Resampling.LANCZOS)
        img.save(dest_path, 'WEBP', quality=90, method=4)
    
    count += 1
    print(f"Converted: {fname} -> {slug} ({img.size[0]}x{img.size[1]})")

print(f"\nDone! Converted {count} new labeled images from Google Drive.")
print(f"Total files in {DEST_DIR}: {len(os.listdir(DEST_DIR))}")
