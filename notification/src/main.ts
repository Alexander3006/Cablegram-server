import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { TransportConfig } from './configurations/transport.config';
import { InitCustomWebSocketAdapter } from './infrastructure/websocket/ws.adapter';

async function bootstrap() {
  const rabbitHost = process.env.AMQP_HOST;
  const rabbitPort = process.env.AMQP_PORT;
  const rabbitUser = process.env.AMQP_USER;
  const rabbitPassword = process.env.AMQP_PASSWORD;
  const serviceQueue = process.env.NOTIFICATION_SERVICE_QUEUE;

  const app = await NestFactory.create(AppModule);
  const microservices = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${rabbitUser}:${rabbitPassword}@${rabbitHost}:${rabbitPort}`,
      ],
      queue: serviceQueue,
      queueOptions: {
        durable: true,
      },
    },
  });

  const configService = app.get(ConfigService);
  const wssOptions = configService.get<TransportConfig>('wss');
  InitCustomWebSocketAdapter(app, wssOptions);
  await microservices.listenAsync();
  await app.listenAsync(null);
}
bootstrap();
