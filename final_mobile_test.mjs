import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  console.log('\n📱 FINAL MOBILE VERSION TEST\n');
  
  // Test all viewports
  const tests = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'Android (Galaxy S21)', width: 360, height: 800 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];

  for (const test of tests) {
    await page.setViewport({ width: test.width, height: test.height });
    await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 5000 }).catch(() => {});
    
    const state = await page.evaluate(() => {
      const tabs = document.querySelectorAll('button').length;
      const canvas = !!document.querySelector('canvas');
      const tabBar = !!document.querySelector('div[style*="position: fixed"][style*="bottom"]');
      const header = !!document.querySelector('div[style*="backgroundColor: #1f2937"]');
      return { tabs, canvas, tabBar, header };
    });
    
    const type = test.width < 768 ? '📱' : '🖥️';
    console.log(`${type} ${test.name} (${test.width}x${test.height}):`);
    console.log(`   Canvas: ${state.canvas ? '✓' : '✗'} | Header: ${state.header ? '✓' : '✗'} | TabBar: ${state.tabBar ? '✓' : '✗'} | Tabs: ${state.tabs}`);
  }
  
  // Final mobile screenshot
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 5000 }).catch(() => {});
  await page.screenshot({ path: 'final_mobile.png', fullPage: true });
  
  // Desktop screenshot
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 5000 }).catch(() => {});
  await page.screenshot({ path: 'final_desktop.png', fullPage: true });
  
  await browser.close();
  console.log('\n✅ Screenshots saved: final_mobile.png, final_desktop.png');
})();
