const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Test a few different calculators
    const calculators = [
      { slug: 'electrical-power', inputs: ['#ep-power', '#ep-voltage', '#ep-current'], expectedResults: 4 },
      { slug: 'motor-speed', inputs: ['#ms-frequency', '#ms-poles'], expectedResults: 1 },
      { slug: 'unit-converter', inputs: ['#uc-value'], expectedResults: 1 },
    ];
    
    for (const calc of calculators) {
      await page.goto(`http://localhost:3000/${calc.slug}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForSelector(calc.inputs[0], { timeout: 10000 });
      
      for (const input of calc.inputs) {
        await page.fill(input, '50');
      }
      
      await page.click('.btn-primary');
      await page.waitForTimeout(1000);
      
      const resultValues = await page.locator('.result-value').allTextContents();
      const hasResults = resultValues.some(v => v !== '—');
      
      console.log(`${calc.slug}:`);
      console.log(`  Results found: ${resultValues.length}`);
      console.log(`  Has actual results: ${hasResults}`);
      console.log(`  Values: ${resultValues.slice(0, 3).join(', ')}`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
