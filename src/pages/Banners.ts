import { Page } from "@playwright/test";
import { MainPageLocators } from "@/locators/MainPageLocators";

export class BannersComponent {
    constructor(private page: Page) {}

    async waitForBanners(): Promise<void> {
        await this.page.locator(MainPageLocators.BANNERS_CONTAINER).waitFor({ state: "visible", timeout: 10000 });
    }

    async areBannersVisible(): Promise<boolean> {
        return await this.page.locator(MainPageLocators.BANNERS_CONTAINER).isVisible();
    }

    async getVisibleBannersCount(): Promise<number> {
        let visibleCount = 0;
        const banners = this.page.locator(MainPageLocators.BANNERS);
        const count = await banners.count();

        for (let i = 0; i < count; i++) {
            const banner = banners.nth(i);
            if (await banner.isVisible()) {
                visibleCount++;
            }
        }
        return visibleCount;
    }

    async scrollBannersRight(): Promise<void> {
        await this.page.locator(MainPageLocators.BANNER_NEXT_BUTTON).click();
        await this.page.waitForTimeout(1000);
    }

    async scrollBannersLeft(): Promise<void> {
        await this.page.locator(MainPageLocators.BANNER_PREV_BUTTON).click();
        await this.page.waitForTimeout(1000);
    }

    async testBannersScrollFunctionality(): Promise<boolean> {
        try {
            await this.waitForBanners();
            const bannersCount = await this.getVisibleBannersCount();
            if (bannersCount === 0) return false;

            const isNextButtonVisible = await this.page.locator(MainPageLocators.BANNER_NEXT_BUTTON).isVisible();
            if (!isNextButtonVisible) return false;

            await this.scrollBannersRight();

            const isPrevButtonVisible = await this.page
                .locator(MainPageLocators.BANNER_PREV_BUTTON)
                .isVisible({ timeout: 3000 });
            if (!isPrevButtonVisible) return false;

            await this.scrollBannersLeft();
            return true;
        } catch (error) {
            console.log("Banners scroll test failed:", error);
            return false;
        }
    }
}
