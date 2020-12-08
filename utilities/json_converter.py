import json
# import .election_data_join.geojson

with open('election_data_join.geojson') as f:
    data = json.load(f)
    for item in data['features']:
        item['id'] = int(item['properties']['GEOID'])

    with open('election_data_join.geojson', 'w') as f:
        json.dump(data, f)
