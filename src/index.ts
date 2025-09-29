import TelegramBot from "node-telegram-bot-api";
import { config } from "./config";
import mqtt from "mqtt";
import { FrigateEventUpdate, FrigateTrackedObjectUpdate } from "./types";
import http from "http";

const bot = new TelegramBot(config.telegram.botToken, {polling: true});

bot.sendMessage(config.telegram.chatId, 'Бот запущен!')

const getImageBuffer = async (url: string) => {
  return await new Promise<Buffer>((resolve, reject) => {
    http.get(url, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

const mqttClient = mqtt.connect({ 
  host: config.mqtt.host,
  port: config.mqtt.port,
  username: config.mqtt.username,
  password: config.mqtt.password,
  clientId: `frigate-tg-bot-${Math.random().toString(16).substring(2, 10)}`
});

const messages = {} as Record<string, TelegramBot.Message>

const frigateEvents = async (payload: FrigateEventUpdate) => {
  try {
    let message = `Камера: ${payload.after.camera}`;
    message += `\nВремя: ${new Date(payload.after.frame_time * 1000).toLocaleString()}`;
    message += `\nОбъект: ${payload.after.label} (${payload.after.score.toFixed(2)})`;
    if (payload.after.recognized_license_plate) {
      message += `\nНомер: ${payload.after.recognized_license_plate} (${payload.after.recognized_license_plate_score.toFixed(2)})`;
    }

    if (payload.type === "new") {
      if (!payload.after.has_snapshot) return
      const imageUrl = `http://${config.frigate.host}:${config.frigate.port}/api/events/${payload.after.id}/thumbnail.webp`;
      const imageBuffer = await getImageBuffer(imageUrl)
      
      messages[payload.after.id] = await bot.sendPhoto(config.telegram.chatId, imageBuffer, { 
        caption: message,
      });
      setTimeout(() => {
        delete messages[payload.after.id];
      }, config.app.timeoutMessage);
    } else {
      const payloadMessage = messages[payload.after.id]
      if (!payloadMessage) return

      if (message === payloadMessage.caption) return
      
      await bot.editMessageCaption(message, {
        chat_id: payloadMessage.chat.id,
        message_id: payloadMessage.message_id,
      });
    }
  } catch (error: any) {
    console.error('Ошибка отправки в Telegram:', error?.message);
  }
}

const frigateTrackedObjectUpdate = async (payload: FrigateTrackedObjectUpdate) => {
  try {
    if (payload.type !== 'description') return

    const message = messages[payload.id]
    if (!message) return;

    await bot.editMessageCaption(message.caption + `\n\nОписание: ${payload.description}`, {
      chat_id: message.chat.id,
      message_id: message.message_id,
    });
  } catch (error: any) {
    console.error('Ошибка обновления сообщения:', error?.message);
  }
}

const runTopic = (topic: string, payload: any) => {
  const handlers: Record<string, (payload: any) => Promise<void>> = {
    'frigate/events': frigateEvents,
    'frigate/tracked_object_update': frigateTrackedObjectUpdate
  };
  
  const handler = handlers[topic];
  if (handler) {
    handler(payload);
  }
}

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker")
  mqttClient.subscribe('frigate/events')
  mqttClient.subscribe('frigate/tracked_object_update')
  console.log("Subscribed to topics")
  console.log(`Using chat ID: ${config.telegram.chatId}`)
})

mqttClient.on("message", (topic, payload) => {
  try {
    const jsonData = JSON.parse(payload.toString());
    runTopic(topic, jsonData)
  } catch (error) {
    console.error('Error parsing payload as JSON:', error);
  }
})
