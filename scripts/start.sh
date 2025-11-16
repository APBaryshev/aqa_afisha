#!/bin/bash

echo "Запуск автотестов Яндекс.Афиши"

# Переходим в корень проекта если запускаем из scripts/
if [[ $(basename "$PWD") == "scripts" ]]; then
    cd ..
fi

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js не найден"
    echo "Установка Node.js..."
    
    # Для Mac
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install node
    # Для Linux
    else
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
fi

echo "✅ Node.js установлен"

# Проверка Docker
if ! command -v docker &> /dev/null; then
    echo "Docker не найден"
    echo "Установка Docker..."
    
    # Для Mac
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "Установите Docker Desktop с https://docker.com/"
        open https://docs.docker.com/desktop/install/mac-install/
        exit 1
    # Для Linux
    else
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        echo "Перезапустите терминал и запустите скрипт снова"
        exit 1
    fi
fi

echo "Docker установлен"

echo "Установка зависимостей проекта..."
npm install

echo "Сборка Docker образа..."
npm run docker:build

echo "Запуск тестов..."
npm run docker:test

echo "Готово! Тесты завершены."
echo ""
echo "Для открытия отчета выполните:"
echo "   npm run allure:serve"
echo ""
echo "Или перейдите в папку scripts и запустите:"
echo "   ./open-report.sh