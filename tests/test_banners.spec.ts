import { test, expect } from "@playwright/test";
import { MainPage } from "@/pages/MainPage";

test.describe("Тест баннеров", () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.maximizeWindow();
        await mainPage.open();
    });

    test("Проверка функциональности баннеров", async () => {
        // 1. Проверка отображения баннеров
        await test.step("Проверка видимости баннеров", async () => {
            await mainPage.waitForBanners();
            expect(await mainPage.areBannersVisible()).toBeTruthy();

            const bannersCount = await mainPage.getVisibleBannersCount();
            expect(bannersCount).toBeGreaterThan(0);
            console.log(`Найдено ${bannersCount} видимых баннеров`);

            await expect(mainPage.bannerNextButton).toBeVisible();
            console.log("Кнопка Далее видна");
        });

        // 2. Проверка прокрутки
        await test.step("Проверка прокрутки баннеров", async () => {
            // Прокручиваем вправо
            await mainPage.scrollBannersRight();
            console.log("Прокручены один раз вправо");

            // Проверяем что появилась кнопка "назад"
            await expect(mainPage.bannerPrevButton).toBeVisible({ timeout: 5000 });
            console.log("Кнопка Назад появилась после прокрутки");

            // Прокручиваем влево
            await mainPage.scrollBannersLeft();
            console.log("Прокручены влево");
        });

        // 3. Дополнительные проверки прокрутки
        await test.step("Дополнительные проверки прокрутки", async () => {
            // Несколько прокруток вправо
            for (let i = 0; i < 2; i++) {
                await mainPage.scrollBannersRight();
                console.log(`Дополнительная прокрутка вправо ${i + 1}`);
            }

            // Несколько прокруток влево
            for (let i = 0; i < 2; i++) {
                await mainPage.scrollBannersLeft();
                console.log(`Дополнительная прокрутка влево ${i + 1}`);
            }

            // Финальная проверка
            await expect(mainPage.bannerNextButton).toBeVisible();
            console.log("Все проверки прокрутки выполнены");
        });
    });
});
