const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });
  
  try {
    await page.goto('http://localhost:3000/ohms-law', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('#ol-voltage', { timeout: 10000 });
    
    await page.fill('#ol-voltage', '12');
    await page.fill('#ol-current', '2');
    await page.click('.btn-primary');
    await page.waitForTimeout(2000);
    
    console.log('=== Console Logs ===');
    consoleLogs.forEach(log => console.log(log));
    
    const resultValues = await page.locator('.result-value').allTextContents();
    console.log('Result values:', resultValues);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
