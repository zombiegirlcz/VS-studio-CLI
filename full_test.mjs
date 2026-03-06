import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n=== TAKING FULL SCREENSHOT ===\n');
  await page.screenshot({ path: 'app_full.png', fullPage: true });
  console.log('✅ Full screenshot: app_full.png');
  
  // Now test different buttons
  console.log('\n=== TESTING BUTTONS ===\n');
  
  const tests = [
    { name: 'Start Drawing', shouldFind: true },
    { name: 'Zen Mode', shouldFind: true },
    { name: '⚡ Activate God Mode', shouldFind: true },
    { name: 'Send', shouldFind: true }
  ];
  
  for (const test of tests) {
    const found = await page.evaluate((btnText) => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.some(b => b.textContent.includes(btnText));
    }, test.name);
    
    console.log(`"${test.name}": ${found ? '✅ Found' : '❌ NOT FOUND'}`);
  }
  
  await browser.close();
})();
