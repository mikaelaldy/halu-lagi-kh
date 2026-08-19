import os
import zipfile

ZIP_PATH = "Daftar produk halu lagi kh.zip"
SCRATCH_DIR = "scripts/scratch_sale_inspect"
os.makedirs(SCRATCH_DIR, exist_ok=True)

html_lines = [
    "<!DOCTYPE html>",
    "<html><head><title>30 SALE Images</title>",
    "<style>",
    "body { background: #1a1a1a; color: #fff; font-family: -apple-system, sans-serif; padding: 20px; }",
    ".grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 24px; }",
    ".card { background: #2a2a2a; border-radius: 12px; padding: 16px; border: 1px solid #444; }",
    ".card img { width: 100%; height: auto; background: repeating-conic-gradient(#333 0% 25%, #222 0% 50%) 50% / 20px 20px; border-radius: 8px; }",
    "h3 { font-size: 14px; word-break: break-all; margin-top: 0; color: #f6c358; }",
    "</style></head><body>",
    "<h1>30 SALE Merchandise Images & Variants</h1>",
    "<div class='grid'>"
]

with zipfile.ZipFile(ZIP_PATH, 'r') as z:
    for info in z.infolist():
        fname = info.filename
        if '_SALE_' in fname and fname.lower().endswith('.png'):
            base = os.path.basename(fname)
            out_file = os.path.join(SCRATCH_DIR, base)
            with z.open(info) as src, open(out_file, 'wb') as dst:
                dst.write(src.read())
            html_lines.append(f"<div class='card'><h3>{base}</h3><img src='{base}' /></div>")

html_lines.append("</div></body></html>")

with open(os.path.join(SCRATCH_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write("\n".join(html_lines))

print(f"Generated inspection gallery at {os.path.join(SCRATCH_DIR, 'index.html')}")
