import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (e) {
    console.log('Navigation:', e.message);
  }
  
  console.log('\n=== BUTTONS FOUND ===\n');
  
  const buttons = await page.$$eval('button', buttons => 
    buttons.map(b => ({
      text: b.textContent?.trim().substring(0, 40),
      visible: b.offsetHeight > 0
    }))
  );
  
  console.log(`Total: ${buttons.length} buttons`);
  buttons.forEach((btn, i) => console.log(`${i}. ${btn.text} (visible: ${btn.visible})`));
  
  // Check App.tsx structure
  console.log('\n=== CHECKING APP STRUCTURE ===\n');
  const structure = await page.evaluate(() => {
    const app = document.getElementById('root');
    const divCount = document.querySelectorAll('div').length;
    const spanCount = document.querySelectorAll('span').length;
    const inputCount = document.querySelectorAll('input').length;
    
    return {
      appExists: !!app,
      rootChildren: app?.children.length,
      divs: divCount,
      spans: spanCount,
      inputs: inputCount,
      bodyHTML: document.body.innerHTML.substring(0, 200)
    };
  });
  
  console.log(JSON.stringify(structure, null, 2));
  
  console.log('\n=== TAKING SCREENSHOT ===\n');
  await page.screenshot({ path: 'button_debug.png', fullPage: false });
  console.log('✅ Saved: button_debug.png');
  
  await browser.close();
})();
