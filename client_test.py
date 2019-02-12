import time
import random as r
from datetime import datetime
from socketIO_client import SocketIO, LoggingNamespace

'''
sending data format:
    data= {
        'percentage': value
    }
'''

DATE_FMT = "%Y-%m-%d %H:%M:%S"

count = 0

socketIO = SocketIO('127.0.0.1', 5000, LoggingNamespace)

while True:
    count += 1
    print("I m giving", count)
    datetime_now = datetime.now().strftime(DATE_FMT)
    send_data = {
        'x': [datetime_now],
        'y1': [round(r.random() * 100, 2)],
        'y2': [50]
    }
    socketIO.emit('my_event', send_data)
    time.sleep(1)
