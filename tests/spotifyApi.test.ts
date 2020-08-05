import dotenv from 'dotenv';
const puppeteer = require('puppeteer');

dotenv.config();

const HOST = process.env.HOST;

//checking if OAuth works
describe('OAuth flow for Spotify API', () => {
  test('should redirect to spotify login page', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${HOST}`);
    const url = await page.url();
    expect(url).toMatch(/accounts\.spotify\.com/);
    browser.close();
  });
});
