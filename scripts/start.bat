@echo off
echo Запуск автотестов Яндекс.Афиши
echo.

# Переходим в корень если нужно
cd /d %~dp0..\

echo Проверка и установка Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js не найден. Установка...
    curl -L https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi -o node-installer.msi
    echo Установите Node.js через скачанный файл и перезапустите скрипт
    start node-installer.msi
    pause
    exit /b 1
)

echo Node.js установлен

echo Проверка Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo Docker не найден. Установка требуется.
    echo Скачайте с: https://docker.com/
    echo После установки перезапустите скрипт
    start https://docs.docker.com/desktop/install/windows-install/
    pause
    exit /b 1
)

echo Docker установлен

echo Установка зависимостей проекта...
npm install

echo Сборка Docker образа...
npm run docker:build

echo Запуск тестов...
npm run docker:test

echo.
echo Готово! Тесты завершены.
echo.
echo Для открытия отчета выполните:
echo    npm run allure:serve
echo.
echo Или перейдите в папку scripts и запустите:
echo    open-report.bat
echo.
pause