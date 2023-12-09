import time
import seeed_mlx9064x
from flask import Flask, jsonify
import threading

app = Flask(__name__)
frame = [0] * 768
rounded = [round(num, 1) for num in frame]

def sensor_data():
    global frame, rounded
    mlx = seeed_mlx9064x.grove_mxl90640()
    while True:
        try:
            mlx.getFrame(frame)
            rounded = [round(num, 1) for num in frame]
            time.sleep(1)
        except ValueError:
            continue

@app.route('/data', methods=['GET'])
def get_data():
    global rounded
    return ' '.join(map(str, rounded))

if __name__ == '__main__':
    sensor_thread = threading.Thread(target=sensor_data)
    sensor_thread.daemon = True
    sensor_thread.start()
    app.run(host='0.0.0.0', debug=True)

