import json
import csv
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Cari bagian export const PRODUCTS: Product[] = [ ... ];
start_idx = content.find('export const PRODUCTS: Product[] = [')
if start_idx != -1:
    array_content = content[start_idx + len('export const PRODUCTS: Product[] = ['):]
    end_idx = array_content.rfind('];')
    if end_idx != -1:
        array_content = array_content[:end_idx].strip()

clean_json_str = '[' + array_content + ']'
clean_json_str = re.sub(r',\s*([\}\]])', r'\1', clean_json_str)

products = json.loads(clean_json_str)

DUMMY_STOCK_PATTERN = [10, 8, 15, 6, 12, 4, 7, 14, 5, 9, 11, 8, 12, 6, 10, 7, 15, 4, 8, 12, 5, 9, 14, 6, 10, 7, 11, 8, 15, 4, 6, 12, 8, 5, 10, 9, 7, 14, 6, 11, 8, 12, 5, 10, 7, 15, 8]

items_list = []
idx = 0
for p in products:
    p_id = p.get('id')
    p_name = p.get('name')
    p_poli = p.get('poli')
    variants = p.get('variants', [])
    
    if variants:
        for v in variants:
            v_id = v.get('id')
            v_name = v.get('name')
            item_id = f"{p_id}__{v_id}"
            dummy_stock = DUMMY_STOCK_PATTERN[idx % len(DUMMY_STOCK_PATTERN)]
            idx += 1
            items_list.append({
                "itemId": item_id,
                "poli": p_poli,
                "productName": p_name,
                "variantName": v_name,
                "stockType": "Limited",
                "stockQuantity": dummy_stock,
                "status": "Clearance"
            })
    else:
        dummy_stock = DUMMY_STOCK_PATTERN[idx % len(DUMMY_STOCK_PATTERN)]
        idx += 1
        items_list.append({
            "itemId": p_id,
            "poli": p_poli,
            "productName": p_name,
            "variantName": "-",
            "stockType": "Limited",
            "stockQuantity": dummy_stock,
            "status": "Clearance"
        })

print(f"Total granular items found: {len(items_list)}")

# Save to CSV
csv_file = 'scripts/initial_stock_seed.csv'
with open(csv_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=["itemId", "poli", "productName", "variantName", "stockType", "stockQuantity", "status"])
    writer.writeheader()
    for row in items_list:
        writer.writerow(row)

# Save to JSON
json_file = 'scripts/initial_stock_seed.json'
with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(items_list, f, indent=2, ensure_ascii=False)

# Save to TSV for easy copy-paste
tsv_file = 'scripts/initial_stock_seed.tsv'
with open(tsv_file, 'w', encoding='utf-8') as f:
    for row in items_list:
        f.write(f"{row['itemId']}\t{row['poli']}\t{row['productName']}\t{row['variantName']}\t{row['stockType']}\t{row['stockQuantity']}\t{row['status']}\n")

print(f"Successfully saved {len(items_list)} rows to {csv_file}, {json_file}, and {tsv_file}")
