import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', e => errors.push(e.message));
  
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 5000 }).catch(() => {});
  
  await new Promise(r => setTimeout(r, 2000));
  
  const state = await page.evaluate(() => {
    const root = document.getElementById('root');
    return {
      rootHTML: root?.innerHTML?.substring(0, 200) || 'EMPTY',
      errors: window.errors || 'none',
      hasReactApp: !!root?.firstChild
    };
  });
  
  console.log('Root HTML:', state.rootHTML);
  console.log('Errors:', errors.length ? errors : 'none');
  
  await browser.close();
})();
