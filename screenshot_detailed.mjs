import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const responses = [];
  page.on('response', response => {
    responses.push(`${response.status()} ${response.url()}`);
  });
  
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'domContentLoaded', timeout: 5000 });
  } catch(e) {
    console.log('Goto timeout (expected):', e.message.substring(0, 50));
  }
  
  await new Promise(r => setTimeout(r, 2000)); // Wait for render
  
  console.log('Network requests:');
  responses.forEach(r => console.log('  ' + r));
  
  // Get computed styles
  const bodyStyle = await page.evaluate(() => {
    const body = document.querySelector('body');
    const root = document.getElementById('root');
    const computed = window.getComputedStyle(body);
    return {
      bodyBG: computed.backgroundColor,
      bodyColor: computed.color,
      rootHTML: root?.innerHTML?.substring(0, 150) || 'EMPTY ROOT'
    };
  });
  console.log('\nBody styles:', bodyStyle);
  
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
  console.log('\n✅ Screenshot saved');
})();
