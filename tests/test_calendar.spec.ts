import { test, expect } from "@playwright/test";
import { MainPage } from "@/pages/MainPage";

test.describe("Тесты блока Календарь", () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.maximizeWindow();
        await mainPage.open();
    });

    test("Проверка функциональности календаря", async () => {
        // 1. Базовая проверка календаря
        await test.step("Проверка, что календарь виден и имеет даты", async () => {
            await mainPage.waitForCalendar();
            expect(await mainPage.isCalendarVisible()).toBeTruthy();
            expect(await mainPage.hasCalendarDates()).toBeTruthy();
        });

        // 2. Проверка стрелок и прокрутки
        await test.step("Проверка прокрутки", async () => {
            // Изначально только правая стрелка видна
            await expect(mainPage.calendarRightArrow).toBeVisible();

            // Прокручиваем вправо
            await mainPage.scrollCalendarRight();
            console.log("Прокручен один раз вправо");

            // Теперь должна появиться левая стрелка
            await expect(mainPage.calendarLeftArrow).toBeVisible({ timeout: 5000 });
            console.log("Левая стрелка появилась после прокрутки");

            // Прокручиваем влево
            await mainPage.scrollCalendarLeft();
            console.log("Прокручен один раз влево");

            // Правая стрелка должна остаться видимой
            await expect(mainPage.calendarRightArrow).toBeVisible();
        });

        // 3. Дополнительная прокрутка для надежности
        await test.step("Дополнительная проверка прокрутки", async () => {
            // Еще раз вправо
            await mainPage.scrollCalendarRight();
            console.log("Дополнительная прокрутка вправо");

            // И еще раз влево
            await mainPage.scrollCalendarLeft();
            console.log("Дополнительная прокрутка влево");
        });
    });
});
