const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const shot = async (svgFile, size, out) => {
    const svg = fs.readFileSync(svgFile, 'utf8');
    await p.setViewportSize({ width: size, height: size });
    await p.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
    await p.screenshot({ path: out, omitBackground: true });
  };
  await shot('icon.svg', 192, 'icons/icon-192.png');
  await shot('icon.svg', 512, 'icons/icon-512.png');
  await shot('icon-maskable.svg', 512, 'icons/icon-maskable-512.png');
  await shot('icon-maskable.svg', 180, 'icons/apple-touch-icon.png');
  await shot('icon.svg', 64, 'icons/favicon-64.png');
  await b.close();
})();
