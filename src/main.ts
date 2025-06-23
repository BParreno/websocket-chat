// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io'; // Importa IoAdapter

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app)); // Habilita el adaptador de WebSocket

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`WebSocket server is listening on ws://localhost:3000`);
}
bootstrap();