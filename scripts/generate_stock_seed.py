import json
import csv
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Cari bagian export const PRODUCTS: Product[] = [ ... ];
start_idx = content.find('export const PRODUCTS: Product[] = [')
if start_idx != -1:
    array_content = content[start_idx + len('export const PRODUCTS: Product[] = ['):]
    # Ambil sampai penutup ];
    end_idx = array_content.rfind('];')
    if end_idx != -1:
        array_content = array_content[:end_idx].strip()

# Array content is valid JSON-like array, let's parse items
# Let's wrap in [ ... ] and parse
clean_json_str = '[' + array_content + ']'
# Hilangkan trailing comma sebelum penutup } atau ]
clean_json_str = re.sub(r',\s*([\}\]])', r'\1', clean_json_str)

products = []
try:
    products = json.loads(clean_json_str)
except Exception as e:
    # If standard JSON fails because of unquoted keys or comments, use custom object splitting
    print(f"JSON parsing note: {e}, falling back to regex item block parser")
    # match each { ... }
    blocks = re.findall(r'\{\s*"id":\s*"([^"]+)".*?\n  \}', content, re.DOTALL)
    print(f"Found {len(blocks)} product blocks via regex")

if not products:
    # Let's parse with python ast or js2py or regex
    # Find all { "id": ... }
    matches = re.finditer(r'\{\s*"id":\s*"(?P<id>[^"]+)",\s*"name":\s*"(?P<name>[^"]+)",\s*"poli":\s*"(?P<poli>[^"]+)",\s*"category":\s*"(?P<cat>[^"]+)"(?P<rest>.*?)\n  \},?', content, re.DOTALL)
    for m in matches:
        p_id = m.group('id')
        p_name = m.group('name')
        p_poli = m.group('poli')
        p_cat = m.group('cat')
        rest = m.group('rest')
        
        is_clearance = '"isClearance": true' in rest or 'isClearance: true' in rest
        is_limited = '"isLimited": true' in rest or 'isLimited: true' in rest
        
        # Check variants
        var_match = re.search(r'"variants":\s*\[(.*?)\]', rest, re.DOTALL)
        if var_match:
            v_content = var_match.group(1)
            v_items = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"', v_content)
            if v_items:
                for v_id, v_name in v_items:
                    products.append({
                        "id": p_id,
                        "name": p_name,
                        "poli": p_poli,
                        "category": p_cat,
                        "isClearance": is_clearance,
                        "isLimited": is_limited,
                        "selectedVariant": {"id": v_id, "name": v_name}
                    })
                continue
                
        products.append({
            "id": p_id,
            "name": p_name,
            "poli": p_poli,
            "category": p_cat,
            "isClearance": is_clearance,
            "isLimited": is_limited
        })

items_list = []
if products and isinstance(products[0], dict) and 'id' in products[0] and 'variants' in products[0]:
    for p in products:
        p_id = p.get('id')
        p_name = p.get('name')
        p_poli = p.get('poli')
        is_clearance = p.get('isClearance', False)
        is_limited = p.get('isLimited', False)
        variants = p.get('variants', [])
        
        if variants:
            for v in variants:
                v_id = v.get('id')
                v_name = v.get('name')
                item_id = f"{p_id}__{v_id}"
                stock_type = "Limited" if (is_clearance or is_limited) else "PO Unlimited"
                initial_stock = 10 if (is_clearance or is_limited) else 999
                items_list.append({
                    "itemId": item_id,
                    "poli": p_poli,
                    "productName": p_name,
                    "variantName": v_name,
                    "stockType": stock_type,
                    "stockQuantity": initial_stock
                })
        else:
            stock_type = "Limited" if (is_clearance or is_limited) else "PO Unlimited"
            initial_stock = 10 if (is_clearance or is_limited) else 999
            items_list.append({
                "itemId": p_id,
                "poli": p_poli,
                "productName": p_name,
                "variantName": "-",
                "stockType": stock_type,
                "stockQuantity": initial_stock
            })
else:
    for p in products:
        p_id = p['id']
        p_name = p['name']
        p_poli = p['poli']
        is_clearance = p.get('isClearance', False)
        is_limited = p.get('isLimited', False)
        v = p.get('selectedVariant')
        if v:
            item_id = f"{p_id}__{v['id']}"
            v_name = v['name']
        else:
            item_id = p_id
            v_name = "-"
            
        stock_type = "Limited" if (is_clearance or is_limited) else "PO Unlimited"
        initial_stock = 10 if (is_clearance or is_limited) else 999
        items_list.append({
            "itemId": item_id,
            "poli": p_poli,
            "productName": p_name,
            "variantName": v_name,
            "stockType": stock_type,
            "stockQuantity": initial_stock
        })

print(f"Total granular items found: {len(items_list)}")

# Save to CSV
csv_file = 'scripts/initial_stock_seed.csv'
with open(csv_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=["itemId", "poli", "productName", "variantName", "stockType", "stockQuantity"])
    writer.writeheader()
    for row in items_list:
        writer.writerow(row)

# Save to JSON
json_file = 'scripts/initial_stock_seed.json'
with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(items_list, f, indent=2, ensure_ascii=False)

print(f"Successfully saved {len(items_list)} rows to {csv_file} and {json_file}")
