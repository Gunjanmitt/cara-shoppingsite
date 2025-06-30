# File: app.py
from flask import Flask, request, send_file, render_template
from PIL import Image
import os
import uuid

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'results'
IMG_FOLDER = 'img'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('virtualtryon.html')  # if using templates

@app.route('/tryon', methods=['POST'])
def tryon():
    person_file = request.files.get('person')
    garment_path = request.form.get('garment')  # path like "img/products/f1.jpg"

    if not person_file or not garment_path:
        return "Missing image(s)", 400

    # Save person image
    person_filename = str(uuid.uuid4()) + os.path.splitext(person_file.filename)[1]
    person_path = os.path.join(UPLOAD_FOLDER, person_filename)
    person_file.save(person_path)

    try:
        person_img = Image.open(person_path).convert("RGBA")
        garment_img = Image.open(garment_path).convert("RGBA")

        # Resize garment to match person (you can adjust this)
        garment_resized = garment_img.resize((person_img.width, int(person_img.height * 0.5)))
        position = (0, int(person_img.height * 0.3))

        person_img.paste(garment_resized, position, garment_resized)

        result_path = os.path.join(RESULT_FOLDER, "result.png")
        person_img.save(result_path)

        return send_file(result_path, mimetype='image/png')

    except Exception as e:
        print("Error:", e)
        return "Failed to generate try-on", 500

if __name__ == '__main__':
    app.run(debug=True)
