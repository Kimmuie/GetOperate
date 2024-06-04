import requests
import json
import time

url = "https://cms.getoperate.com"
headers = {"Authorization": "Bearer 35af90c1f337e89ce6064276090eb3560c6c1f23c314080581a277ac3b0aa587665e42c27fe3de55ac398df4207a26e105c24c3d61cef28e41be391f23d9126ab09fc2de26d61528acc70626340b50f34cc8ff3ce6c80a83ce6e42261bca1d652063617e8c0ff39fdb877990d9b729d29629f0e48ad459c75b1ceb6430f4564c"}
# filters[categories][title][$notNull]bloom_growth=false&filters[actions][title][$notNull]=true&
route = f"{url}/api/categories?populate=*&pagination[page]=1&pagination[pageSize]=100"


response = requests.get(route, headers=headers)
data = response.json()

datas = []

def process_data(data):
    # Your processing logic goes here
    for item in data['data']:
        datas.append(item)

def save_data():
    # Your saving logic goes here
     with open('data.json', 'a') as f:
            json.dump(datas, f)
            f.write('\n')

# Extracting data from the first page
process_data(data)

# Going through subsequent pages until 'data' is empty
i = 2
while True:
    # filters[categories][title][$notNull]bloom_growth=false&filters[actions][title][$notNull]=true&
    newUrl = f"{url}/api/categories?populate=*&pagination[page]={i}&pagination[pageSize]=100"
    response = requests.get(newUrl, headers=headers)
    data = response.json()
    process_data(data)
    print(f"Page {i} processed ", newUrl, end="\n")
    i += 1
    time.sleep(2)  # To avoid being rate-limited
    
    if not data['data']:
        save_data()
        break
