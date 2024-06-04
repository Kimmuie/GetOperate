import json

# Load input data
with open('Template.json', 'r') as f:
    inputExtractedTemplate = json.load(f)

with open('app_data.json', 'r') as f:
    inAppData = json.load(f)

with open('category_data.json', 'r') as f:
    inCategoryData = json.load(f)

# Initialize output data
outputData = []

# Map app names to app IDs
app_id_map = {app['attributes']['title']: app['id'] for app in inAppData}

# Map category names to category IDs
category_id_map = {category['attributes']['slug']: category['id'] for category in inCategoryData}

# Process data
for template in inputExtractedTemplate['templates']:
    # Replace apps with category IDs
    app_ids = [app_id_map.get(app, app) for app in template['apps'] if app_id_map.get(app, app) is not None]
    template['apps'] = app_ids
    
    # Replace categories with category IDs
    category_ids = [category_id_map.get(category, None) for category in template['categories'] if category_id_map.get(category, None) is not None]
    template['categories'] = category_ids

    # Append processed template to output data
    outputData.append(template)

# Save data
with open('1out_data.json', 'w') as f:  # Open in write mode, not append mode
    json.dump(outputData, f, indent=4)  # Use indent for pretty formatting
