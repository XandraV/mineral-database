import requests
from requests import get
import shutil
import re
import json
import time
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

def simple_get(url):
    # Attempts to get the content at `url` by making an HTTP GET request.
    # If the content-type of response is some kind of HTML/XML, return the
    # text content, otherwise return None.
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None

    except RequestException as e:
        log_error('Error during requests to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    #Returns True if the response seems to be HTML, False otherwise.
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200 
            and content_type is not None 
            and content_type.find('html') > -1)

def log_error(e):
    print(e)

if __name__ == "__main__" :
    links_list = [('https://www.mindat.org/min-'+ str(i) +'.html') for i in range(4199, 5400)]
    result = list()
    c = 4198
    for count, link in enumerate(links_list):
        c += 1
        my_dict = dict()
        soup = BeautifulSoup(simple_get(link), 'html.parser')
        try:
            my_dict["name"] = soup.find("h1", {"class", "mineralheading"}).text
        except:
            print('error')
            continue

        try:
            locality = soup(text=re.compile(r'Type Locality:'))[0].parent.parent.findAll('a')[1]['href']
            locality_soup = BeautifulSoup(simple_get('https://www.mindat.org/'+locality), 'html.parser')
            my_dict['coordinates'] = locality_soup.findAll('div',{'class','LFtr'})[1].find('a').text
        except:
            continue
        result.append(my_dict)
        time.sleep(1)
        print(str(c) + '. ' + my_dict['name'] + "  coordinates: " + my_dict['coordinates'])

    with open('locations_data.txt', 'w', encoding='utf-8') as txtfile:
                txtfile.write(str(result))