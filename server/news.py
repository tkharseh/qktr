import yfinance as yf

def get_news(ticker):
    stock_obj = yf.Ticker(ticker)
    news = {}
    news_info = stock_obj.news
    for i in range(4):
        title = news_info[i]['title']
        if len(title) >= 50:
            title = news_info[i]['title'][0:50] + '...'
        publisher = news_info[i]['publisher']
        link = news_info[i]['link']
        news[f'article{i + 1}'] = {'title': title, 'publisher': publisher, 'link': link}
    return news