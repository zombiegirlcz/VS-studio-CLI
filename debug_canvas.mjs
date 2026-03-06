import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const events = [];
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('drag') || text.includes('drop') || text.includes('mouse') || text.includes('Canvas')) {
      console.log('CONSOLE:', text);
      events.push(text);
    }
  });
  
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n=== TESTING CANVAS DRAG & DROP ===\n');
  
  // Test drag and drop
  const result = await page.evaluate(async () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return { error: 'No canvas found' };
    
    const rect = canvas.getBoundingClientRect();
    const startX = rect.width / 2;
    const startY = rect.height / 2;
    const endX = rect.width / 2 + 50;
    const endY = rect.height / 2 + 50;
    
    console.log('Canvas found, simulating drag...');
    
    // Create mouse events
    const events = [];
    
    const mouseDown = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX: startX,
      clientY: startY
    });
    
    const mouseMove = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: endX,
      clientY: endY
    });
    
    const mouseUp = new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      clientX: endX,
      clientY: endY
    });
    
    // Dispatch events
    canvas.dispatchEvent(mouseDown);
    console.log('Dispatched mousedown');
    
    await new Promise(r => setTimeout(r, 100));
    
    canvas.dispatchEvent(mouseMove);
    console.log('Dispatched mousemove');
    
    await new Promise(r => setTimeout(r, 100));
    
    canvas.dispatchEvent(mouseUp);
    console.log('Dispatched mouseup');
    
    // Check canvas drawing
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasPixels = imageData.data.some(byte => byte > 0);
    
    return {
      canvasExists: true,
      canvasSize: `${canvas.width}x${canvas.height}`,
      hasMouseListeners: canvas.onmousedown !== null || canvas.onmousemove !== null,
      canvasHasPixels: hasPixels,
      eventsDispatched: true
    };
  });
  
  console.log('\nResult:', JSON.stringify(result, null, 2));
  
  // Check CanvasEngine source
  console.log('\n=== CHECKING CANVAS ENGINE ===\n');
  const checkEngine = await page.evaluate(() => {
    const files = [
      'src/canvas/engine.ts',
      'src/creative/drawing/DrawingCanvas.tsx',
      'src/app/App.tsx'
    ];
    
    return {
      windowKeys: Object.keys(window).filter(k => k.includes('canvas') || k.includes('Canvas')).slice(0, 5),
      bodyHtml: document.body.innerHTML.substring(0, 200)
    };
  });
  
  console.log('Window keys:', checkEngine.windowKeys);
  
  await page.screenshot({ path: 'canvas_test.png' });
  console.log('\n✅ Screenshot: canvas_test.png');
  
  await browser.close();
})();
