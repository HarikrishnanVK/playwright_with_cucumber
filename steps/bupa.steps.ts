import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { BupaPage } from '../pages/bupa_page';

const bupa = new BupaPage();

Given('I am on Bupa homepage', async () => {
    await bupa.verifyHomePage();
});

When('I mouse hover on {string} link', async (linkName: string) => {
    await bupa.mouseHoverOnLink(linkName);
});

Then('I see the sub links of our Bupa', async () => {
    await bupa.verifySubLinksOfOurBupa();
});

When('I click {string} from sub links', async (subLinkName: string) => {
    await bupa.selectSubLink(subLinkName);
});

Then('I see the page title as {string}', async (expectedPageTitle: string) => {
    const actualPageTitle = await bupa.returnPageTitle();
    expect(actualPageTitle.toLowerCase()).toContain(expectedPageTitle.toLowerCase());
});

When('I search for {string}', async (textContent: string) => {
    await bupa.searchContent(textContent);
});

Then('I see results about {string}', async (result: string) => {
    await bupa.verifySearchResult(result);
});

When('I click first url from the results', async () => {
    await bupa.navigateToFirstLink();
});

Then(`I see an article about {string} is displayed`, async (articleName: string) => {
    await bupa.validateArticle(articleName);
});

When('I click on {string} link', async (siteName: string) => {
    await bupa.clickSocialMediaLinks(siteName);
})