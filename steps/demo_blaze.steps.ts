import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { DemoBlazePage } from '../pages/demo_blaze.page';

const demoBlazePage = new DemoBlazePage();

Given('I am on {string} page', async (expectedText) => {
    await demoBlazePage.verifyPage(expectedText);
});

When('I click categories link', async () => {
    await demoBlazePage.clickCategoriesLink();
});

Then('I see {string}, {string} and {string} under categories', async (string, string2, string3) => {
    await demoBlazePage.verifyCategoriesList(string, string2, string3);
});

When('I choose {string}', async (expectedCategory) => {
    await demoBlazePage.selectCategoryFromList(expectedCategory);
});

Then('I see {string} in display', async (actualProdduct) => {
    var isProductDisplayed = await demoBlazePage.isRightProductSelected(actualProdduct);
    expect(isProductDisplayed).toBeTruthy();
});
