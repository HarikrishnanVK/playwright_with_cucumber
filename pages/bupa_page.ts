import { page, context } from "../steps/world"
import { expect, Locator, Page } from "@playwright/test";


export class BupaPage {

    private globalVariable: string;

    /*locators*/

    private bupaCompanyLogo = `figure[id='logo'] img[src*='bupa-company-logo']`;
    private subLinksOfOurBupa = `ul[id='section-our-bupa-level2'] li[id*='level2'] > a > span`;
    private searchButton = `(//div[@class='search-inner'])[1]`;
    private searchTextBox = `input[id=searchTextbox]`;
    private searchTextBox2 = `input[id='searchButton']`;
    private resultSummary = `div[id='result-summary']`;
    private resultLinks = `span[class='resultURL']`;
    private linkHeader = `//div[@class='banner-landing-page-title']//h1`;
    private socialMediaLnks = `footer[id='footerwrapper'] div[class='share-icons'] a`;
    private serviceLinks = `section[class='footer-box-bottom'] a`;
    private acceptCookieButton = `button[id='cc-cookieAgree']`
    

    /*functions or methods*/

    private async findElement(selector: string): Promise<Locator> {
        await page.waitForSelector(this.bupaCompanyLogo);
        return page.locator(selector);
    }

    private async findElementForActiveWindow(window: Page, selector: string): Promise<Locator> {
        await window.waitForSelector(selector, { strict: false });
        return window.locator(selector);
    }

    async verifyHomePage() {
        const logo = await this.findElement(this.bupaCompanyLogo);
        await expect(logo).toBeEnabled({ timeout: 30000 });
        await (await this.findElement(this.acceptCookieButton)).click();
    }

    async mouseHoverOnLink(linkName: string) {
        const ourBupaPrimaryLink = await this.findElement(`ul[id='section-Homepage-level1'] > li > a[href*='${linkName}']`);
        await ourBupaPrimaryLink.hover();
    }

    async verifySubLinksOfOurBupa() {
        const expectedLinks: string[] = ["Our strategy", "Responsible business", "Leadership", "Our story", "Governance"];
        const actualLinks: string[] = [];
        const links = (await this.findElement(this.subLinksOfOurBupa));
        const linksCount = await (await this.findElement(this.subLinksOfOurBupa)).count();
        for (let i = 0; i < linksCount; i++) {
            actualLinks.push(await links.nth(i).textContent());
        }
        console.log(`sub links captured '${actualLinks}'`);
        expect(actualLinks.toString()).toContain(expectedLinks.toString());
    }

    async selectSubLink(subLinkName: string) {
        const linksCount = await (await this.findElement(this.subLinksOfOurBupa)).count();
        const links = (await this.findElement(this.subLinksOfOurBupa));
        for (let i = 0; i < linksCount; i++) {
            if ((await links.nth(i).textContent()).match(subLinkName)) {
                await links.nth(i).click();
                break;
            } else {
                continue;
            };
        }
    }

    async returnPageTitle(): Promise<string> {
        return await page.title();
    }

    async searchContent(content: string) {
        await (await this.findElement(this.searchButton)).click();
        await (await this.findElement(this.searchTextBox)).fill(content);
        await (await this.findElement(this.searchTextBox2)).click();
    }

    async verifySearchResult(content: string) {
        const locator = page.locator(this.resultSummary);
        await expect(locator.nth(0)).toContainText(content, { timeout: 20000 });
        const result = await (await this.findElement(this.resultSummary)).allTextContents();
        expect(result.toString()).toContain(content);
        const resultLink = await (await this.findElement(this.resultLinks)).allTextContents();
        expect(resultLink.toString().toLowerCase()).toContain(content.toLowerCase());
    }

    async navigateToFirstLink() {
        const firstLinkResult = await (await this.findElement(this.resultLinks)).nth(1).textContent();
        this.globalVariable = firstLinkResult;
        console.log(`result from the 1st link is captured as ${firstLinkResult}`)
        await (await this.findElement(this.resultLinks)).nth(1).click();
    }

    private async switchToWindow(): Promise<Page> {
        const [newWindow] = await Promise.all([
            await context.waitForEvent("page"),
        ]);
        await newWindow.waitForSelector(this.bupaCompanyLogo);
        console.log(`switched to window with title as ${await newWindow.title()}`);
        return newWindow;
    }

    async validateArticle(articleName: string) {
        const newWindow = await this.switchToWindow();
        const newsHeader = await (await this.findElementForActiveWindow(newWindow, this.linkHeader)).textContent();
        expect(newsHeader.toLowerCase()).toContain(articleName.toLowerCase());
        expect(this.globalVariable).toEqual(newsHeader);
        console.log(`Relevant article is displayed '${newsHeader}'`);
    }

    async clickSocialMediaLinks(siteName: string) {
        let links: Locator;
        if (!siteName.includes(".com")) {
            links = await this.findElement(this.serviceLinks);
        } else {
            links = await this.findElement(this.socialMediaLnks);
        }
        for (var i = 0; i < await links.count(); i++) {
            const attributeValue = await links.nth(i).getAttribute("href");
            if (attributeValue.match(siteName)) {
                await links.nth(i).click();
            }
        }
    }

    async validateSocialMediaSite(siteName: string) {
        const newWindow = await this.switchToWindow();
        const windowTitle = await newWindow.title();
        expect(windowTitle.toLowerCase()).toContain(siteName);
    }
}
