import { BasePage } from "./BasePage";
import { NavigationComponent } from "./Navigation";
import { CalendarComponent } from "./Calendar";
import { BannersComponent } from "./Banners";
import { EventsComponent } from "./Events";
import { TopSectionComponent } from "./TopSection";
import { MainFeedComponent } from "./MainFeed";
import { MainPageLocators } from "../locators/MainPageLocators";
import { Page } from "@playwright/test";

export class MainPage extends BasePage {
    readonly navigation: NavigationComponent;
    readonly calendar: CalendarComponent;
    readonly banners: BannersComponent;
    readonly events: EventsComponent;
    readonly topSection: TopSectionComponent;
    readonly mainFeed: MainFeedComponent;

    get navigationTabs() {
        return this.page.locator(MainPageLocators.NAVIGATION_TABS);
    }
    get moreButton() {
        return this.page.locator(MainPageLocators.MORE_BUTTON);
    }
    get eventsTitle() {
        return this.events.eventsTitle;
    }
    get eventsSection() {
        return this.page.getByRole("link", { name: "События в ближайшие дни" });
    }
    get eventCards() {
        return this.page.locator(MainPageLocators.EVENT_CARD_ROOT);
    }
    get calendarRightArrow() {
        return this.page.locator(MainPageLocators.CALENDAR_RIGHT_ARROW);
    }
    get calendarLeftArrow() {
        return this.page.locator(MainPageLocators.CALENDAR_LEFT_ARROW);
    }
    get bannerNextButton() {
        return this.page.locator(MainPageLocators.BANNER_NEXT_BUTTON);
    }
    get bannerPrevButton() {
        return this.page.locator(MainPageLocators.BANNER_PREV_BUTTON);
    }
    get topLogo() {
        return this.page.locator(MainPageLocators.TOP_LOGO);
    }
    get topCards() {
        return this.page.locator(".p8csoW");
    }
    get leftArrow() {
        return this.page.getByRole("button").filter({ hasText: /^$/ }).nth(4);
    }

    constructor(page: Page) {
        super(page);
        this.navigation = new NavigationComponent(page);
        this.calendar = new CalendarComponent(page);
        this.banners = new BannersComponent(page);
        this.events = new EventsComponent(page);
        this.topSection = new TopSectionComponent(page);
        this.mainFeed = new MainFeedComponent(page);
    }

    async open(): Promise<void> {
        // Проверяем что состояние загружено
        const currentUrl = this.page.url();
        if (currentUrl.includes("passport.yandex.ru") || currentUrl.includes("captcha")) {
            console.log("Возможно, срок хранения истек. Пожалуйста, запустите captcha:setup еще раз.");
            throw new Error("Обнаружена CAPTCHA - срок хранения истек");
        }

        await this.navigateTo("https://afisha.yandex.ru");
        await this.maximizeWindow();
        await this.waitForPageLoad();
        await this.ensureCorrectPage();
        await this.closeBanners();
        await this.waitForHomePageReady();
    }

    private async ensureCorrectPage(): Promise<void> {
        const currentUrl = this.page.url();

        if (currentUrl.includes("passport.yandex.ru") || currentUrl.includes("auth")) {
            console.log("Обнаружена страница авторизации, повторная попытка...");
            await this.navigateTo("https://afisha.yandex.ru");
            await this.waitForPageLoad();
        }

        if (!this.page.url().includes("afisha.yandex.ru")) {
            throw new Error(`Не на afisha.yandex.ru. Текущий URL: ${this.page.url()}`);
        }
    }

    private async closeBanners(): Promise<void> {
        console.log("Закрытие баннеров...");

        try {
            const firstBanner = this.page.locator(MainPageLocators.FIRST_BANNER);
            await firstBanner.waitFor({ state: "visible", timeout: 3000 });
            await firstBanner.click();
            console.log("Первый баннер закрыт");
        } catch (error) {
            console.log("Первый баннер не найден");
        }

        try {
            const secondBanner = this.page.locator(MainPageLocators.SECOND_BANNER);
            await secondBanner.waitFor({ state: "visible", timeout: 15000 });
            await secondBanner.click();
            console.log("Второй баннер закрыт");
        } catch (error) {
            console.log("Второй баннер не появился");
        }

        console.log("Обработка баннеров завершена");
    }

    private async waitForHomePageReady(): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded");
        await this.navigation.waitForNavigationTabs();
    }

    async waitForNavigationTabs(): Promise<void> {
        await this.navigation.waitForNavigationTabs();
    }

    async getVisibleTabNames(): Promise<string[]> {
        return await this.navigation.getVisibleTabNames();
    }

    async checkTabHoverEffect(tabName: string): Promise<{ changed: boolean; hoverColor: string }> {
        return await this.navigation.checkTabHoverEffect(tabName);
    }

    async waitForCalendar(): Promise<void> {
        await this.calendar.waitForCalendar();
    }

    async isCalendarVisible(): Promise<boolean> {
        return await this.calendar.isCalendarVisible();
    }

    async scrollCalendarRight(): Promise<void> {
        await this.calendar.scrollCalendarRight();
    }

    async scrollCalendarLeft(): Promise<void> {
        await this.calendar.scrollCalendarLeft();
    }

    async hasCalendarDates(): Promise<boolean> {
        return await this.calendar.hasCalendarDates();
    }

    async waitForBanners(): Promise<void> {
        await this.banners.waitForBanners();
    }

    async areBannersVisible(): Promise<boolean> {
        return await this.banners.areBannersVisible();
    }

    async getVisibleBannersCount(): Promise<number> {
        return await this.banners.getVisibleBannersCount();
    }

    async scrollBannersRight(): Promise<void> {
        await this.banners.scrollBannersRight();
    }

    async scrollBannersLeft(): Promise<void> {
        await this.banners.scrollBannersLeft();
    }

    async scrollToEventsSection(): Promise<void> {
        await this.events.scrollToEventsSection();
    }

    async checkTitleHover(): Promise<{ changed: boolean; hoverColor: string }> {
        return await this.events.checkTitleHover();
    }

    async scrollToTopSection(): Promise<void> {
        await this.topSection.scrollToTopSection();
    }

    async hoverTopSection(): Promise<void> {
        await this.topSection.hoverTopSection();
    }

    async scrollTopToRight(): Promise<void> {
        await this.topSection.scrollTopToRight();
    }

    async scrollTopToLeft(): Promise<void> {
        await this.topSection.scrollTopToLeft();
    }

    async scrollToMainFeed(): Promise<void> {
        await this.mainFeed.scrollToMainFeed();
    }

    async getFeedCardsCount(): Promise<number> {
        return await this.mainFeed.getFeedCardsCount();
    }

    async openEventsForHistory(count: number = 3): Promise<{ title: string; url: string }[]> {
        return await this.mainFeed.openEventsForHistory(count);
    }

    async isViewedSectionVisible(): Promise<boolean> {
        return await this.mainFeed.isViewedSectionVisible();
    }

    async checkAllCardElements(cardIndex: number = 0) {
        return await this.mainFeed.checkAllCardElements(cardIndex);
    }
}
