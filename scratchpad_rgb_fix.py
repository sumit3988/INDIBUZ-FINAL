import os
import glob
import re

files = glob.glob('src/styles/*.css') + glob.glob('src/pages/*.js')

for path in files:
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace green RGBs with charcoal RGBs
    content = re.sub(r'15,\s*42,\s*30', '30, 30, 30', content)
    content = re.sub(r'27,\s*61,\s*47', '40, 40, 40', content)
    content = re.sub(r'107,\s*29,\s*42', '200, 16, 46', content)  # burgandy to red
    
    # Replace gold RGBs with red RGBs
    content = re.sub(r'197,\s*150,\s*58', '200, 16, 46', content)
    content = re.sub(r'197,\s*160,\s*89', '200, 16, 46', content)
    
    # Replace var(--gold) with var(--red) more robustly
    content = re.sub(r'var\(--gold[^)]*\)', 'var(--red)', content)
    
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)
        
print("Hardcoded colors and gold variables replaced.")
