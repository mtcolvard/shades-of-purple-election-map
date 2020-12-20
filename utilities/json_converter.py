import json
# import .'mtsElectionData.geojson'

with open('elections_vector_and_data.geojson') as f:
    data = json.load(f)
    for item in data['features']:
        item['id'] = int(item['properties']['GEOID'])

    with open('elections_vector_and_data.geojson', 'w') as f:
        json.dump(data, f)

# with open('election_results_2020.json') as f:
#     data = json.load(f)
#     for item in data:
#         item['id'] = int(item['FIPS'])
#         # item['2020_dem_pct'] = int(item['2020_dem_pct'])
#
#
#     with open('election_results_2020.json', 'w') as f:
#         json.dump(data, f)
