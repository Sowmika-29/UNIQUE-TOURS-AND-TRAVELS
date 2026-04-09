import json
import urllib.request
import urllib.parse
import time

json_path = 'src/assets/data/destinations.json'

def is_valid_image(url):
    url_lower = url.lower()
    # Filter out flags, maps, icons, and SVG files
    invalid_keywords = ['flag', 'map', 'emblem', 'seal', 'logo', 'icon', 'locator', 'coat_of_arms']
    if url_lower.endswith('.svg') or url_lower.endswith('.gif'):
        return False
    if any(keyword in url_lower for keyword in invalid_keywords):
        return False
    return True

def get_scenic_wikipedia_image(query, width=1200):
    query_encoded = urllib.parse.quote(query)
    # Get all images on the page to find a scenic one instead of a flag/map
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={query_encoded}&prop=images&imlimit=20&format=json"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'UniqueToursBot/2.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            
            for page_id in pages:
                if page_id != "-1" and 'images' in pages[page_id]:
                    # Go through the images and pick the first valid JPG/PNG
                    for img in pages[page_id]['images']:
                        img_title = img['title']
                        if is_valid_image(img_title):
                            # Now we need the URL for this specific image file
                            img_title_encoded = urllib.parse.quote(img_title)
                            img_url_req = f"https://en.wikipedia.org/w/api.php?action=query&titles={img_title_encoded}&prop=imageinfo&iiprop=url&iiurlwidth={width}&format=json"
                            
                            req2 = urllib.request.Request(img_url_req, headers={'User-Agent': 'UniqueToursBot/2.0'})
                            with urllib.request.urlopen(req2) as resp2:
                                img_data = json.loads(resp2.read().decode())
                                img_pages = img_data['query']['pages']
                                for img_p_id in img_pages:
                                    if img_p_id != "-1" and 'imageinfo' in img_pages[img_p_id]:
                                        thumb_url = img_pages[img_p_id]['imageinfo'][0].get('thumburl')
                                        valid_url = thumb_url or img_pages[img_p_id]['imageinfo'][0].get('url')
                                        if valid_url and is_valid_image(valid_url):
                                            return valid_url
    except Exception as e:
        print(f"Error fetching Wikipedia images for {query}: {e}")
    return None

# Fallback queries if the exact name doesn't yield a good image
def search_wikipedia_image(name, region):
    img = get_scenic_wikipedia_image(name)
    if img: return img
    img = get_scenic_wikipedia_image(f"{name} tourism")
    if img: return img
    img = get_scenic_wikipedia_image(f"Tourism in {name}")
    if img: return img
    return None

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Hard fallback images for different types
fallback_images = {
    'Domestic': "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1200px-Taj_Mahal_%28Edited%29.jpeg",
    'International': "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Eiffel_Tower_Vertigo_800px.jpg/1200px-Eiffel_Tower_Vertigo_800px.jpg"
}

for category in ['domestic', 'international']:
    for dest in data.get(category, []):
        region = dest.get('region', '')
        dest_name = dest.get('name', '')
        
        print(f"Fetching Scenic Photo for {dest_name}...")
        img_url = search_wikipedia_image(dest_name, region)
        if img_url:
            dest['image'] = img_url
        else:
            dest['image'] = fallback_images.get(dest.get('type', 'Domestic'), fallback_images['Domestic'])
            
        for place in dest.get('places', []):
            place_name = place.get('name', '')
            print(f"  Fetching Scenic Photo for {place_name}...")
            p_img_url = search_wikipedia_image(place_name, dest_name)
            if p_img_url:
                place['image'] = p_img_url
            else:
                place['image'] = fallback_images.get(dest.get('type', 'Domestic'), fallback_images['Domestic'])

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("✅ Wikipedia Scenic Photo sourcing complete!")
