import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const rabbitHost = process.env.AMQP_HOST;
  const rabbitPort = process.env.AMQP_PORT;
  const rabbitUser = process.env.AMQP_USER;
  const rabbitPassword = process.env.AMQP_PASSWORD;
  const serviceQueue = process.env.AUTH_SERVICE_QUEUE;

  const app = await NestFactory.createMicroservice(AppModule, {
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
  } as RmqOptions);

  await app.listenAsync();
}
bootstrap();
