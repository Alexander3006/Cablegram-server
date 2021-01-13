import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ssl, TransportConfig } from './configurations/transport.config';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({
      logger: true,
      https: {
        ...ssl(),
      },
    }),
  );

  const configService = app.get(ConfigService);
  const httpsConfig = configService.get<TransportConfig>('https');
  await app.listen(httpsConfig.port, '0.0.0.0');
}
bootstrap();
