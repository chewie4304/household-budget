import os
from PIL import Image

# Identify the target source image
src_name = "Home Wealth icon.jpg"

if not os.path.exists(src_name):
    print(f"Error: Cannot find '{src_name}' in this directory.")
    print("Please make sure the file is named exactly 'Home Wealth icon.jpg' and is in your project root.")
    exit(1)

try:
    # Open the beautiful metallic hexagon image
    img = Image.open(src_name)
    w, h = img.size

    # Crop a perfect square from the center of the image
    crop_size = int(min(w, h) * 0.95)  # Crop to 95% of the smaller dimension
    left = (w - crop_size) // 2
    top = (h - crop_size) // 2
    right = left + crop_size
    bottom = top + crop_size

    # Clamp margins safely within image boundaries
    left = max(0, left)
    top = max(0, top)
    right = min(w, right)
    bottom = min(h, bottom)

    cropped = img.crop((left, top, right, bottom))

    # Save the PWA-ready standard launcher files
    cropped.resize((192, 192), Image.Resampling.LANCZOS).save("icon-192.png", "PNG")
    cropped.resize((512, 512), Image.Resampling.LANCZOS).save("icon-512.png", "PNG")

    print("Success! Center-cropped your 3D hexagon and generated 'icon-192.png' and 'icon-512.png'!")

except Exception as e:
    print(f"An error occurred while cropping the image: {e}")