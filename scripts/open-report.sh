#!/bin/bash

echo "Открытие Allure отчета..."

if [[ $(basename "$PWD") == "scripts" ]]; then
    cd ..
fi

if [ -d "allure-results" ] && [ "$(ls -A allure-results)" ]; then
    echo "Найдены результаты тестов, запускаем отчет..."
    allure serve allure-results
else
    echo "Результаты тестов не найдены. Сначала запустите тесты:"
    echo "   ./start.sh"
fi