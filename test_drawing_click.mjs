import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  let clickCount = 0;
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('Drawing')) {
      console.log('CONSOLE:', text);
      clickCount++;
    }
  });
  
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n=== CHECKING ZUSTAND STORE ===\n');
  
  // Get initial drawing state
  const initial = await page.evaluate(() => {
    try {
      // Try to find the store in window
      return {
        drawingStoreFound: !!window.__ZUSTAND_DEVTOOLS_STORE__,
        msg: 'Checking for Zustand store...'
      };
    } catch (e) {
      return { error: e.message };
    }
  });
  
  console.log('Initial check:', initial);
  
  // Try clicking the button with detailed tracking
  console.log('\n=== CLICKING "Start Drawing" ===\n');
  
  const result = await page.evaluate(async () => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const drawingBtn = buttons.find(b => b.textContent.includes('Start Drawing'));
    
    if (!drawingBtn) {
      return { error: 'Button not found', buttonsFound: buttons.length };
    }
    
    console.log('Button found, clicking...');
    drawingBtn.click();
    
    // Give React time to update
    await new Promise(r => setTimeout(r, 500));
    
    // Check if button text changed
    const newText = drawingBtn.textContent;
    return {
      success: true,
      oldText: 'Start Drawing',
      newText: newText,
      changed: !newText.includes('Start Drawing')
    };
  });
  
  console.log('Click result:', result);
  
  // Take screenshot to see if UI updated
  await page.screenshot({ path: 'drawing_test.png' });
  console.log('\n✅ Screenshot: drawing_test.png');
  
  await browser.close();
})();
