const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000/unit-converter', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('#uc-value', { timeout: 10000 });
    
    const input = await page.locator('#uc-value');
    await input.fill('100');
    const value = await input.evaluate(el => el.value);
    console.log('UnitConverter input value:', value);
    
    const result = await page.locator('.result-value').first().textContent();
    console.log('UnitConverter result:', result);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
