import re
import requests
import flask
from flask import Flask, request
import news
import reddit
import stocktwits

app = Flask(__name__)

# Ticker data API route
@app.route("/data", methods=["POST", "GET"])
def ticker_data():
    ticker = request.args.get('ticker')
    print(ticker)
    data = {}
    data['news'] = news.get_news(ticker)
    data['reddit'] = {'info': reddit.get_reddit_info(ticker), 'trending': reddit.get_reddit_trending(3)}
    data['stocktwits'] = {'info': stocktwits.get_stocktwits_symbol_info(ticker), 'trending': stocktwits.get_stocktwits_trending()}
    return flask.jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)