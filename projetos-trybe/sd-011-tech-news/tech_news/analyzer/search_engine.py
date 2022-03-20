from tech_news.database import search_news, find_news
import datetime


def valid_date(date):
    try:
        datetime.datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        raise ValueError("Data inválida")


# Requisito 6
def search_by_title(title):
    query = {"title": {"$regex": title, "$options": "i"}}
    db_news = search_news(query)
    return [
        (item["title"], item["url"])
        for item in db_news
    ]


# Requisito 7
def search_by_date(date):
    valid_date(date)
    query = {"timestamp": {"$regex": date, "$options": "i"}}
    db_news = search_news(query)
    return [
        (item["title"], item["url"])
        for item in db_news
    ]


# Requisito 8
def search_by_source(source):
    all_news = find_news()
    source_news = [
        valid_news
        for valid_news in all_news
        if len([
            sources
            for sources in valid_news["sources"]
            if sources.lower() == source.lower()
            ]) > 0
    ]
    return [(news["title"], news["url"]) for news in source_news]


# Requisito 9
def search_by_category(category):
    all_news = find_news()
    category_news = [
        valid_news
        for valid_news in all_news
        if len([
            categories
            for categories in valid_news["categories"]
            if categories.lower() == category.lower()
            ]) > 0
    ]
    return [(news["title"], news["url"]) for news in category_news]
