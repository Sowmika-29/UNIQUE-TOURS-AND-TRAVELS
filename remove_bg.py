from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    # Loop through all pixels.
    # If the pixel is close to white, make it transparent
    for item in datas:
        # Check if the pixel is white (or very close to it)
        # We can use a threshold. 240, 240, 240 seems safe for white background
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            # Change all white (also shades of whites)
            # to completely transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

remove_white_bg(r"d:\CREINX\Project1_TOURS & TRAVELS\UNIQUE-TOURS-AND-TRAVELS\public\logo.jpeg", r"d:\CREINX\Project1_TOURS & TRAVELS\UNIQUE-TOURS-AND-TRAVELS\public\logo.png")
