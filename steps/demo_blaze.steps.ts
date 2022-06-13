import { Given, When, Then } from '@cucumber/cucumber'
import { page } from '../steps/world'
import { expect } from '@playwright/test'

Given('I am on {string} page', async (expectedText) => {
    const actualText = await page.locator(`a[id='nava']`).textContent();
    expect(expectedText).toEqual(actualText!.trim());
});

When('I click categories link', async () => {
    await page.locator(`//div[@class='list-group']//a[1]`).click();
});

Then('I see {string}, {string} and {string} under categories', async (string, string2, string3) => {
    const actualSubLinks = await page.locator(`//div[@class='list-group']//a[not(@id='cat')]`).allTextContents();
    const expectedSubLinks = [string, string2, string3];
    expect(actualSubLinks).toEqual(expectedSubLinks);;
});

When('I choose {string}', async (expectedCategory) => {
    const subLinks = page.locator(`//div[@class='list-group']//a`);
    const subLinksCount = await page.locator(`//div[@class='list-group']//a`).count();
    for (var i = 0; i < subLinksCount; i++) {
        if ((await subLinks.nth(i).textContent()).match(expectedCategory)) {
            await subLinks.nth(i).click();
            break;
        }
    }
});

Then('I see {string} in display', async (actualProdduct) => {
    const product = page.locator(`//h4[@class='card-title']//a[text()='${actualProdduct}']`);
    await expect(product).toBeEnabled();
    expect(product).toBeTruthy();
});
