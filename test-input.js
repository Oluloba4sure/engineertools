const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000/ohms-law', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('#ol-voltage', { timeout: 10000 });
    
    const input = await page.locator('#ol-voltage');
    const tagName = await input.evaluate(el => el.tagName);
    const disabled = await input.evaluate(el => el.disabled);
    const readonly = await input.evaluate(el => el.readOnly);
    const type = await input.evaluate(el => el.type);
    const value = await input.evaluate(el => el.value);
    
    console.log('Tag:', tagName);
    console.log('Type:', type);
    console.log('Disabled:', disabled);
    console.log('ReadOnly:', readonly);
    console.log('Initial value:', JSON.stringify(value));
    
    await input.fill('12');
    const newValue = await input.evaluate(el => el.value);
    console.log('After fill value:', JSON.stringify(newValue));
    
    await page.screenshot({ path: 'C:/Users/MRLAWA~1/AppData/Local/Temp/kilo/ohms-law.png', fullPage: true });
    console.log('Screenshot saved');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
