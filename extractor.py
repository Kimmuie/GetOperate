import json

# Load JSON data from the file with explicit encoding specification
with open('make_templates_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Extract the "name" data
names = [entry['name'].strip().lower().replace(" ", "-") for entry in data]
extracted_data = {'slug': names}

# Write the extracted names to a new JSON file
with open('extractedSlug.json', 'w', encoding='utf-8') as outfile:
    json.dump(extracted_data, outfile, indent=4)

print("Extraction completed. Data written to extracted.json.")