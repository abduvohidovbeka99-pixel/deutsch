#!/bin/bash
# Собирает устанавливаемое приложение (PWA) в папку dist/
set -e
cd "$(dirname "$0")"
./build.sh
rm -rf dist && mkdir -p dist/icons
python3 - <<'PY'
import hashlib, re
src = open('index.html', encoding='utf-8').read()
cut = src.index('<header class="topbar">')
head, body = src[:cut], src[cut:]
head = head.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '')
page = f'''<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0b0e22">
<meta name="description" content="Немецкий от A0 до C1: 3000 слов, грамматика, тексты, интервальное повторение">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Wortweg">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/favicon.svg" type="image/svg+xml">
<link rel="icon" href="icons/favicon-64.png" sizes="64x64" type="image/png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<script>window.WW_PWA = true;</script>
<style>
:root {{ padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }}
body {{ margin: 0; -webkit-tap-highlight-color: transparent; overscroll-behavior-y: none; }}
img {{ max-width: 100%; }}
[hidden] {{ display: none !important; }}
</style>
{head}</head>
<body>
{body}
</body>
</html>
'''
open('dist/index.html', 'w', encoding='utf-8').write(page)
ver = hashlib.sha1(page.encode()).hexdigest()[:10]
sw = open('pwa/sw.js', encoding='utf-8').read().replace('__VERSION__', ver)
open('dist/sw.js', 'w', encoding='utf-8').write(sw)
print('PWA version', ver)
PY
cp pwa/manifest.webmanifest dist/
cp pwa/icons/*.png pwa/icons/favicon.svg dist/icons/
touch dist/.nojekyll
