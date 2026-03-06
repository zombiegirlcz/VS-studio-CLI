import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const consoleMessages = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(text);
    if (text.includes('Error') || text.includes('error')) {
      console.log('⚠️  CONSOLE:', text);
    }
  });
  
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n=== BEFORE CLICK ===\n');
  
  // Get initial state
  const initialState = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    return {
      canvasExists: !!canvas,
      canvasStyle: canvas?.style.cssText || 'N/A',
      rootHtml: document.getElementById('root').innerHTML.substring(0, 300)
    };
  });
  
  console.log('Initial canvas:', initialState.canvasExists);
  
  console.log('\n=== CLICKING BUTTONS ===\n');
  
  // Try clicking "Start Drawing" button
  try {
    const selector = 'button:has-text("Start Drawing")';
    const buttons = await page.$$('button');
    
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Start Drawing')) {
        console.log('Found: "Start Drawing" button, clicking...');
        await btn.click();
        console.log('✅ Clicked');
        break;
      }
    }
  } catch (e) {
    console.log('Error clicking:', e.message);
  }
  
  // Wait for any updates
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('\n=== AFTER CLICK ===\n');
  
  // Check state after click
  const afterState = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const divs = document.querySelectorAll('[class*="drawing"]');
    return {
      divCount: divs.length,
      canvasStyle: canvas?.style.cssText,
      classNames: Array.from(divs).map(d => d.className)
    };
  });
  
  console.log('Drawing divs found:', afterState.divCount);
  console.log('Canvas style changed:', initialState.canvasStyle !== afterState.canvasStyle);
  
  console.log('\n=== CONSOLE MESSAGES ===\n');
  const errorMessages = consoleMessages.filter(m => m.includes('Error'));
  if (errorMessages.length > 0) {
    errorMessages.forEach(msg => console.log(msg));
  } else {
    console.log('No errors in console');
  }
  
  await page.screenshot({ path: 'click_debug.png' });
  console.log('\n✅ Screenshot: click_debug.png');
  
  await browser.close();
})();
