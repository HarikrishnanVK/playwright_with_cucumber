import { page } from "../steps/world"
import { expect } from "@playwright/test";

export class DemoBlazePage {

    private pageTitle = `a[id='nava']`;
    private categoriesLink = `//div[@class='list-group']//a[1]`;
    private categoriesListItems = `//div[@class='list-group']//a[not(@id='cat')]`;
    private productLinks = `//div[@class='list-group']//a`;

    async verifyPage(expectedText: string) {
        const actualText = await page.locator(this.pageTitle).textContent();
        expect(expectedText).toEqual(actualText!.trim());
    }

    async clickCategoriesLink() {
        await page.locator(this.categoriesLink).click();
    }

    async verifyCategoriesList(item1: string, item2: string, item3: string) {
        const actualSubLinks = await page.locator(this.categoriesListItems).allTextContents();
        const expectedSubLinks = [item1, item2, item3];
        expect(actualSubLinks).toEqual(expectedSubLinks);
    }

    async selectCategoryFromList(expectedCategory: string) {
        const subLinks = page.locator(this.productLinks);
        const subLinksCount = await subLinks.count();
        for (var i = 0; i < subLinksCount; i++) {
            if ((await subLinks.nth(i).textContent()).match(expectedCategory)) {
                await subLinks.nth(i).click();
                break;
            }
        }
    }

    async isValidProductSelected(actualProdduct:string): Promise<boolean> {
        const product = page.locator(`//h4[@class='card-title']//a[text()='${actualProdduct}']`);
        await expect(product).toBeEnabled();
        return await product.isEnabled();
    }
}