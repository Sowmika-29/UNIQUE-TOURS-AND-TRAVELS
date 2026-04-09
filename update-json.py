import json
import os

json_path = 'src/assets/data/destinations.json'
images_dir = 'src/assets/images'

# Load the local image filenames (mapped to lowercase without extensions)
local_images = {os.path.splitext(f)[0].lower().replace('_', '-'): f for f in os.listdir(images_dir) if f.endswith('.jpg')}

# Some manual mappings for inconsistencies
manual_map = {
    'sri-lanka': 'srilanka',
    'jammu-kashmir': 'kashmir',
    'himachal': 'himachal',
    'ladakh': 'ladakh',
    'sentosa': 'sentosa',
    'gardens-by-the-bay': 'gardensbythebay',
    'universal-studios': 'universal',
    'museum-of-future': 'museumoffuture',
    'burj-khali-fa': 'burjkhalifa',
    'palm-jumeirah': 'palmjumeirah',
    'humayun-tomb': 'humayun_tomb',
    'india-gate': 'india_gate',
    'qutub-minar': 'qutub_minar',
    'lotus-temple': 'lotus_temple',
    'red-fort': 'red_fort',
    'rohtang-pass': 'rohtang', # Wait, let me check if it's rohtang.jpg or rohtang-pass.jpg
}

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

def get_local_path(name_id):
    clean_id = name_id.lower().replace(' ', '-').replace('&', '').replace('--', '-')
    # Check manual map first
    if clean_id in manual_map:
        clean_id = manual_map[clean_id]
    
    # Try direct match
    if clean_id in local_images:
        return f"assets/images/{clean_id}.webp"
    
    # Try underscore matching
    underscore_id = clean_id.replace('-', '_')
    if underscore_id in local_images:
        return f"assets/images/{underscore_id}.webp"
        
    return None

def process_item(item, is_dest=True):
    # Try to find a match for destination ID or place name
    search_key = item['id'] if 'id' in item else item['name']
    local_path = get_local_path(search_key)
    if local_path:
        item['image'] = local_path
    
    if 'places' in item:
        for place in item['places']:
            process_item(place, False)

for cat in ['domestic', 'international']:
    for dest in data[cat]:
        process_item(dest)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("✅ Updated destinations.json with local paths.")
