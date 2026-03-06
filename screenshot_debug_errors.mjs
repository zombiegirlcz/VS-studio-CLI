import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const logs = [];
  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('error', e => logs.push(`[page-error] ${e}`));
  page.on('pageerror', e => logs.push(`[page-error] ${e.message}`));
  
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 3000 });
  } catch(e) {}
  
  await new Promise(r => setTimeout(r, 1500));
  
  console.log('📋 Console/Errors:');
  logs.forEach(l => console.log('  ' + l));
  
  // Try to execute JS
  try {
    const result = await page.evaluate(() => {
      return {
        windowErrors: window.__errors__ || 'none',
        rootContent: document.getElementById('root')?.innerHTML?.substring(0, 100) || 'EMPTY'
      };
    });
    console.log('\nWindow state:', result);
  } catch(e) {
    console.log('Error evaluating:', e.message);
  }
  
  await browser.close();
})();
