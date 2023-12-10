import time
import seeed_mlx9064x
from flask import Flask, send_file, redirect
from flask_cors import CORS
from PIL import Image, ImageDraw
import numpy as np
import io
import threading

app = Flask(__name__)
CORS(app)
frame = [0] * 768
rounded = [round(num, 1) for num in frame]

def sensor_data():
    global frame
    mlx = seeed_mlx9064x.grove_mxl90640()
    while True:
        try:
            mlx.getFrame(frame)
            time.sleep(0.1)
        except ValueError:
            continue

def generate_image():
    global frame
    width, height = 32, 24
    image = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(image)

    normalized_values = np.interp(frame, (min(frame), max(frame)), (0, 255))

    for i, value in enumerate(normalized_values):
        x = i % width
        y = i // width
        draw.rectangle([(x, y), (x + 1, y + 1)], fill=(int(value), 0, 255 - int(value)))

    img_byte_array = io.BytesIO()
    image.save(img_byte_array, format='JPEG')
    img_byte_array.seek(0)
    return img_byte_array

@app.route('/')
def index():
    return redirect('/static/index.html')

@app.route('/image', methods=['GET'])
def get_image():
    return send_file(generate_image(), mimetype='image/jpeg')

@app.route('/data', methods=['GET'])
def get_data():
    global frame
    return ' '.join(map(str, [round(num, 1) for num in frame]))

if __name__ == '__main__':
    sensor_thread = threading.Thread(target=sensor_data)
    sensor_thread.daemon = True
    sensor_thread.start()
    app.run(host='0.0.0.0', debug=False)

