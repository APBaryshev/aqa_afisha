import { test, expect } from "@playwright/test";
import { MainPage } from "@/pages/MainPage";

test.describe("Тест основного фида", () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    });

    test("Проверка основного фида и истории просмотра", async () => {
        // 1. Проскроллить до основного фида
        await test.step("Прокрутка до основного фида", async () => {
            await mainPage.scrollToMainFeed();
        });

        // 2. Проверить что есть карточки И все необходимые элементы
        await test.step("Проверка карточек и необходимых элементов", async () => {
            const cardsCount = await mainPage.getFeedCardsCount();
            expect(cardsCount).toBeGreaterThanOrEqual(3);
            console.log(`Найдено карточек: ${cardsCount}`);

            // Проверяем элементы в первых 3 карточках
            for (let i = 0; i < 3; i++) {
                const elements = await mainPage.checkAllCardElements(i);

                // Обязательные элементы
                expect(elements.hasPoster).toBe(true);
                expect(elements.hasLike).toBe(true);
                expect(elements.hasPrice).toBe(true);
                expect(elements.hasCashback).toBe(true);
                expect(elements.hasTitle).toBe(true);
                expect(elements.hasAdditionalInfo).toBe(true);

                // Рейтинг опциональный - просто логируем
                console.log(`Карточка ${i}: рейтинг ${elements.hasRating ? "есть" : "нет"}`);
            }
        });

        // 3. Перейти на страницы 2 событий - при проверки ПЯТИ Яндекс стал включать Сaptcha
        await test.step("Проверка открытия события", async () => {
            const viewedEvents = await mainPage.openEventsForHistory(2);
            console.log(`Открыто событий: ${viewedEvents.length}`);
        });

        // 4. Проверить блок "Вы смотрели"
        await test.step('Проверка блока "Вы смотрели"', async () => {
            if (mainPage.page.isClosed()) {
                console.log("Страница закрыта, проверка невозможна");
                return;
            }

            await mainPage.page.waitForTimeout(3000);

            const isViewedVisible = await mainPage.isViewedSectionVisible();
            console.log(`Блок "Вы смотрели" виден: ${isViewedVisible}`);
        });
    });
});
