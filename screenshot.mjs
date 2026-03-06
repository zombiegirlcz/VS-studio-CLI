import puppeteer from 'puppeteer'

;(async () => {
  console.log('Starting browser...')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  try {
    const page = await browser.newPage()
    page.setDefaultTimeout(30000)
    page.setDefaultNavigationTimeout(30000)
    
    console.log('Loading page: http://localhost:5173/')
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 30000 })
    
    console.log('Waiting 5 seconds for render...')
    await new Promise(r => setTimeout(r, 5000))
    
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
    console.log('✅ Screenshot saved')
    
    const state = await page.evaluate(() => {
      const root = document.getElementById('root')
      return {
        rootExists: !!root,
        rootChildren: root?.childNodes.length,
        rootHTML: root?.innerHTML.substring(0, 500)
      }
    })
    
    console.log('Root children:', state.rootChildren)
    console.log('Root HTML:', state.rootHTML ? state.rootHTML.substring(0, 200) : '[EMPTY]')
    
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await browser.close()
  }
})()
