import os
import glob

css_files = glob.glob('src/styles/*.css')

for path in css_files:
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace global variables to fit Red/White/Charcoal theme
    content = content.replace('var(--forest-deep)', 'var(--charcoal)')
    content = content.replace('var(--forest)', 'var(--red)')
    content = content.replace('var(--gold)', 'var(--red)')
    content = content.replace('var(--cream)', 'var(--white)')
    content = content.replace('var(--cream-dark)', 'var(--ivory)')
    
    # Fix the header green background
    # Specifically for `.site-header` or anything that had --charcoal as bg and it looks too dark
    
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)
        
print("CSS files updated.")
