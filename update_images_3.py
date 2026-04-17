import json

images_list = [
"Aga Khan Palace",
"Ajanta Caves",
"Albert Hall Museum",
"Armoury Museum",
"Arthur's Seat",
"Baggi Khana",
"Bandra Bandstand",
"Bazaar Street",
"Bhushi Dam",
"Bibi Ka Maqbara",
"Camel Ride Track",
"Celebrity Wax Museum",
"Chakra Yantra",
"Chandra Mahal",
"Colaba Causeway",
"Daulatabad Fort",
"Diwan-i-Khas",
"Elephant's Head",
"Elephanta Caves",
"Ellora Caves",
"FC Road",
"Folk Dance Deck",
"Fort Biological Park",
"Gateway of India",
"Govind Dev Ji Temple",
"Jai Prakash Yantra",
"Jaigarh Fort",
"Jal Mahal",
"Johari Bazaar",
"Juhu Beach",
"Karla Caves",
"Kune Falls",
"Laghu Samrat Yantra",
"Lonavala Lake",
"Lonavala Nearby",
"Madhavendra Bhawan",
"Mapro Garden",
"Mubarak Mahal",
"Nadivalaya Yantra",
"National Museum",
"Old Mahabaleshwar",
"Osho Ashram",
"Padao Restaurant",
"Panchakki",
"Panchavati",
"Panchgani",
"Pandavleni Caves",
"Panna Meena Stepwell",
"Pottery Workshop",
"Pritam Niwas Chowk",
"Ram Yantra",
"Royal Dining Hall",
"Royal Gaitor",
"Samrat Yantra",
"Saptashrungi",
"Shaniwar Wada",
"Siddharth Garden",
"Sinhagad Fort",
"Someshwar Falls",
"Stepped Well",
"Sunset Point",
"Tiger's Leap",
"Trimbakeshwar",
"Venna Lake",
"Wax Museum"
]

# Create a mapping from lowercase name to string filename
images_map = {name.lower(): name for name in images_list}

# Custom overrides
images_map["sunset point"] = "Sunset PointJaipur" # Fallback if there's multiple, but here we'll map "Sunset Point" to "Sunset PointJaipur.webp"
images_map["national museum"] = "National Museum (Chokhi Dhani Museum)"

path = r"src\assets\data\destinations.json"

with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

updated_count = 0

def update_item(item):
    global updated_count
    name_key = item.get("name", "").lower()
    
    # special check: if it's the nahargarh sunset point, or general sunset point
    if name_key == "sunset point":
        new_img = "assets/images/Sunset PointJaipur.webp"
        if item.get("image") != new_img:
            item["image"] = new_img
            updated_count += 1
            print(f"Updated {item['name']} -> {new_img}")
    
    elif name_key in images_map:
        new_img = f"assets/images/{images_map[name_key]}.webp"
        if item.get("image") != new_img:
            item["image"] = new_img
            updated_count += 1
            print(f"Updated {item['name']} -> {new_img}")

for category in data.values():
    for dest in category:
        update_item(dest)
        for place in dest.get("places", []):
            update_item(place)
            for sub_place in place.get("subPlaces", []):
                update_item(sub_place)

with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("Total updated:", updated_count)
