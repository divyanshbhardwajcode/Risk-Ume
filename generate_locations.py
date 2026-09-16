import json
import uuid

with open("temp_cities.json", "r") as f:
    cities = json.load(f)

unique_cities = {}
for c in cities:
    key = f"{c['city']}_{c['country']}"
    if key not in unique_cities:
        unique_cities[key] = {
            "id": str(uuid.uuid4()),
            "city": c['city'],
            "country": c['country']
        }

final_cities = list(unique_cities.values())[:1000]

print(f"Final cities count: {len(final_cities)}")

ts_content = """export interface LocationData {
  id: string;
  city: string;
  country: string;
}

export const CITIES: LocationData[] = [
"""

for c in final_cities:
    ts_content += f'  {{ id: "{c["id"]}", city: "{c["city"]}", country: "{c["country"]}" }},\n'

ts_content += "];\n"

with open("src/data/locations.ts", "w") as f:
    f.write(ts_content)

