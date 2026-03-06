import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  
  // Test mobile viewport
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 5000 }).catch(() => {});
  
  const state = await page.evaluate(() => {
    return {
      hasTabs: !!document.querySelector('[role="tablist"]') || document.querySelectorAll('button').length > 2,
      tabCount: document.querySelectorAll('button').length,
      canvasVisible: !!document.querySelector('canvas'),
      tabBar: !!document.querySelector('div[style*="position: fixed"][style*="bottom"]'),
      viewport: `${window.innerWidth}x${window.innerHeight}`
    };
  });
  
  console.log('\n📱 MOBILE VERSION TEST (375x667):');
  console.log('  Viewport:', state.viewport);
  console.log('  Tab bar visible:', state.tabBar ? '✓' : '✗');
  console.log('  Buttons found:', state.tabCount);
  console.log('  Canvas visible:', state.canvasVisible ? '✓' : '✗');
  
  await page.screenshot({ path: 'mobile_screenshot.png' });
  await browser.close();
  console.log('\n✅ Mobile screenshot saved');
})();
