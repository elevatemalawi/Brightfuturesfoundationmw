import json
from pathlib import Path
folder=Path('content/news')
items=[]
for path in sorted(folder.glob('*.json')):
    if path.name=='index.json': continue
    try:
        data=json.loads(path.read_text(encoding='utf-8'))
        if isinstance(data,dict): items.append(data)
    except Exception as exc:
        print(f'Skipping {path}: {exc}')
(folder/'index.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
