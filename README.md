# Frigate Telegram Bot

TypeScript проект для Telegram бота с поддержкой MQTT клиента.

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
- `src/telegram.ts` - сервис для работы с Telegram Bot API
- `src/mqtt.ts` - сервис для работы с MQTT
- `dist/` - скомпилированные файлы
- `.env` - переменные окружения (создать из .env.example)

## Конфигурация

Все настройки задаются через переменные окружения в файле `.env`:

- `TELEGRAM_BOT_TOKEN` - токен Telegram бота
- `TELEGRAM_CHAT_ID` - ID чата для отправки уведомлений
- `MQTT_BROKER_URL` - URL MQTT брокера
- `MQTT_USERNAME` - имя пользователя MQTT (опционально)
- `MQTT_PASSWORD` - пароль MQTT (опционально)
- `MQTT_TOPIC_PREFIX` - префикс для MQTT топиков