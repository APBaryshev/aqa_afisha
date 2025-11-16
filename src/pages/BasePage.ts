import { Page, Locator } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string = "/"): Promise<void> {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded",
        });
    }

    async maximizeWindow(): Promise<void> {
        await this.page.setViewportSize({ width: 1920, height: 1080 });
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded");
    }

    // Дополнительные методы

    async waitForElementVisible(selector: string | Locator, timeout: number = 10000): Promise<void> {
        const locator = typeof selector === "string" ? this.page.locator(selector) : selector;
        await locator.waitFor({ state: "visible", timeout });
    }

    async waitForElementHidden(selector: string | Locator, timeout: number = 10000): Promise<void> {
        const locator = typeof selector === "string" ? this.page.locator(selector) : selector;
        await locator.waitFor({ state: "hidden", timeout });
    }

    async isElementVisible(selector: string | Locator): Promise<boolean> {
        try {
            const locator = typeof selector === "string" ? this.page.locator(selector) : selector;
            await locator.waitFor({ state: "visible", timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
}
