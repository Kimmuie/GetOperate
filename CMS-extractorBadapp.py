import json

with open('out_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

filtered_templates = []
for entry in data:
    if all(not isinstance(app, int) for app in entry["apps"]):
        filtered_templates.append(entry)

with open('TemplateBad22.json', 'w', encoding='utf-8') as outfile:
    json.dump({'templates': filtered_templates}, outfile, indent=4)

print("Extraction completed. Data written to TemplateBad.json.")
