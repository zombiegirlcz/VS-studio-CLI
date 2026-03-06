import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const info = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    
    return {
      totalButtons: buttons.length,
      firstFewButtons: Array.from(buttons).slice(0, 5).map(b => ({
        text: b.textContent.substring(0, 30),
        visible: b.offsetHeight > 0
      })),
      appExists: !!document.getElementById('root'),
      isMobile: window.innerWidth < 768,
      windowSize: `${window.innerWidth}x${window.innerHeight}`
    };
  });
  
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
