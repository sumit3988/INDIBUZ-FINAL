import os

pages = ['about.js', 'quality.js', 'partner.js', 'certifications.js', 'markets.js', 'cart.js']
pages_dir = os.path.join('src', 'pages')

for f in pages:
    path = os.path.join(pages_dir, f)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # General fixes for other pages
        content = content.replace('var(--forest-deep)', 'var(--red)')
        content = content.replace('background-color:var(--forest-deep)', 'background-color:var(--ivory)')
        content = content.replace('background-color: var(--forest-deep)', 'background-color: var(--ivory)')
        
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)
            
print("Other pages fixed.")
