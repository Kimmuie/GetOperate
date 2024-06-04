import json

with open('out_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

apps_set = set()

for entry in data:
    for app in entry["apps"]:
        if isinstance(app, str):
            apps_set.add(app)
apps_list = list(apps_set)
# Write the list of apps into a new JSON file
with open('appsList.json', 'w', encoding='utf-8') as outfile:
    json.dump({'apps': apps_list}, outfile, indent=4)

print("Extraction completed. Data written to appsList.json.")
