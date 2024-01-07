const { Given, When, Then } = require('@cucumber/cucumber');
const {chromium, expect} = require('@playwright/test')

let browser
let page

Given('You are in login page', async function () {
  browser = await chromium.launch({headless: false})
  page = await browser.newPage()
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
});

When('Insert valid credentials and click login', async function () {
  await page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input').fill('Admin')
  await page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input').fill('admin123')
  await page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button').click()
});

Then('Login should be successful', async function () {
  expect(await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[2]/ul/li/span')).toBeVisible()
});

Given('Logout from account', async function () {
  await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[2]/ul/li/span').click()
  await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[2]/ul/li/ul/li[4]/a').click()
});

When('Insert invalid credentials and click login', async function () {
  await page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input').fill('notAdmin')
  await page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input').fill('invalidPassword')
  await page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button').click()
});

Then('Login should fail', async function () {
  expect(await page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/div/div[1]/div[1]/p')).toBeVisible()
});
