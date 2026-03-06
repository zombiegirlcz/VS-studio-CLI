import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('🔍 Testing diagnostic page...\n');
  
  await page.goto('http://localhost:5173/diagnostic', { waitUntil: 'domcontentloaded' });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check what's on the page
  const content = await page.evaluate(() => {
    const title = document.title;
    const h1 = document.querySelector('h1');
    const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim());
    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim());
    
    return {
      title,
      mainTitle: h1?.textContent.trim(),
      sections: h2s,
      buttonCount: buttons.length,
      firstFewButtons: buttons.slice(0, 5)
    };
  });
  
  console.log('✅ Title:', content.title);
  console.log('✅ Main title:', content.mainTitle);
  console.log(`✅ Sections: ${content.sections.length}`);
  console.log(`✅ Buttons found: ${content.buttonCount}`);
  console.log('\nFirst buttons:');
  content.firstFewButtons.forEach((btn, i) => console.log(`  ${i+1}. ${btn}`));
  
  // Take screenshot
  await page.screenshot({ path: 'diagnostic_test.png', fullPage: true });
  console.log('\n✅ Screenshot saved: diagnostic_test.png');
  
  await browser.close();
})();
