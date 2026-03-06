import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n=== TESTING CANVAS DRAG & DROP FIX ===\n');
  
  const result = await page.evaluate(async () => {
    // Find a component to drag
    const componentButtons = Array.from(document.querySelectorAll('button'));
    const boxBtn = componentButtons.find(b => b.textContent.includes('box') || b.textContent.includes('Box'));
    
    if (!boxBtn) return { error: 'No box component found' };
    
    console.log('1. Found box button, dragging to canvas...');
    
    // Get canvas container
    const canvasContainer = document.querySelector('div[style*="relative"][style*="100%"]');
    if (!canvasContainer) return { error: 'No canvas container found' };
    
    // Simulate drag start on button
    const dragStartEvent = new DragEvent('dragstart', {
      bubbles: true,
      cancelable: true,
      dataTransfer: new DataTransfer()
    });
    dragStartEvent.dataTransfer.setData('nodeType', 'box');
    boxBtn.dispatchEvent(dragStartEvent);
    
    console.log('2. Drag started, moving to canvas...');
    
    await new Promise(r => setTimeout(r, 200));
    
    // Simulate drop on canvas
    const dropEvent = new DragEvent('drop', {
      bubbles: true,
      cancelable: true,
      clientX: 400,
      clientY: 300,
      dataTransfer: new DataTransfer()
    });
    dropEvent.dataTransfer.setData('nodeType', 'box');
    
    Object.defineProperty(dropEvent, 'currentTarget', {
      value: canvasContainer,
      enumerable: true
    });
    
    canvasContainer.dispatchEvent(dropEvent);
    console.log('3. Drop completed');
    
    await new Promise(r => setTimeout(r, 500));
    
    // Check if node was added
    const nodes = canvasContainer.querySelectorAll('div[style*="absolute"]');
    const boxNodes = Array.from(nodes).filter(n => n.textContent.includes('Box'));
    
    console.log(`4. Found ${boxNodes.length} box node(s)`);
    
    if (boxNodes.length > 0) {
      const boxNode = boxNodes[0];
      const style = boxNode.getAttribute('style');
      console.log('5. Found box node! Now testing drag...');
      
      // Get initial position
      const rect = boxNode.getBoundingClientRect();
      console.log(`Initial position: ${rect.left}, ${rect.top}`);
      
      // Simulate mouse drag
      const mouseDown = new MouseEvent('mousedown', {
        bubbles: true,
        clientX: rect.left + 20,
        clientY: rect.top + 20
      });
      
      boxNode.dispatchEvent(mouseDown);
      console.log('6. Mouse down on node');
      
      await new Promise(r => setTimeout(r, 100));
      
      const mouseMove = new MouseEvent('mousemove', {
        bubbles: true,
        clientX: rect.left + 70,
        clientY: rect.top + 70
      });
      
      document.dispatchEvent(mouseMove);
      console.log('7. Mouse moved');
      
      await new Promise(r => setTimeout(r, 100));
      
      const mouseUp = new MouseEvent('mouseup', {
        bubbles: true,
        clientX: rect.left + 70,
        clientY: rect.top + 70
      });
      
      document.dispatchEvent(mouseUp);
      console.log('8. Mouse up');
      
      await new Promise(r => setTimeout(r, 500));
      
      // Check if position changed
      const newRect = boxNode.getBoundingClientRect();
      console.log(`New position: ${newRect.left}, ${newRect.top}`);
      
      const positionChanged = Math.abs(rect.left - newRect.left) > 5 || Math.abs(rect.top - newRect.top) > 5;
      
      return {
        success: true,
        nodeAdded: true,
        boxNodesCount: boxNodes.length,
        positionChanged: positionChanged,
        initialPos: { x: rect.left, y: rect.top },
        newPos: { x: newRect.left, y: newRect.top }
      };
    }
    
    return {
      success: false,
      nodeAdded: false,
      boxNodesCount: boxNodes.length
    };
  });
  
  console.log('\nResult:');
  console.log(JSON.stringify(result, null, 2));
  
  if (result.positionChanged) {
    console.log('\n✅ DRAG & DROP WORKS! Position changed!');
  } else if (result.nodeAdded) {
    console.log('\n⚠️ Node added but position didn\'t change (drag might need more testing)');
  } else {
    console.log('\n❌ Node wasn\'t added');
  }
  
  await page.screenshot({ path: 'drag_drop_test.png' });
  console.log('\n✅ Screenshot: drag_drop_test.png');
  
  await browser.close();
})();
