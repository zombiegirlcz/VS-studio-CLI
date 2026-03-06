import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const allRequests = [];
  const allResponses = [];
  
  page.on('request', r => {
    allRequests.push({
      url: r.url(),
      method: r.method(),
      resourceType: r.resourceType()
    });
  });
  
  page.on('response', r => {
    allResponses.push({
      url: r.url().split('/').pop(),
      status: r.status(),
      contentType: r.headers()['content-type']
    });
  });
  
  page.on('requestfailed', r => {
    console.log('[FAILED]', r.url());
  });
  
  console.log('Loading...');
  await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 8000 }).catch(() => {});
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log('\n📡 ALL NETWORK ACTIVITY:\n');
  console.log('=== RESPONSES ===');
  allResponses.forEach(r => {
    console.log(`${r.status} | ${r.url.padEnd(40)} | ${r.contentType}`);
  });
  
  console.log('\n=== REQUESTS ===');
  allRequests.slice(0, 15).forEach(r => {
    console.log(`${r.method.padEnd(6)} | ${r.resourceType.padEnd(12)} | ${r.url.split('/').pop()}`);
  });
  
  await browser.close();
})();
