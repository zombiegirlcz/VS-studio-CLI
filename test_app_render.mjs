import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Collect all messages
  const messages = [];
  page.on('console', msg => messages.push(`[${msg.type()}] ${msg.text()}`));
  page.on('response', resp => messages.push(`[HTTP] ${resp.status()} ${resp.url().split('/').pop()}`));
  
  // Load / page with hardRefresh
  await page.setCacheEnabled(false); // Disable cache
  await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 5000 }).catch(e => {});
  
  await new Promise(r => setTimeout(r, 2000));
  
  // Check what loaded
  const result = await page.evaluate(() => {
    const root = document.getElementById('root');
    const body = document.body;
    const html = document.documentElement;
    return {
      rootExists: !!root,
      rootLength: root?.innerHTML?.length || 0,
      bodyBG: window.getComputedStyle(body).backgroundColor,
      bodyHTML: body?.innerHTML?.substring(0, 200) || '',
      hasCanvas: !!document.querySelector('canvas'),
      hasScript: !!document.querySelector('script[type="module"]'),
      windowApp: !!window.app,
      documentReady: document.readyState
    };
  });
  
  console.log('\n=== NETWORK & CONSOLE ===');
  messages.slice(0, 20).forEach(m => console.log(m));
  
  console.log('\n=== PAGE STATE ===');
  console.log(JSON.stringify(result, null, 2));
  
  await page.screenshot({ path: 'test_screenshot.png', fullPage: true });
  
  await browser.close();
})();
