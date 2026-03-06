import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const viewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'iPhone', width: 375, height: 667 },
    { name: 'Android', width: 412, height: 915 }
  ];
  
  console.log('📱 MOBILE RESPONSIVENESS AUDIT\n');
  
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 5000 }).catch(() => {});
    
    const state = await page.evaluate(() => {
      const root = document.getElementById('root');
      const mainDiv = root?.querySelector('div');
      return {
        rootSize: `${mainDiv?.offsetWidth}x${mainDiv?.offsetHeight}`,
        cssDisplay: mainDiv ? window.getComputedStyle(mainDiv).display : 'N/A',
        flexDir: mainDiv ? window.getComputedStyle(mainDiv).flexDirection : 'N/A',
        panels: document.querySelectorAll('[class*="panel"], [class*="Panel"]').length,
        isMobileLayout: window.innerWidth < 768
      };
    });
    
    console.log(`${vp.name} (${vp.width}x${vp.height}):`);
    console.log(`  Root size: ${state.rootSize}`);
    console.log(`  Layout: ${state.cssDisplay} / ${state.flexDir}`);
    console.log(`  Panels: ${state.panels}`);
    console.log(`  Mobile layout: ${state.isMobileLayout ? '✓' : '✗'}\n`);
  }
  
  await browser.close();
})();
