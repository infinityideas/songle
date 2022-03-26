from flask import Flask, request, make_response
import configparser
import sys
import pusher

config = configparser.ConfigParser()
config.read('config.ini')

pusher_client = pusher.Pusher(
    app_id=config['PUSHER']['app_id'],
    key=config['PUSHER']['key'],
    secret=config['PUSHER']['secret'],
    cluster=config['PUSHER']['cluster'],
    ssl=True
)

app = Flask(__name__)

@app.route('/checkavailable', methods=['GET'])
def checkavailable():
    check = pusher_client.channel_info(request.args.get('channel'), {'info': ['subscription-count']})
    resp = make_response(check)
    resp.headers['Access-Control-Allow-Origin'] = '*'

    return resp