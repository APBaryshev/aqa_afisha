import { test, expect } from "@playwright/test";
import { MainPage } from "@/pages/MainPage";
import { MainPageLocators } from "@/locators/MainPageLocators";

test.describe("Тесты блока навигации", () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.maximizeWindow();
        await mainPage.open();
    });

    test("Проверка табов навигации", async () => {
        await test.step("Проверка видимости блока навигации", async () => {
            // Проверяем что блок навигации существует и видим
            const navigationWrapper = mainPage.page.locator(MainPageLocators.NAVIGATION_WRAPPER);
            await expect(navigationWrapper).toBeVisible();

            // Проверяем что есть несколько табов
            const tabCount = await mainPage.navigationTabs.count();
            expect(tabCount).toBeGreaterThan(5);

            // Проверяем что есть видимые табы
            const visibleTabs = await mainPage.getVisibleTabNames();
            expect(visibleTabs.length).toBeGreaterThan(0);
            console.log("Visible navigation tabs:", visibleTabs);
        });

        await test.step("Проверка видимости табов Стендап и Ещё", async () => {
            // Проверяем видимость
            await expect(mainPage.navigationTabs.filter({ hasText: "Стендап" })).toBeVisible();
            await expect(mainPage.moreButton).toBeVisible();

            console.log("Стендап и Ещё видны на полном экране");
        });

        await test.step('Проверка, что таб "Сертификаты" имеет уникальную иконку', async () => {
            const certificatesTab = mainPage.navigationTabs.filter({ hasText: "Сертификаты" });
            const icon = certificatesTab.locator(MainPageLocators.NAVIGATION_IMAGE);
            await expect(icon).toBeVisible();

            // Проверяем что у других табов нет иконок
            const otherTabs = mainPage.navigationTabs.filter({ hasNotText: "Сертификаты" });
            const otherIcons = otherTabs.locator(MainPageLocators.NAVIGATION_IMAGE);
            await expect(otherIcons).toHaveCount(0);
        });

        await test.step("Проверка эффекта наведения на таб Сертификаты", async () => {
            const hoverResult = await mainPage.checkTabHoverEffect("Сертификаты");
            expect(hoverResult.changed).toBeTruthy();

            // Проверяем конкретный цвет в RGBA формате
            expect(hoverResult.hoverColor).toBe("rgba(0, 0, 0, 0.07)");
        });

        await test.step("Проверка эффекта наведения на таб Концерты", async () => {
            const hoverResult = await mainPage.checkTabHoverEffect("Концерты");
            expect(hoverResult.changed).toBeTruthy();

            // Проверяем конкретный цвет в RGBA формате
            expect(hoverResult.hoverColor).toBe("rgba(0, 0, 0, 0.07)");
        });
    });
});
