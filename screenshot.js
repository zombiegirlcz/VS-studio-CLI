const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

;(async () => {
  console.log('Starting browser...')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  try {
    const page = await browser.newPage()
    page.setDefaultTimeout(10000)
    
    console.log('Loading page: http://localhost:5173/')
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' })
    
    console.log('Waiting 3 seconds for render...')
    await new Promise(r => setTimeout(r, 3000))
    
    // Take screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
    console.log('Screenshot saved: screenshot.png')
    
    // Get page content info
    const content = await page.content()
    console.log('Page HTML length:', content.length)
    console.log('Page title:', await page.title())
    
    // Check if root has children
    const rootChildren = await page.evaluate(() => {
      const root = document.getElementById('root')
      return {
        rootExists: !!root,
        rootHTML: root?.innerHTML.substring(0, 200),
        bodyHTML: document.body.innerHTML.substring(0, 200),
        computedBg: window.getComputedStyle(document.body).backgroundColor,
        computedFg: window.getComputedStyle(document.body).color
      }
    })
    
    console.log('\nPage Analysis:')
    console.log('Root exists:', rootChildren.rootExists)
    console.log('Root HTML (first 200 chars):', rootChildren.rootHTML)
    console.log('Body background color:', rootChildren.computedBg)
    console.log('Body text color:', rootChildren.computedFg)
    
    // Check for errors
    const errors = []
    page.on('error', err => errors.push(err.toString()))
    page.on('pageerror', err => errors.push(err.toString()))
    
    if (errors.length > 0) {
      console.log('\nConsole Errors:')
      errors.forEach(e => console.log(' -', e))
    }
    
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await browser.close()
  }
})()
