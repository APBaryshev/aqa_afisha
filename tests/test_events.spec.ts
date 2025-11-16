import { test, expect } from "@playwright/test";
import { MainPage } from "@/pages/MainPage";
import { MainPageLocators } from "@/locators/MainPageLocators";

test.describe("Тест блока событий", () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    });

    test("Проверка блока событий", async () => {
        await test.step("Прокрутить до блока событий", async () => {
            await mainPage.scrollToEventsSection();
        });

        await test.step("Проверка отображения подборки событий", async () => {
            await expect(mainPage.eventsSection).toBeVisible();
        });

        await test.step("Проверка заголовка и hover-эффекта", async () => {
            await expect(mainPage.eventsTitle).toBeVisible();

            const hoverResult = await mainPage.checkTitleHover();

            // Проверяем что эффект есть
            expect(hoverResult.changed).toBe(true);

            // Проверяем конкретный цвет в RGB формате
            expect(hoverResult.hoverColor).toBe("rgb(247, 47, 47)");
        });

        await test.step("Проверка карточек событий и их расположение", async () => {
            const cardsCount = await mainPage.eventCards.count();
            expect(cardsCount).toBeGreaterThan(0);
            // 3 в ряд
            expect(cardsCount).toBeGreaterThanOrEqual(3);
            console.log("Карточки 3 в ряд");
        });

        await test.step("Проверка элементов карточках событий", async () => {
            const firstCard = mainPage.eventCards.first();
            // постер
            await expect(firstCard.locator("img").first()).toBeVisible();
            console.log("Постер виден");
            // лайк
            await expect(firstCard.locator(MainPageLocators.EVENT_CARD_FAVOURITE)).toBeVisible();
            console.log("Лайк виден");
            // цена
            await expect(firstCard.locator(MainPageLocators.EVENT_CARD_PRICE)).toBeVisible();
            console.log("Цена видна");
            // кешбек
            await expect(firstCard.locator(MainPageLocators.CASHBACK_BADGE)).toBeVisible();
            console.log("Кешбек виден");
            // название
            await expect(firstCard.locator(MainPageLocators.EVENT_CARD_TITLE)).toBeVisible();
            console.log("Название видно");
            // дата и место
            await expect(firstCard.locator(MainPageLocators.EVENT_CARD_DETAILS)).toBeVisible();
            console.log("Дата и место видны");
        });
    });
});
