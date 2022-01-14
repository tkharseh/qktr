import json
import requests

def get_reddit_trending(num):
    '''
    Returns number of upvotes and mentions for the top num trending stocks.
    '''
    request = requests.get("https://apewisdom.io/api/v1.0/filter/all-stocks/page/1")
    response = request.json()
    trending = {}
    for i in range(num):
        trending[f'symbol{i+1}'] = response["results"][i]["ticker"]    
    return trending

def get_reddit_info(ticker):
    '''
    Returns the number of upvotes and mentions of a stock with ticker ticker.
    '''
    request = requests.get("https://apewisdom.io/api/v1.0/filter/all-stocks/page/1")
    response = request.json()
    data = {'upvotes': 'N/A', 'mentions': 'N/A', 'rank': 'N/A'}
    for i in range(100):
        if response["results"][i]["ticker"] == ticker.upper():
            data['upvotes'] = response["results"][i]["upvotes"]
            data['mentions'] = response["results"][i]["mentions"]
            data['rank'] = response["results"][i]["rank"]
            
    return data