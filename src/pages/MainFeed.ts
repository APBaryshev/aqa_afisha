import { Page } from "@playwright/test";
import { MainPageLocators } from "@/locators/MainPageLocators";

export class MainFeedComponent {
    constructor(private page: Page) {}

    get feedTabs() {
        return this.page.locator(MainPageLocators.FEED_TABS);
    }
    get viewedSection() {
        return this.page.locator(MainPageLocators.VIEWED_SECTION);
    }
    get viewedTitle() {
        return this.page.locator('h3:has-text("Вы смотрели")');
    }
    get viewedCards() {
        return this.page.locator(MainPageLocators.VIEWED_CARDS);
    }

    readonly mainPageUrl = "https://afisha.yandex.ru/moscow";

    async scrollToMainFeed(): Promise<void> {
        await this.page.evaluate(() => {
            window.scrollTo(0, 1200);
        });
        await this.page.waitForTimeout(2000);
    }

    async getFeedCardsCount(): Promise<number> {
        return await this.page.locator(MainPageLocators.EVENT_CARD_ROOT).count();
    }

    async collectEventInfo(count: number = 5): Promise<{ title: string; url: string }[]> {
        const events = [];
        const eventLinks = this.page.locator(MainPageLocators.EVENT_CARD_LINK);
        const cardsCount = await eventLinks.count();

        for (let i = 0; i < Math.min(count, cardsCount); i++) {
            const card = eventLinks.nth(i);
            const title = (await card.getAttribute("aria-label")) || `Event ${i}`;
            const href = (await card.getAttribute("href")) || "";
            const url = href ? `https://afisha.yandex.ru${href}` : "";

            events.push({ title, url });
        }

        return events;
    }

    async openEventsForHistory(count: number = 3): Promise<{ title: string; url: string }[]> {
        const events = await this.collectEventInfo(count);
        const viewedEvents: { title: string; url: string }[] = [];

        for (let i = 0; i < events.length; i++) {
            const event = events[i];

            if (!event.url) continue;

            try {
                await this.page.goto(event.url);
                await this.page.waitForTimeout(1000);

                viewedEvents.push({
                    title: event.title,
                    url: this.page.url(),
                });
            } catch (error) {
                console.log(`Error opening event: ${event.title}`);
            }

            if (!this.page.isClosed()) {
                try {
                    await this.page.goto(this.mainPageUrl);
                    await this.page.waitForTimeout(1000);
                } catch {
                    // Ignore navigation errors
                }
            } else {
                break;
            }
        }

        return viewedEvents;
    }

    async isViewedSectionVisible(): Promise<boolean> {
        return await this.viewedSection.isVisible();
    }

    async checkAllCardElements(cardIndex: number = 0) {
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
