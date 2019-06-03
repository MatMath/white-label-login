require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');

const { HEADLESS } = process.env;
const chromeOptions = new Chrome.Options();
if (HEADLESS) {
  chromeOptions.headless();
}

describe('placeholder', () => {
  let driver;
  before(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should have find the title on the page', async () => {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q'))
      .sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  });
});