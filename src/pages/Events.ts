import { Page } from "@playwright/test";
import { MainPageLocators } from "@/locators/MainPageLocators";

export class EventsComponent {
    constructor(private page: Page) {}

    get eventsSection() {
        return this.page.getByRole("link", { name: "События в ближайшие дни" });
    }

    get eventsTitle() {
        return this.page.getByText("События в ближайшие дни");
    }

    async scrollToEventsSection(): Promise<void> {
        await this.eventsSection.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
    }

    async checkTitleHover(): Promise<{ changed: boolean; hoverColor: string }> {
        const originalColor = await this.eventsTitle.evaluate((el) => {
            return window.getComputedStyle(el).color;
        });

        await this.eventsTitle.hover();
        await this.page.waitForTimeout(500);

        const hoverColor = await this.eventsTitle.evaluate((el) => {
            return window.getComputedStyle(el).color;
        });

        return {
            changed: originalColor !== hoverColor,
            hoverColor: hoverColor
        };

    }

    async getEventCardsCount(): Promise<number> {
        return await this.page.locator(MainPageLocators.EVENT_CARD_ROOT).count();
    }

    async checkEventCardElements(cardIndex: number = 0) {
        const card = this.page.locator(MainPageLocators.EVENT_CARD_ROOT).nth(cardIndex);

        return {
            hasPoster: await card.locator("img").first().isVisible(),
            hasLike: await card.locator(MainPageLocators.EVENT_CARD_FAVOURITE).isVisible(),
            hasPrice: await card.locator(MainPageLocators.EVENT_CARD_PRICE).isVisible(),
            hasCashback: await card.locator(MainPageLocators.CASHBACK_BADGE).isVisible(),
            hasRating: await card.locator(MainPageLocators.EVENT_CARD_RATING).isVisible(),
            hasTitle: await card.locator(MainPageLocators.EVENT_CARD_TITLE).isVisible(),
            hasAdditionalInfo: await card.locator(MainPageLocators.EVENT_CARD_DETAILS).isVisible(),
        };
    }
}
