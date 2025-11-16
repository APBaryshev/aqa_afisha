import { Page } from "@playwright/test";
import { MainPageLocators } from "@/locators/MainPageLocators";

export class CalendarComponent {
    constructor(private page: Page) {}

    async waitForCalendar(): Promise<void> {
        await this.page.locator(MainPageLocators.CALENDAR_DAY).first().waitFor({ state: "visible", timeout: 10000 });
    }

    async isCalendarVisible(): Promise<boolean> {
        return await this.page.locator(MainPageLocators.CALENDAR_DAY).first().isVisible();
    }

    async scrollCalendarRight(): Promise<void> {
        await this.page.locator(MainPageLocators.CALENDAR_RIGHT_ARROW).click();
        await this.page.waitForTimeout(1000);
    }

    async scrollCalendarLeft(): Promise<void> {
        await this.page.locator(MainPageLocators.CALENDAR_LEFT_ARROW).click();
        await this.page.waitForTimeout(1000);
    }

    async hasCalendarDates(): Promise<boolean> {
        const count = await this.page.locator(MainPageLocators.CALENDAR_DAY).count();
        return count > 0;
    }

    async testCalendarScrollBothDirections(): Promise<boolean> {
        try {
            await this.waitForCalendar();
            const hasDates = await this.hasCalendarDates();
            if (!hasDates) return false;

            const isRightArrowVisible = await this.page.locator(MainPageLocators.CALENDAR_RIGHT_ARROW).isVisible();
            if (!isRightArrowVisible) return false;

            await this.scrollCalendarRight();

            const isLeftArrowVisible = await this.page
                .locator(MainPageLocators.CALENDAR_LEFT_ARROW)
                .isVisible({ timeout: 3000 });
            if (!isLeftArrowVisible) return false;

            await this.scrollCalendarLeft();
            return true;
        } catch (error) {
            console.log("Calendar scroll test failed:", error);
            return false;
        }
    }
}
