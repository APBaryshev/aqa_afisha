import { Page } from "@playwright/test";
import { MainPageLocators } from "@/locators/MainPageLocators";

export class TopSectionComponent {
    constructor(private page: Page) {}

    get topSection() {return this.page.locator(MainPageLocators.TOP_SECTION);}
    get topLogo() {return this.page.locator(MainPageLocators.TOP_LOGO);}
    get topCards() {return this.page.locator(".p8csoW");}
    get rightArrow() {return this.page
        .locator(MainPageLocators.TOP_SECTION)
        .getByRole("button")
        .filter({ hasText: /^$/ })
        .first();}
    get leftArrow() {return this.page.getByRole("button").filter({ hasText: /^$/ }).nth(4);}

    async scrollToTopSection(): Promise<void> {
        await this.topSection.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
    }

    async hoverTopSection(): Promise<void> {
        await this.topSection.hover();
        await this.page.waitForTimeout(500);
    }

    async scrollTopToRight(): Promise<void> {
        await this.rightArrow.click();
        await this.page.waitForTimeout(1000);
    }

    async scrollTopToLeft(): Promise<void> {
        await this.leftArrow.click();
        await this.page.waitForTimeout(1000);
    }

    async getTopCardsCount(): Promise<number> {
        return await this.topCards.count();
    }

    async checkTopCardElements(cardIndex: number = 0): Promise<void> {
        const card = this.topCards.nth(cardIndex);

        await this.page.waitForTimeout(500); // Даем время для стабилизации

        await Promise.all([
            card.locator(MainPageLocators.TOP_CARD_NUMBER).waitFor({ state: "visible" }),
            card.locator(MainPageLocators.TOP_CARD_EVENT).waitFor({ state: "visible" }),
            card.locator(MainPageLocators.CASHBACK_BADGE).waitFor({ state: "visible" }),
            card.locator(MainPageLocators.TOP_CARD_TITLE).waitFor({ state: "visible" }),
            card.locator(MainPageLocators.TOP_CARD_RUBRIC).waitFor({ state: "visible" }),
            card.locator(MainPageLocators.TOP_CARD_DATE).waitFor({ state: "visible" }),
        ]);
    }
}
