import json

if __name__ == "__main__" :
    with open('./locations.json') as f:
        locations = json.loads(f.read())

    with open('./minerals.json') as f:
        minerals = json.loads(f.read())

    new_data = list()
    for mineral in minerals['minerals']:
        res = [l for l in locations['minerals'] if l['name'] == mineral['name']]
        if(len(res)>0):
            mineral['coordinates'] = {'lat':res[0]['lat'], 'lng':res[0]['lng']}
            new_data.append(mineral)

    with open("new_data.json", "w") as write_file:
         json.dump(new_data, write_file)