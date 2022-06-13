import { After, Before, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, chromium, Page } from 'playwright';

let page: Page;
let browser: Browser;

setDefaultTimeout(60000);

Before(async () => {
    try {
        browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://www.demoblaze.com/");
        console.log(`captured site title as ${await page.title()}`);
    }
    catch (error) {
        console.log(`chrome navigation to demo site failed due to ${error}`)
        throw new Error(`chrome navigation to demo site failed due to ${error}`);
    }
    return page;
});

After(async function(Scenario) {
    if (Scenario.result!.status === Status.FAILED) {
        await this.attach(await page.screenshot({ path: `./Screenshots/${Scenario.pickle.name}.png`, fullPage: true }), "image/png");
    }
    await browser.close();
});

export { page, browser };



