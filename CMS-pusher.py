import os
import dotenv
import json
import requests

dotenv.load_dotenv()
formatted_templates = json.load(open("TemplateGood.json"))

confirmation = input("Do you want to push the changes? (y/n): ")
if confirmation == "y":
    for template in formatted_templates["templates"]:
        apps_ids = template["apps"]
        category_ids = template["categories"]
        
        url = "https://cms.getoperate.com/content-manager/collection-types/api::template.template"
        payload = {
            "title": template["title"],
            "slug": template["slug"],
            "description": template["description"],
            "apps": apps_ids,
            "categories": category_ids
        }
        headers = {
            "Authorization": f"Bearer {os.environ['OPERATE_API_TOKEN']}",
            "Content-Type": "application/json"
        }
        response = requests.post(url, headers=headers, json=payload)
        print(f"Pushed changes for {response.status_code}") 
else:
    print("Changes not pushed")
