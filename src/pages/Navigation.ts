import { Page } from "@playwright/test";
import { MainPageLocators } from "@/locators/MainPageLocators";

export class NavigationComponent {
    constructor(private page: Page) {}

    async waitForNavigationTabs(): Promise<void> {
        await this.page.locator(MainPageLocators.NAVIGATION_TABS).first().waitFor({ state: "visible", timeout: 15000 });
    }

    async getVisibleTabNames(): Promise<string[]> {
        const names: string[] = [];
        const tabs = this.page.locator(MainPageLocators.NAVIGATION_TABS);
        const count = await tabs.count();

        for (let i = 0; i < count; i++) {
            const tab = tabs.nth(i);
            if (await tab.isVisible()) {
                const name = await tab.locator(MainPageLocators.NAVIGATION_TITLE).textContent();
                if (name) names.push(name.trim());
            }
        }
        return names;
    }

    async getMoreDropdownTabNames(): Promise<string[]> {
        const names: string[] = [];
        const moreButton = this.page.locator(MainPageLocators.MORE_BUTTON);
        const moreDropdown = this.page.locator(MainPageLocators.MORE_DROPDOWN);
        const dropdownItems = this.page.locator(MainPageLocators.MORE_DROPDOWN_ITEMS);

        await moreButton.click();
        await moreDropdown.waitFor({ state: "visible" });

        const count = await dropdownItems.count();
        for (let i = 0; i < count; i++) {
            const name = await dropdownItems.nth(i).textContent();
            if (name) names.push(name.trim());
        }

        await moreButton.click();
        await moreDropdown.waitFor({ state: "hidden" });

        return names;
    }

    async checkTabHoverEffect(tabName: string): Promise<boolean> {
        try {
            const colorElement = this.page.locator(
                `[data-test-id="PageHeaderNavigation/Item/${tabName}"] ${MainPageLocators.NAVIGATION_COLOR_ELEMENT}`
            );

            const originalColor = await colorElement.evaluate((el) => {
                return window.getComputedStyle(el).backgroundColor;
            });

            await colorElement.hover();
            await this.page.waitForTimeout(800);

            const hoverColor = await colorElement.evaluate((el) => {
                return window.getComputedStyle(el).backgroundColor;
            });

            return originalColor !== hoverColor;
        } catch (error) {
            console.log(`Error checking hover for tab "${tabName}":`, error);
            return false;
        }
    }

    async checkCertificatesTabHasIcon(): Promise<boolean> {
        try {
            const certificatesTab = this.page
                .locator(MainPageLocators.NAVIGATION_TABS)
                .filter({ hasText: "Сертификаты" });
            const icon = certificatesTab.locator(MainPageLocators.NAVIGATION_IMAGE);
            return await icon.isVisible();
        } catch (error) {
            return false;
        }
    }

    async isStandupTabVisible(): Promise<boolean> {
        const standupTab = this.page.locator(MainPageLocators.NAVIGATION_TABS).filter({ hasText: "Стендап" });
        return await standupTab.isVisible();
    }

    async isMoreButtonVisible(): Promise<boolean> {
        return await this.page.locator(MainPageLocators.MORE_BUTTON).isVisible();
    }
}
