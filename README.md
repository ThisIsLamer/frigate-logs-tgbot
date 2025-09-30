# Frigate Telegram Bot

TypeScript проект для Telegram бота с поддержкой MQTT клиента для получения уведомлений от Frigate.

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Скопируйте файл конфигурации:
```bash
copy .env.example .env
```

3. Заполните переменные окружения в файле `.env`

## Запуск

### Разработка (с автоперезапуском)
```bash
npm run dev
```

### Продакшн
```bash
npm run build
npm start
```

## Структура проекта

- `src/index.ts` - главный файл приложения
- `src/config.ts` - конфигурация приложения
- `src/types.ts` - типы данных для Frigate событий
- `dist/` - скомпилированные файлы
- `.env` - переменные окружения (создать из .env.example)
- `docker-compose.yml` - конфигурация Docker
- `Dockerfile` - образ Docker

## Конфигурация

Все настройки задаются через переменные окружения в файле `.env`:

### Telegram
- `TELEGRAM_BOT_TOKEN` - токен Telegram бота
- `TELEGRAM_CHAT_ID` - ID чата для отправки уведомлений

### Frigate
- `FRIGATE_HOST` - хост Frigate сервера
- `FRIGATE_PORT` - порт Frigate сервера (по умолчанию: 5000)

### MQTT
- `MQTT_BROKER_URL` - URL MQTT брокера
- `MQTT_HOST` - хост MQTT брокера
- `MQTT_PORT` - порт MQTT брокера (по умолчанию: 1883)
- `MQTT_USERNAME` - имя пользователя MQTT (опционально)
- `MQTT_PASSWORD` - пароль MQTT (опционально)
- `MQTT_TOPIC_PREFIX` - префикс для MQTT топиков

### Приложение
- `NODE_ENV` - окружение (development/production)
- `PORT` - порт приложения (по умолчанию: 3000)
- `TIMEOUT_MESSAGE` - время жизни сообщений в мс (по умолчанию: 36000000)