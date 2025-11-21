import { chromium } from "@playwright/test";
import * as fs from "fs";

async function saveAuthState() {
    const browser = await chromium.launch({
        headless: false, // Обязательно headed для ручного ввода
        slowMo: 1000,
    });

    const context = await browser.newContext({
        locale: "ru-RU", // Добавляем локаль
        timezoneId: "Europe/Moscow", // Добавляем таймзону
        viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();

    console.log("=== НАСТРОЙКА CAPTCHA ===");
    console.log("1. Открывается страница afisha.yandex.ru");
    console.log("2. Если появилась капча - пройди её вручную");
    console.log("3. Дождись загрузки главной страницы");
    console.log("4. Закрой браузер - состояние сохранится автоматически");

    try {
        await page.goto("https://afisha.yandex.ru", {
            waitUntil: "domcontentloaded",
            timeout: 30000,
        });

        console.log("Ждем прохождения капчи (2 минуты)...");

        // Ждем ЛЮБОЙ из признаков успешной загрузки
        await Promise.race([
            page.waitForSelector('[data-test-id="pageHeaderNavigation.item"]', { timeout: 120000 }),
            page.waitForSelector('[data-test-id*="calendar"]', { timeout: 120000 }),
            page.waitForSelector('[data-test-id*="featured"]', { timeout: 120000 }),
        ]);

        console.log("Успешно! Главная страница загружена");

        // Сохраняем состояние
        await context.storageState({ path: "src/captcha-state.json" });
        console.log("Состояние сохранено в src/captcha-state.json");
    } catch (error) {
        console.log("Таймаут: Не удалось пройти капчу за 2 минуты");

        // Сохраняем скриншот ошибки
        await page.screenshot({ path: "debug-auth-failed.png" });
        console.log("Скриншот ошибки сохранен в debug-auth-failed.png");
    } finally {
        await browser.close();
    }
}

saveAuthState();
