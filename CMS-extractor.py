import json
import re


with open('make_templates_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

templates = []
for entry in data:
    titles = entry['name'].strip()
    slugRM = re.sub(r'[^a-zA-Z0-9\s]', '', titles)
    slugs = slugRM.strip().lower().replace(" ", "-")
    descriptions = entry['description']
    apps = [item['name'] for item in entry['appsCollection']['items']]
    categories = [item['slug'] for item in entry['subcategoriesCollection']['items']]
    templates.append({"title":titles, "slug":slugs, "description":descriptions, "apps": apps, "categories": categories})


with open('extracted.json', 'w', encoding='utf-8') as outfile:
    json.dump({'templates': templates}, outfile, indent=4)

print("Extraction completed. Data written to extracted.json.")
