import json
import urllib.request
import urllib.parse
import time

json_path = 'src/assets/data/destinations.json'

def get_wikipedia_image(query, width=1200):
    query_encoded = urllib.parse.quote(query)
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={query_encoded}&prop=pageimages&format=json&pithumbsize={width}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'UniqueToursBot/1.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            for page_id in pages:
                if page_id != "-1" and 'thumbnail' in pages[page_id]:
                    return pages[page_id]['thumbnail']['source']
    except Exception as e:
        print(f"Error fetching Wikipedia image for {query}: {e}")
    return None

# Fallback queries if the exact name doesn't yield a good image
def search_wikipedia_image(name, region):
    img = get_wikipedia_image(name)
    if img: return img
    img = get_wikipedia_image(f"{name}, {region}")
    if img: return img
    img = get_wikipedia_image(f"{name} tourism")
    if img: return img
    return None

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Hard fallback images for different types (using reliable real unsplash IDs or wikimedia direct links)
# Using some wikimedia common images that are known to exist as ultimate fallbacks
fallback_images = {
    'Domestic': "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1200px-Taj_Mahal_%28Edited%29.jpeg",
    'International': "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Eiffel_Tower_Vertigo_800px.jpg/1200px-Eiffel_Tower_Vertigo_800px.jpg"
}

modified = False
for category in ['domestic', 'international']:
    for dest in data.get(category, []):
        region = dest.get('region', '')
        dest_name = dest.get('name', '')
        
        print(f"Fetching for {dest_name}...")
        img_url = search_wikipedia_image(dest_name, region)
        if img_url:
            dest['image'] = img_url
        else:
            dest['image'] = fallback_images.get(dest.get('type', 'Domestic'), fallback_images['Domestic'])
            
        time.sleep(0.1) # Be nice to Wikipedia API
        
        for place in dest.get('places', []):
            place_name = place.get('name', '')
            print(f"  Fetching for {place_name}...")
            p_img_url = search_wikipedia_image(place_name, dest_name)
            if p_img_url:
                place['image'] = p_img_url
            else:
                place['image'] = fallback_images.get(dest.get('type', 'Domestic'), fallback_images['Domestic'])
            time.sleep(0.1)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("✅ Wikipedia sourcing complete!")
