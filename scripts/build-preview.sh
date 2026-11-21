#!/usr/bin/env bash
# Builds a static preview into ./out with relative paths (for Claude artifact previews).
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf out
STATIC_EXPORT=1 npx next build >/tmp/exp.log 2>&1
cd out
rm -rf _not-found 404 404.html
find . -name "*.woff" -delete
python3 - <<'PY'
import re,glob,json,os
for f in glob.glob('**/*.html',recursive=True)+glob.glob('**/*.js',recursive=True)+glob.glob('**/*.css',recursive=True)+glob.glob('**/*.txt',recursive=True):
    s=open(f,encoding='utf-8').read()
    if f.endswith('.css'):
        n=s.replace('/_next/static/media/','../media/'); n=re.sub(r',url\([^)]*\.woff\) format\("woff"\)','',n)
    else:
        n=re.sub(r'(?<![\w.])/(_next|images|icon\.png|apple-icon\.png)', r'./\1', s).replace('./_next/','./next/')
    if n!=s: open(f,'w',encoding='utf-8').write(n)
PY
mv _next next
rm -rf next/static/chunks/app/_not-found next/static/chunks/pages
find next/static -maxdepth 1 -type d -name '*' ! -name static ! -name chunks ! -name css ! -name media -exec rm -rf {} +
python3 -c "
import os,json
fs=[{'as':os.path.join(r,x)[2:],'path':os.path.abspath(os.path.join(r,x))} for r,d,fl in os.walk('.') for x in fl]
json.dump(fs,open('/tmp/files.json','w'),separators=(',',':')); print(len(fs),'files')"
