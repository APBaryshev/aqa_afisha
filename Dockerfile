FROM mcr.microsoft.com/playwright:v1.56.1-noble

# Установка Java для Allure
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless && \
    rm -rf /var/lib/apt/lists/*

# Установка Allure CLI
RUN npm install -g allure-commandline

# Рабочая директория
WORKDIR /app

# Копируем package files
COPY package*.json ./
COPY playwright.config.ts ./
COPY tsconfig.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY src/ ./src/
COPY tests/ ./tests/

# Создаем папки для результатов
RUN mkdir -p allure-results test-results

# Команда по умолчанию
CMD ["npx", "playwright", "test", "--reporter=allure-playwright"]