from flask import Flask, jsonify, render_template, request
from subprocess import call
from flask_socketio import SocketIO, send, emit
from datetime import datetime
import random as r
import time

DATE_FMT = "%Y-%m-%d %H:%M:%S"

app = Flask(__name__)
app.secret_key = 'mysecret'
socket_io = SocketIO(app)

# _mode = 'start' or 'stop'
_mode = 'stop'

@app.route('/')
def draw():
    print("render conplete")
    return render_template('index.html', x_window=100)

# Changing Mode
@socket_io.on('change mode')
def changer(data):
    global _mode
    if data['mode'] == 'start':
        _mode = 'start'
    else:
        _mode = 'stop'

# Receiving Messages
@socket_io.on('my_event')
def drawer(data):
    global _mode
    if _mode == 'stop':
        pass
    else:
        print('input data: ' + str(data))
        # Send data
        socket_io.emit('update', data, broadcast=True)

if __name__ == '__main__':
    socket_io.run(app, debug=True, host='127.0.0.1', port=5000)
    #socket_io.run(app, debug=True, host='0.0.0.0', port=80)
