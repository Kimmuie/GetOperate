import json
import requests
import os
import dotenv

dotenv.load_dotenv()
formatted_templates = json.load(open("template.json"))

confirmation = input("Do you want to push the changes? (y/n): ")
if confirmation == "y":
    for template in formatted_templates["templates"]:
        url = f"https://cms.getoperate.com/content-manager/collection-types/api::template.template/{template['id']}"
        payload = {
            "slug": template["slug"],
            "description": template["description"],
        }
        headers = {
            "Authorization": f"Bearer {os.environ['OPERATE_API_TOKEN']}",
            "Content-Type": "application/json"
        }
        response = requests.put(url, headers=headers, json=payload)
        print(f"Pushed changes for {template['slug']}: {response.status_code}") 
else:
    print("Changes not pushed")
