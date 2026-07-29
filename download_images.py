import urllib.request
import json
import os

os.makedirs('public/images', exist_ok=True)

queries = {
    'indian_agri_landscape.jpg': 'Indian agriculture landscape',
    'indibuz_team.jpg': 'warehouse workers team',
    'indian_rice_fields.jpg': 'paddy field India',
    'rice_processing_mill.jpg': 'food processing factory interior',
    'export_packaging.jpg': 'pallets warehouse sacks'
}

for filename, query in queries.items():
    print(f"Searching for {query}...")
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json"
    
    try:
        req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data.get('query', {}).get('pages', {})
            if pages:
                page = list(pages.values())[0]
                img_url = page['imageinfo'][0]['url']
                print(f"Downloading {img_url} to {filename}")
                urllib.request.urlretrieve(img_url, f'public/images/{filename}')
            else:
                print(f"No results for {query}")
    except Exception as e:
        print(f"Failed for {query}: {e}")

print("Done.")
