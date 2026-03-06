import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  console.log('🔍 DEEP DIAGNOSTIC ANALYSIS\n');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Track console
  const logs = [];
  page.on('console', msg => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });
  
  page.on('error', e => console.log('[ERROR]', e.message));
  page.on('pageerror', e => console.log('[PAGEERROR]', e.message));
  
  console.log('Loading page...\n');
  
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 8000 });
  } catch(e) {
    console.log('Timeout (normal):', e.message.substring(0, 40));
  }
  
  // Wait for render
  await new Promise(r => setTimeout(r, 2000));
  
  // Take multiple snapshots
  console.log('\n📸 DOM State Snapshots:');
  for (let i = 0; i < 3; i++) {
    const state = await page.evaluate(() => {
      const root = document.getElementById('root');
      const div = root?.querySelector('div');
      const canvas = document.querySelector('canvas');
      const link = document.querySelector('link[rel="stylesheet"]');
      return {
        rootLen: root?.innerHTML?.length || 0,
        divBG: div ? window.getComputedStyle(div).backgroundColor : 'NO DIV',
        canvas: !!canvas,
        cssLink: link?.href || 'NO LINK',
        bodBG: window.getComputedStyle(document.body).backgroundColor
      };
    });
    
    console.log(`Snapshot ${i}:`, state);
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log('\n📋 Console Logs:', logs.length ? logs.slice(-10) : 'NONE');
  
  // Save HTML
  const html = await page.content();
  fs.writeFileSync('diagnostic_page.html', html);
  console.log('\n✅ HTML saved to diagnostic_page.html');
  console.log('First 500 chars:');
  console.log(html.substring(0, 500));
  
  await page.screenshot({ path: 'full_diagnostic.png' });
  
  await browser.close();
})();
