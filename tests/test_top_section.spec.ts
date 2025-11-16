import { test, expect } from "@playwright/test";
import { MainPage } from "@/pages/MainPage";
import { MainPageLocators } from "@/locators/MainPageLocators";

test.describe("Тесты блока ТОП-10", () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    });

    test("Проверка блока ТОП-10", async () => {
        // 1. Прокрутить до блока ТОП-10
        await test.step("Прокрутить до блока ТОП-10", async () => {
            await mainPage.scrollToTopSection();
        });

        // 2. Проверить, что отображается блок ТОП-10
        await test.step("Проверка отображения блока ТОП-10", async () => {
            await expect(mainPage.topSection.topSection).toBeVisible();
            await expect(mainPage.topLogo).toBeVisible();
        });

        // 3. Проверить, что есть 10 карточек
        await test.step("Проверка, что есть 10 карточек", async () => {
            const cardsCount = await mainPage.topCards.count();
            expect(cardsCount).toBe(10);
        });

        // 4. Проверить, что каждая карточка содержит все элементы
        await test.step("Проверить элементов в карточке", async () => {
            const firstCard = mainPage.topCards.first();
            // номер
            await expect(firstCard.locator(MainPageLocators.TOP_CARD_NUMBER)).toBeVisible();
            // постер
            await expect(firstCard.locator(MainPageLocators.TOP_CARD_EVENT)).toBeVisible();
            console.log("Постер виден");
            // кешбек
            await expect(firstCard.locator(MainPageLocators.CASHBACK_BADGE)).toBeVisible();
            console.log("Кешбек виден");
            // название
            await expect(firstCard.locator(MainPageLocators.TOP_CARD_TITLE)).toBeVisible();
            console.log("Название видно");
            // рубрика
            await expect(firstCard.locator(MainPageLocators.TOP_CARD_RUBRIC)).toBeVisible();
            console.log("Рубрика видна");
            // дата
            await expect(firstCard.locator(MainPageLocators.TOP_CARD_DATE)).toBeVisible();
            console.log("Дата видна");

            // 5. Проверить cкролл и стрелки
            await test.step("Проверка прокрутки", async () => {
                // Навести курсор на блок, чтобы показать стрелки
                await mainPage.hoverTopSection();
                // Проверить скролл вправо
                await mainPage.scrollTopToRight();
                // Проверить, что после скролла появилась стрелка влево
                await expect(mainPage.leftArrow).toBeVisible();
                // Проверить скролл влево
                await mainPage.scrollTopToLeft();
            });
        });
    });
});
