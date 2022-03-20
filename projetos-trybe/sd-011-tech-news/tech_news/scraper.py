import requests
from parsel import Selector
import time
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    try:
        time.sleep(1)
        response = requests.get(url)
        if response.status_code == 200:
            return response.text
        if response.status_code != 200:
            return None
    except requests.ReadTimeout:
        return None


# Requisito 2
def scrape_novidades(html_content):
    page_content = Selector(html_content)
    news_links = page_content.css('div.tec--list__item\
        a.tec--card__thumb__link::attr(href)').getall()
    return news_links


# Requisito 3
def scrape_next_page_link(html_content):
    page_content = Selector(html_content)
    next_page = page_content.css(
        'div.tec--list > a.tec--btn::attr(href)').get()
    if next_page is None:
        return None
    return next_page


# Requisito 4
def get_writer_name(content):
    writer_name = content.css('.z--font-bold *::text').get()
    if not writer_name:
        return None
    return writer_name.strip()


def get_shares_count(content):
    shares_count = content.css('div.tec--toolbar__item::text').get()
    if not shares_count:
        return 0
    return int(shares_count.strip(' Compartilharam'))


def get_comments_count(content):
    count = content.css("div button::attr('data-count')").get()
    if not count:
        return 0
    return int(count)


def get_summary(content):
    summary_page = content.css(
        'div.tec--article__body-grid\
            div.tec--article__body > p')[0]
    summary = ''
    for text in summary_page.css('*::text').getall():
        summary += text
    return summary


def get_sources(content):
    the_sources = content.xpath(
        "//div[h2/text() = 'Fontes']/div/a/text()").getall()
    sources = [source.strip() for source in the_sources]
    return sources


def get_categories(content):
    categories = content.xpath("//div[@id='js-categories']/a/text()").getall()
    return [category.strip() for category in categories]


def scrape_noticia(html_content):
    page_content = Selector(html_content)
    return dict(
        url=page_content.xpath("//meta[@property='og:url']/@content").get(),
        title=page_content.xpath("//h1[@id='js-article-title']/text()").get(),
        timestamp=page_content.xpath(
            "//time[@id='js-article-date']/@datetime").get(),
        writer=get_writer_name(page_content),
        shares_count=get_shares_count(page_content),
        comments_count=get_comments_count(page_content),
        summary=get_summary(page_content),
        sources=get_sources(page_content),
        categories=get_categories(page_content)
    )


# Requisito 5
def get_tech_news(amount):
    news = []
    url = 'https://www.tecmundo.com.br/novidades'

    while(len(news) < amount):
        page_content = fetch(url)
        links = scrape_novidades(page_content)
        for link in links:
            if len(news) < amount:
                news_content = fetch(link)
                news.append(scrape_noticia(news_content))
        url = scrape_next_page_link(page_content)
    create_news(news)
    return news
