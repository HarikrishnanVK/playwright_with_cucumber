import { After, Before, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { Environment } from "../package.json";

let page: Page;
let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(60000);

Before(async () => {
    try {
        browser = await chromium.launch(
            {
                args: ["--start-maximized"],
                headless: false
            });
        context = await browser.newContext({ viewport: null });
        page = await context.newPage();
        await page.goto(Environment.demoBlazeURL);
        console.log(`captured site title as ${await page.title()}`);
    }
    catch (error) {
        console.log(`chrome navigation to site failed due to ${error}`)
        throw new Error(`chrome navigation to site failed due to ${error}`);
    }
    return page;
});

After(async function (Scenario) {
    if (Scenario.result!.status === Status.FAILED) {
        await this.attach(await page.screenshot({ path: `./Screenshots/${Scenario.pickle.name}.png`, fullPage: true }), "image/png");
    }
    await context.close();
    await page.close();
    await browser.close();
});

export { page, browser, context };


