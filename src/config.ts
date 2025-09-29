import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  telegram: {
    botToken: string;
    chatId: string;
  };
  frigate: {
    host: string;
    port: number;
  };
  mqtt: {
    host: string;
    port: number;
    username?: string;
    password?: string;
  };
  app: {
    nodeEnv: string;
    port: number;
    timeoutMessage: number;
  };
}

export const config: Config = {
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.TELEGRAM_CHAT_ID || '',
  },
  frigate: {
    host: process.env.FRIGATE_HOST || '10.7.8.240',
    port: parseInt(process.env.FRIGATE_PORT || "5000", 10),
  },
  mqtt: {
    host: process.env.MQTT_HOST || '10.7.8.210',
    port: parseInt(process.env.MQTT_PORT || "1883", 10),
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
  },
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    timeoutMessage: parseInt(process.env.TIMEOUT_MESSAGE || '36000000', 10),
  },
};