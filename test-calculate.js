const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000/ohms-law', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('#ol-voltage', { timeout: 10000 });
    
    // Fill in voltage and current
    await page.fill('#ol-voltage', '12');
    await page.fill('#ol-current', '2');
    
    // Click Calculate
    await page.click('.btn-primary');
    
    // Wait for results
    await page.waitForTimeout(1000);
    
    // Check if results are visible
    const resultsPanel = await page.locator('.calc-results').first();
    const hasResultsClass = await resultsPanel.evaluate(el => el.querySelector('.results-container.results-visible') !== null);
    const placeholderVisible = await resultsPanel.evaluate(el => el.querySelector('.results-placeholder') !== null);
    
    console.log('Results container visible:', hasResultsClass);
    console.log('Placeholder visible:', placeholderVisible);
    
    // Get result values
    const resultValues = await page.locator('.result-value').allTextContents();
    console.log('Result values:', resultValues);
    
    await page.screenshot({ path: 'C:/Users/MRLAWA~1/AppData/Local/Temp/kilo/ohms-law-results.png', fullPage: true });
    console.log('Screenshot saved');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
