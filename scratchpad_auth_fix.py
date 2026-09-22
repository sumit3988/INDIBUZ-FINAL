import os

auth_files = ['login.js', 'register.js', 'forgot-password.js', 'reset-password.js', 'account.js', 'contact.js']
pages_dir = os.path.join('src', 'pages')

for f in auth_files:
    path = os.path.join(pages_dir, f)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Auth pages specific fixes
        if f in ['login.js', 'register.js', 'forgot-password.js', 'reset-password.js']:
            content = content.replace('var(--forest-deep)', 'var(--white)')
            content = content.replace('color: var(--cream)', 'color: var(--charcoal)')
            content = content.replace('background: rgba(255,255,255,0.05)', 'background: #fff')
            content = content.replace('border: 1px solid rgba(255,255,255,0.1)', 'border: 1px solid #ccc')
            content = content.replace('color: var(--gold)', 'color: var(--red)')
            content = content.replace('color: var(--forest-deep); font-weight: bold', 'color: var(--white); font-weight: bold')
            content = content.replace('background: var(--gold)', 'background: var(--red)')
            content = content.replace('box-shadow: 0 10px 30px rgba(0,0,0,0.15)', 'box-shadow: 0 4px 20px rgba(0,0,0,0.08)')
            
        # Account page fixes
        if f == 'account.js':
            content = content.replace('var(--forest-deep)', 'var(--red)')
            content = content.replace('color: var(--gold)', 'color: var(--red)')
            content = content.replace('background-color: var(--forest-deep)', 'background-color: var(--red)')
            
        # Contact page fixes
        if f == 'contact.js':
            content = content.replace('fill="var(--forest-deep)"', 'fill="var(--charcoal)"')
            content = content.replace('fill:var(--forest-deep)', 'fill:var(--charcoal)')
            content = content.replace('color:var(--forest-deep)', 'color:var(--charcoal)')
            content = content.replace('background-color:var(--forest-deep)', 'background-color:var(--ivory)')
            content = content.replace('background:var(--forest-deep)', 'background:var(--ivory)')
            
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)
            
print("Auth and Contact styles fixed.")
